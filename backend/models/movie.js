const mongoose = require('mongoose');
const { regexLinkValidation } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLinkValidation.test(v),
      message: (props) => `${props.value} - данная ссылка некорректна`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLinkValidation.test(v),
      message: (props) => `${props.value} - данная ссылка некорректна`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexLinkValidation.test(v),
      message: (props) => `${props.value} - данная ссылка некорректна`,
    },
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
