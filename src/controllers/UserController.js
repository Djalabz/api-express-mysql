const db = require('../config/db');
require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
// const { validationResult, check, body } = require('express-validator');


class UserController {
    static async signUp(req, res) {
        const { username, email, password } = req.body;

        try {
          // Checks if email already exists
          const emailExists = await User.findEmail(email);

          if (emailExists) {
            return res.status(500).send('Email déjà utilisé');
          }
          // Checks if username already exists
          const nameExists = await User.findUsername(username);

          if (nameExists) {
            return res.status(500).send('Nom d\'utilisateur déjà utilisé');
          }

          // Encrypts password (On assume d'avoir vérifier sa validité coté front aussi)
          bcrypt.hash(password, 15, function(err, hash) {
            if (err) {
              console.log(err);
              return res.status(500).send('Erreur lors de l\'encryptage du mot de passe')

            } else {
              // On crée un tableau avec les données de l'utilisateur
              const newUser = [ username, email, hash ];

              // On ajoute le nouvel utilisateur à la base de données
              User.addUser(req, res, newUser);

              // On envoit un mail de confirmation avec jeton d'authentification
              // this.sendRegistrationMail(email, username);
            }
          });
        } catch (err) {
          console.error(err)
          res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur')
        }
    }

    // Login avec jwt placé dans un cookies http only
    static async login(req, res) {

      const { email, password } = req.body;

      console.log(req.body);

      try {
        // Checks if email exists
        const checkEmailQuery = "SELECT * FROM Users WHERE email = ?";

        db.query(checkEmailQuery, email, (error, results) => {
          if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Erreur de base de données' });
          }
  
          if (results.length === 0) {
            console.error('Aucun utilisateur trouvé');
            return res.status(500).json({ message: 'Aucun utilisateur trouvé' });
          }

          const user = results[0];
          console.log(user);
          
          // Checks if password is correct
          bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
              console.error('Error while checking password');
              return res.status(500).json({ message: 'Mot de passe incorrect' });
            };

            // Generates a Json Web Token if password is correct
            if (isMatch) {
              let token = jwt.sign({ userId: user.id } ,process.env.SECRET_KEY, { expiresIn: '1d' });

              // Response
              res.cookie('token', token, { expires: new Date(Date.now() + 604800000), httpOnly: true, secure: true });
              res.json({
                id: user.id,
                username: user.username,
                message: 'Utilisateur connecté'
              });
              
            // Returns an error if password doesn't match
            } else {
              console.error('Wrong password');
            };
          });
        });

      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    }

    // login avec les sessions 
    // static async login(req, res) {
    //   const { email, password } = req.body;

    //       try {
    //       // Checks if email exists
    //       const checkEmailQuery = "SELECT * FROM Users WHERE email = ?";

    //       db.query(checkEmailQuery, email, (error, results) => {
    //         if (error) {
    //           console.error('Database error:', error);
    //           return res.status(500).json({ message: 'Erreur de base de données' });
    //         }
    
    //         if (results.length === 0) {
    //           console.error('Aucun utilisateur trouvé');
    //           return res.status(500).json({ message: 'Aucun utilisateur trouvé' });
    //         }

    //         const user = results[0];
    //         console.log(user);
            
    //         // Checks if password is correct
    //         bcrypt.compare(password, user.password, function (err, isMatch) {
    //           if (err) {
    //             console.error('Error while checking password');
    //             return res.status(500).json({ message: 'Erreur de base de données' });
    //           };

    //           // Generates a Json Web Token if password is correct
    //           if (isMatch) {
    //             let token = jwt.sign({ userId: user.id } ,process.env.SECRET_KEY, { expiresIn: '1d' });

    //             // Response
    //             req.session.user = user;
    //             console.log(req.session.user);
    //             res.send(user);
                
    //           // Returns an error if password doesn't match
    //           } else {
    //             console.error('Wrong password');
    //           };
    //         });
    //       });

    //     } catch (err) {
    //       console.error(err);
    //       return res.status(500).json({ error: 'Server error' });
    //     }
    //   }
    // }

    sendRegistrationMail(email, username) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: ''
      }
    }
    
    static async logout(req, res) {
      res.clearCookie('token');
      res.redirect('/');
    }

    static async getInfos(req, res, page) {
      const userId = req.user.userId;
    
      try {
        const getUserQuery = "SELECT * FROM Users WHERE id = ?";
    
        db.query(getUserQuery, userId, (error, results) => {
          if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Erreur de base de données' });
          }
    
          if (results.length === 0) {
            console.error('Aucun utilisateur trouvé');
            return res.status(500).json({ message: 'Aucun utilisateur trouvé' });
          }
    
          const user = results[0];
          console.log(user);
    
          // EJS
          res.render(`pages/${page}`, { user: user });
    
        });
    
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    }

    static async changeAvatar(req, res) {
      const userId = req.user.userId;
      const avatar = req.body.avatar;

      try {
        const changeAvatarQuery = "UPDATE Users SET avatar = ? WHERE id = ?";

        db.query(changeAvatarQuery, [avatar, userId], (error, results) => {
          if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Erreur de base de données' });
          }
  
          if (results.length === 0) {
            console.error('Aucun utilisateur trouvé');
            return res.status(500).json({ message: 'Aucun utilisateur trouvé' });
          }

          const user = results[0];
          console.log(user);

          // Response
          res.status(200).json({ message: 'Avatar changé' });

        });

      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
    }
}



module.exports = UserController;
