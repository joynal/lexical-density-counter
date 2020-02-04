const httpStatus = require('http-status');
const IgnoreWord = require('../models/ignoreWord');
const countWords = require('../utils/countWords');
const countDensity = require('../utils/countDensity');

module.exports = async (req, res) => {
  try {
    if (countWords(req.body.text) < 1000) {
      const ignoreWords = (await IgnoreWord.find()).map((el) => el.title);

      if (req.query.mode === 'verbose') {
        // split text into sentences
        const sentences = req.body.text.match(/[^.!?]+/g);

        let sum = 0;
        const results = [];

        sentences.forEach((sentence) => {
          const density = countDensity(sentence, ignoreWords);
          sum += density;
          results.push(density);
        });

        return res.send({
          data: {
            sentence_ld: results,
            overall_ld: Number((sum / results.length).toFixed(2)),
          },
        });
      }

      return res.send({
        data: { overall_ld: countDensity(req.body.text, ignoreWords) },
      });
    }

    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send();
  } catch (err) {
    console.error('Internal server err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};
