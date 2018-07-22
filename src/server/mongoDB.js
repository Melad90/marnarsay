const monogoose = require('mongoose');

monogoose.Promise = global.Promise;

const env = require('./env/environment');

const monogUri = `monogodb://${env.dbName}; ${env.key}@${env.dbName}.documents.azure.com:${env.cosmosport}/?ssl=true`;

function connect() {
    return monogoose.connect(monogUri, { useMongoClient: true})
}

module.exports = {
    connect
};