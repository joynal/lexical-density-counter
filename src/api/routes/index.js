const express = require('express');
const validate = require('express-validation');

const router = express.Router();

const auth = require('../middleware/auth');
const { densityInput, wordAdd } = require('../validations');
const getDensityCount = require('../controller/getDensityCount');
const { addWord, removeWord } = require('../controller/ignoreWord');

router.get('/status', (req, res) => res.send('OK'));

router
  .route('/complexity')
  .post(validate(densityInput), getDensityCount);

router
  .route('/ignore-words')
  .post(auth, validate(wordAdd), addWord);

router
  .route('/ignore-words/:id')
  .delete(removeWord);

module.exports = router;
