const db = require('../../config/mongoose');
const nonLexicalWords = require('./ignoreWords');
const IgnoreWord = require('../models/ignoreWord');

const run = async () => {
  try {
    db.connect();

    const words = [];
    nonLexicalWords.forEach((el) => words.push({ title: el }));

    const res = await IgnoreWord.insertMany(words);
    console.log('Successfully seeded =====>', res);
  } catch (err) {
    console.error(err);
  }
};

run();
