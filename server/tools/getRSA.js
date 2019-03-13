const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_private_key.pem')).toString();
const publicKey = fs.readFileSync(path.resolve(__dirname, '../rsa/rsa_public_key.pem')).toString();

exports.privateKey = privateKey;
exports.publicKey = publicKey;