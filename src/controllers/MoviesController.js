const model = require('../models/Movies')

class MoviesController {
    static addMovie(req, res, db) {
        try {
            db.connect();

            model.create(req, res, db, (error, results) => {
                if (error) {
                console.error('Erreur lors de l\'ajout:', error);
                res.status(500).json({ message: 'Échec lors de l\'ajout' });
                } else {
                console.log('Film ajouté !');
                res.status(200).json({ message: 'Succès !' });
                }
            })}
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur lors de la connexion' });
        }
        db.end();
    }
}

module.exports = MoviesController