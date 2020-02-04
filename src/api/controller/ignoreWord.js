const httpStatus = require('http-status');
const IgnoreWord = require('../models/ignoreWord');

const addWord = async (req, res) => {
  try {
    const exist = await IgnoreWord.findOne({ title: req.body.title });

    if (!exist) {
      const word = await IgnoreWord.create({ title: req.body.title });
      return res.send(word);
    }

    return res.send({ message: 'Already exist!' });
  } catch (err) {
    console.error('add word err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

const removeWord = async (req, res) => {
  try {
    await IgnoreWord.remove({ _id: req.params.id });
    return res.send();
  } catch (err) {
    console.error('remove word err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

module.exports = { addWord, removeWord };
