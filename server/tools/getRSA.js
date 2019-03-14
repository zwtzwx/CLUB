const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_private_key.pem'), 'utf8');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_public_key.pem'), 'utf8');

exports.privateKey = privateKey;
exports.publicKey = publicKey;