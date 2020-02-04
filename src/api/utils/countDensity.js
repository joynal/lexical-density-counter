module.exports = (input, ignoreWords) => {
  if (typeof input === 'string' && Array.isArray(ignoreWords)) {
    const words = input
      .trim()
      .toLocaleLowerCase()
      .split(' ')
      .filter((i) => i);

    const lexicalWords = words.filter((word) => !ignoreWords.includes(word));

    return Number((lexicalWords.length / words.length).toFixed(2));
  }

  return null;
};
