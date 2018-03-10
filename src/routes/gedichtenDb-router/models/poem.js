const Sequelize = require('sequelize');
const validUrl = require('valid-url');

module.exports = (sequelize, DataTypes) => {

  const Poem = sequelize.define('poem', {
    title: {
      type: DataTypes.TEXT
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        this.setDataValue('text', value);
        const text_lines = value.split('\n').length;
        this.setDataValue('text_lines', text_lines);
      },
      validate: {
        len: [0, 30000]
      }
    },
    text_lines: {
      type: DataTypes.INTEGER
    },
    poet_id: {
      type: DataTypes.INTEGER
    },
    bundle_id: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.TEXT,
      validate: {
        isUrlExtended(value){
          if (value !== '' && !validUrl.isWebUri(value)) {
            throw new Error('Invalid URL');
          }          
        }      
      }
    },
    url_label :{
      type: DataTypes.TEXT,
      validate: {
        labelForValidUrl(value) {
          if(value && !this.url) {
            throw new Error('URL-label requires that the URL-field is defined and valid');
          }
        }
      }
    },
    comment: {
      type: DataTypes.TEXT
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  });
  return Poem;
};