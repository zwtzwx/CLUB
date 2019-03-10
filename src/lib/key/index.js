import JSEncrypt from 'jsencrypt';

const publicKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDtI22xdRNAKZ356DaTHj+hhSlXwTfyHOcBWJmAnudWlm/eSX2w
ZO2dt63dhdPPGBdA7bxYaamVmmNHIvyTt0JINXpGreufVWrVtYAfnzyYoc82VbtI
AHUTI/AlLfzYYjn9W6nBDuvL1Sfqk71cGcgJEzurUE9w6XVFLzDqzHi1JQIDAQAB
AoGBANwmae23TNniSQD67b+C83vWDd2kSXYCEwuS318jJo2iN9Tb0U3zRQ2IumbP
mSXHrb7fdl12KrPyknw2JNpV5bcuP99b7en4NFhTVAsevnvYSQLehp81FD7ILDqE
BRcbglOEDWxXKIJkwfwlcJoWMezd9C7reoE9ZAxx1CpB4ajBAkEA+DOIRUP4qj+r
tgyKDKmSbcUmNnUrTi1trtw/9Cpf342GVgncK6x0ah9VU2xo2LpEhkpC9y+TUddI
hJNfv5Ik/QJBAPSW6LRi/dVLQe6i5JJOg2bn5GpU36DWXo6jkwZW4TonTmiPAMgh
RG2QnrZe1lx6n3LCPrPaAfaeqTAUGuihnUkCQQCPT6oCXJHrM6JhFnJrh0n+SdSb
oyHjHQX07kWbJRCAk0YazcysBwKc+ASbi8AqS7sfUyfBdF365nR/4Fxrz+W9AkEA
370EFa7QH8L+Bvu/Nw7XKNVLnvEQuCIg0T5UieIDmZzHHuJhhrDX1ZoLdSv/zwzk
uqdxkDgGv8CXZ8Gcc90S8QJAea15jizW5qx55vgBsCBei4bq9HyLg2LHCxVdBiEv
KCiZ0ou8Z321eTqVEasvwOhLwqRXb9E+qKKt5xBiZJKTVQ==
-----END RSA PRIVATE KEY-----`;

let entry = new JSEncrypt();
entry.setPublicKey(publicKey);

export default function(...params) {
    let key = params.join('@');
    return entry.encrypt(key);
}