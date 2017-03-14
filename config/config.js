var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'personal-cv'
        },
        port: process.env.PORT || 3000,
        auth: {
            api_key: process.env.api_key,
            domain: process.env.domain
        },
    },

    test: {
        root: rootPath,
        app: {
            name: 'personal-cv'
        },
        port: process.env.PORT || 3000,
        auth: {
            api_key: process.env.api_key,
            domain: process.env.domain
        },
    },

    production: {
        root: rootPath,
        app: {
            name: 'personal-cv'
        },
        port: process.env.PORT,
        auth: {
            api_key: process.env.api_key,
            domain: process.env.domain
        },
    }
};

module.exports = config[env];
