class Movies {
    static create(req, res, database, callback) { 
            const { imdbID, Title, Year, Poster } = req.body;

            const query = 'INSERT INTO Movies (imdbID, title, year, poster) VALUES (?, ?, ?, ?)';
            database.query(query, [imdbID, Title, Year, Poster], callback);
    }    
}
  
module.exports = Movies;
  
  
  
  
  
  