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

/** @param {ArrayBuffer} buffer */
let bufToB64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
};

let b64ToBuf = (base64) => {
    let raw = atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));

    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    return array.buffer;
};

/**
 * use the *B64() functions, it will be much more convenient for you
 * functions that return ArrayBuffer should be made private once you stop using them
 */
let CryptHelper = {
    // ty to https://gist.github.com/borismus/1032746
    base64toArrayBuffer : b64ToBuf,
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
    generateKeyB64: () => CryptHelper.generateKey()
        .then(({privateKey, publicKey}) => ({
            privateKeyB64: bufToB64(privateKey),
            publicKeyB64: bufToB64(publicKey),
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
    /** @return string - encrypted message in form of 2 base64 string joined with ':' */
    encryptMessageB64: (publicKeyB64, privateMessage) => {
        let publicKey = b64ToBuf(publicKeyB64);
        return CryptHelper.encryptMessage(publicKey, privateMessage)
            .then(({encryptedAesKey, encryptedPm}) => {
                let encryptedAesKeyB64 = bufToB64(encryptedAesKey);
                let encryptedPmB64 = bufToB64(encryptedPm);
                return encryptedAesKeyB64 + ':' + encryptedPmB64;
            });
    },
    decryptMessage: (privateKey, {encryptedAesKey, encryptedPm}) =>
        crypto.subtle.importKey('pkcs8', privateKey, rsaAlgo, true, ["decrypt"])
            .then(importedPrivate => crypto.subtle.decrypt(rsaAlgo, importedPrivate, encryptedAesKey))
            .then(decryptedAesKey => {
                let jwkData = JSON.parse(new TextDecoder().decode(decryptedAesKey));
                return crypto.subtle.importKey('jwk', jwkData, aesAlgo, true, ["encrypt", "decrypt"])
                    .then(imported => crypto.subtle.decrypt(aesAlgo, imported, encryptedPm));
            })
            .then(pmBuffer => new TextDecoder().decode(pmBuffer)),
    decryptMessageB64: (privateKeyB64, encryptedMessageB64) => {
        let privateKey = b64ToBuf(privateKeyB64);
        let [encryptedAesKeyB64, encryptedPmB64] = encryptedMessageB64.split(':');
        let encryptedAesKey = b64ToBuf(encryptedAesKeyB64);
        let encryptedPm = b64ToBuf(encryptedPmB64);
        return CryptHelper.decryptMessage(privateKey, {encryptedAesKey, encryptedPm});
    },
};

/* usage:
var privateMessage = 'ололо залупа !";!!!!!!%!№515 AFAS fasf гузно';
CryptHelper.generateKeyB64()
    .then(({privateKeyB64, publicKeyB64}) =>
        CryptHelper.encryptMessageB64(publicKeyB64, privateMessage)
            .then(encrypted => {
                console.log('zhopa encrypted', encrypted);
                return CryptHelper.decryptMessageB64(privateKeyB64, encrypted)
                    .then(decrypted => {
                        console.log('zhopa decryptd', decrypted);
                        return decrypted;
                    });
            }));
*/
export default CryptHelper;