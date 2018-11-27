
let useDb = (callback) => {
    let sqlite3 = require('sqlite3');
    let db = new sqlite3.Database('./zhopa.db');
    db.serialize(function() {
        callback(db);
    });
    db.close();
};

let fetchAll = (db, table, keyFields = []) => new Promise((resolve, reject) => {
    let quote = value => value === undefined ? 'null' : JSON.stringify(value);
    let sql = [
        `SELECT *, ROWID as rowId FROM ${table}`,
        `WHERE TRUE`,
    ].concat(keyFields.map(([name, value]) => {
        return 'AND `' + name + '` = ' + quote(value);
    }).join(' ')).concat([
        `ORDER BY ROWID DESC;`,
    ]).join('\n');
    db.all(sql, (err, rows) => {
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    });
});

let fetchOne = (db, table, keyFields) => fetchAll(db, table, keyFields)
    .then(rows => rows.length > 0
        ? Promise.resolve(rows[0])
        : Promise.reject('No record in DB that would match ' + JSON.stringify(keyFields)));

let addPost = (post, tokenInfo) => new Promise((resolve, reject) => {
    useDb(db => {
        let stmt = db.prepare('INSERT INTO posts VALUES (?,?,?,?);');
        stmt.run(post.text, tokenInfo.email, new Date().toISOString(), post.title, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({message: 'Written OK', rowId: this.lastID || null, author: tokenInfo.email});
            }
            stmt.finalize();
        });
    });
});

let deletePost = (post, tokenInfo) => new Promise((resolve, reject) => {
    useDb(db => {
        fetchOne(db, 'posts', [
            ['ROWID', post.rowId],
        ]).then(row => {
            if (row.author !== tokenInfo.email) {
                reject('You can not delete this post since you are not it\s author - you are ' + tokenInfo.email + ', not ' + row.author);
            } else {
                let stmt = db.prepare('DELETE FROM posts WHERE ROWID = ?;');
                let sqlStatus = stmt.run(post.rowId);
                stmt.finalize();
                resolve({message: 'Deleted OK... probably', sqlStatus: sqlStatus});
            }
        }).then(resolve).catch(reject);
    });
});

let getPosts = (requestData) => new Promise((resolve, reject) => {
    useDb(db => fetchAll(db, 'posts', []).then(resolve).catch(reject));
});

let getUserData = (googleIdToken) => new Promise((resolve, reject) => {
    if (!googleIdToken) {
        reject('googleIdToken is empty');
    }
    let verifier = require('google-id-token-verifier');
    let clientId = '521166378127-vhkak167b5ghngfkk5r6ukrq059njoo8.apps.googleusercontent.com';
    verifier.verify(googleIdToken, clientId, function (err, tokenInfo) {
        if (err) {
            reject(err);
        } else {
            resolve(tokenInfo);
        }
    });
});

let login = (googleIdToken) => getUserData(googleIdToken)
    .then(tokenInfo => useDb(db => {
        let stmt = db.prepare('REPLACE INTO users (email, displayName, imageUrl) VALUES (?,?,?);');
        stmt.run(tokenInfo.email, tokenInfo.name, tokenInfo.picture);
        stmt.finalize();
        return {tokenInfo: tokenInfo};
    }));

exports.processRequest = (requestData) => {
    let func = requestData.func;
    if (func === 'getRelevantPosts') {
        return getPosts(requestData).then(posts => 1 && {records: posts || null});
    } else if (func === 'addPost') {
        return getUserData(requestData.googleIdToken)
            .then(tokenInfo => addPost(requestData, tokenInfo));
    } else if (func === 'deletePost') {
        return getUserData(requestData.googleIdToken)
            .then(tokenInfo => deletePost(requestData, tokenInfo));
    } else if (func === 'login') {
        console.log(requestData);
        let googleIdToken = requestData.googleUser.Zi.id_token;
        return login(googleIdToken);
    } else {
        return Promise.reject('Unknown func - ' + func);
    }
};