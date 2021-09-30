module.exports = {
  name: {
    type: 'string',
    example: 'Richard'
  },
  last_name: {
    type: 'string',
    example: 'Feynman'
  },
  email: {
    type: 'string',
    example: 'r.feynman@wolox.co'
  },
  password: {
    type: 'string',
    example: '2w1321AScsda#'
  },
  User: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      last_name: {
        $ref: '#/components/schemas/last_name'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  }
};
