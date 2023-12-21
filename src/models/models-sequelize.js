const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('Movie', {
    // Define the fields of the Movie table
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    imdbID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });



  const User = sequelize.define('User', {
    // Define the fields of the Movie table
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  
  module.exports = {
    Movie,
    User
  };