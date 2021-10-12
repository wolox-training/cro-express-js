const paramSchema = {
  user_id: {
    matches: {
      errorMessage: 'The user_id parameter is required.',
      options: /^[0-9]$/
    }
  }
};

module.exports = { paramSchema };
