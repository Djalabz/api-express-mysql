exports.existingEmail = (database, email) => {
    const existingEmailQuery = "SELECT * FROM users WHERE email = ?";
    const existingEmail = database.query(existingEmailQuery, email);
    
    if (existingEmail) {
        return res.send('email already taken');
    } else {
        next();
    }
}