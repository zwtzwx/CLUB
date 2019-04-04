import JSEncrypt from 'jsencrypt';
import JWT from 'jsonwebtoken';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtI22xdRNAKZ356DaTHj+hhSlX
wTfyHOcBWJmAnudWlm/eSX2wZO2dt63dhdPPGBdA7bxYaamVmmNHIvyTt0JINXpG
reufVWrVtYAfnzyYoc82VbtIAHUTI/AlLfzYYjn9W6nBDuvL1Sfqk71cGcgJEzur
UE9w6XVFLzDqzHi1JQIDAQAB
-----END PUBLIC KEY-----`;

let entry = new JSEncrypt();
entry.setPublicKey(publicKey);

export default function(...params) {
    console.log(params);
    
    let key = params.join('@#*');
    let encrypt = entry.encrypt(key);
    console.log(encrypt);
    
    return entry.encrypt(key);
}

// 利用公钥验证 token
export function rsaVerify (token) {
    return new Promise((resovle, reject) => {
        JWT.verify(token, publicKey, { algorithms: 'RS256' }, (err, decoded) => {
            if (err) reject(err)
            resovle(decoded);
        })
    })
}