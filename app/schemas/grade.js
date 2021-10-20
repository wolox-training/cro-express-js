const scoreSchema = {
  score: {
    matches: {
      errorMessage: 'The score should be -1 or 1.',
      options: /(-1|1)$/
    }
  }
};

module.exports = { scoreSchema };
