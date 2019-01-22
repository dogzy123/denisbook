let aesAlgo = {
    name: "AES-CTR",
    length: 128,
    counter: new Uint8Array(16),
    // publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    // hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
};
let rsaAlgo = {
    // with RSA-OAEP encoded message length must not exceed key length * n
    // so we should either chunk encoded message, or encrypt it with a symmetric key, and then encrypt the _symmetric key_ with RSA-OAEP
    name: "RSA-OAEP",
    modulusLength: 1408, //can be 1024, 2048, or 4096
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
};
let encryptWithAesCtr = (privateMessage) =>
    window.crypto.subtle.generateKey(aesAlgo, true, ["encrypt", "decrypt"]).then(aesKey => {
        let pmBuffer = new TextEncoder().encode(privateMessage);
        let whenEncrypted = window.crypto.subtle.encrypt(aesAlgo, aesKey, pmBuffer);
        let whenExported = window.crypto.subtle.exportKey('jwk', aesKey);
        return Promise.all([whenEncrypted, whenExported]);
    }).then(([encrypted, exported]) => ({
        aesCtrKeyData: exported,
        encryptedPm: encrypted,
    }));

// I just realized that this won't solve anything since server may switch your public key with it's
// own and your buddy would encrypt his messages with server's key thinking that it's your key...
let CryptHelper = {
    // ty to https://gist.github.com/borismus/1032746
    base64toArrayBuffer : base64 => {
        let raw = atob(base64);
        let rawLength = raw.length;
        let array = new Uint8Array(new ArrayBuffer(rawLength));

        for(let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }

        return array.buffer;
    },
    generateKey: () =>
        window.crypto.subtle.generateKey(rsaAlgo, true, ["encrypt", "decrypt"])
            .then((key) => {
                return Promise.all([
                    window.crypto.subtle.exportKey('pkcs8', key.privateKey),
                    window.crypto.subtle.exportKey('spki', key.publicKey),
                ]);
            })
            .then(([privateKeyData, publicKeyData]) => ({
                privateKey: privateKeyData,
                publicKey: publicKeyData,
            })),
    encryptMessage: (publicKey, privateMessage) =>
        crypto.subtle.importKey('spki', publicKey, rsaAlgo, true, ["encrypt"])
            .then(importedPublic => encryptWithAesCtr(privateMessage)
                .then(({aesCtrKeyData, encryptedPm}) => {
                    let aesKeyBuffer = new TextEncoder().encode(JSON.stringify(aesCtrKeyData));
                    return window.crypto.subtle.encrypt(rsaAlgo, importedPublic, aesKeyBuffer)
                        .then(encryptedAesKey => ({
                            encryptedAesKey: encryptedAesKey,
                            encryptedPm: encryptedPm,
                        }));
                })),
    decryptMessage: (privateKey, {encryptedAesKey, encryptedPm}) =>
        crypto.subtle.importKey('pkcs8', privateKey, rsaAlgo, true, ["decrypt"])
            .then(importedPrivate => crypto.subtle.decrypt(rsaAlgo, importedPrivate, encryptedAesKey))
            .then(decryptedAesKey => {
                let jwkData = JSON.parse(new TextDecoder().decode(decryptedAesKey));
                return crypto.subtle.importKey('jwk', jwkData, aesAlgo, true, ["encrypt", "decrypt"])
                    .then(imported => crypto.subtle.decrypt(aesAlgo, imported, encryptedPm));
            })
            .then(pmBuffer => new TextDecoder().decode(pmBuffer)),
};

// usage:
//CryptHelper.generateKey()
//    .then(({privateKey, publicKey}) =>
//        CryptHelper.encryptMessage(publicKey, privateMessage)
//            .then(encrypted => {
//                console.log('zhopa encrypted', encrypted);
//                return CryptHelper.decryptMessage(privateKey, encrypted)
//                    .then(decrypted => {
//                        console.log('zhopa decryptd', decrypted);
//                        return decrypted;
//                    });
//            }));

export default CryptHelper;