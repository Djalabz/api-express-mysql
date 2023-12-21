const db = require('../config/db');

class User {
    static async findEmail(email) {
        const existingEmail = db.query("SELECT * FROM Users WHERE email = ?", email);    
        if (existingEmail.length > 0) {
          return true;
        } else {
            return false;
        }
    }

    static async findUsername(username) {
        const existingName = db.query("SELECT * FROM Users WHERE username = ?", username);   
        if (existingName.length > 0) {
          return true;
        } else {
            return false;
        }
    }

    static async addUser(req, res, newUser) {
        db.query("INSERT INTO Users(username, email, password) VALUES(?,?,?)", newUser, (error, results) => {
            if (error) {
              console.error('Erreur lors de l\'ajout:', error);
              res.status(500).json({ message: 'Échec lors de l\'ajout de l\'utilisateur' });
            } else {
              console.log('Utilisateur ajouté !');
              res.status(200).json({ message: 'Succès !', user: results });
            }
        });  
    }
}

module.exports = User;