const {v4: uuidv4} = require('uuid')

let members = [
  {
    id: uuidv4(),
    name: 'Nico',
    email: 'iam@tesla.com',
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Ayumi',
    email: 'typescriptexpert@mail.com',
    status: 'active',
  }
]

module.exports = members