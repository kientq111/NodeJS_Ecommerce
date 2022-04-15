const bcrypt = require("bcryptjs");

const users = [{
        name: 'Nguyen Anh Kien',
        email: 'admin4@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: true
    },
    {
        name: 'Nguyen van A',
        email: 'admin3@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: false
    },
    {
        name: 'Nguyen van b',
        email: 'admin2@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: false
    },
    {
        name: 'Nguyen van c',
        email: 'admin1@gmail.com',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: false
    }
]
module.exports = users;