
// let relevantPosts = [
//     {
//         title: 'Denis Comes Tomorrow',
//         author: 'anonymous',
//         dt: '2018-11-13 23:23:43.341',
//         text: [
//             'It is rumored that tomorrow somewhere between 00:00 and 23:59 his majesty Denis will honor our house with his noble presence.',
//             'We gonna taught him a lesson about opengl so he could pass exams.',
//         ].join('\n'),
//     },
//     {
//         title: '5 Bottles of Dr. Pepper in the Fridge',
//         author: 'klesun',
//         dt: '2018-11-15 23:23:43.341',
//         text: [
//             'Awesome ain\'t it?',
//         ].join('\n'),
//     },
//     {
//         title: 'Stan Lee Died',
//         author: 'slowpoke',
//         dt: '2018-10-15 03:33:43.341',
//         text: [
//             'void main(int argc, char** argv)',
//             '{',
//             '    printf("Goodbye, World\\n");',
//             '}',
//         ].join('\n'),
//     },
//     {
//         title: 'Stas huj',
//         author: 'anonymous',
//         dt: '2018-11-12 13:43:43.341',
//         text: [
//             'Stas huj Stas huj Stas huj Stas huj Stas huj Stas huj',
//             'Stas huj Stas huj Stas huj Stas huj Stas huj Stas huj',
//             'Stas huj Stas huj Stas huj Stas huj Stas huj Stas huj',
//             'Stas huj Stas huj Stas huj Stas huj Stas huj Stas huj',
//         ].join('\n'),
//     },
// ];

let useDb = (callback) => {
    let sqlite3 = require('sqlite3');
    let db = new sqlite3.Database('./zhopa.db');
    db.serialize(function() {
        callback(db);
    });
    db.close();
};

let addPost = (post) => new Promise((resolve, reject) => {
    useDb(db => {
        let stmt = db.prepare('INSERT INTO posts VALUES (?,?,?,?);');
        stmt.run(post.text, post.author, new Date().toISOString(), post.title, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({message: 'Written OK', rowId: this.lastID || null});
            }
            stmt.finalize();
        });
    });
});

let deletePost = (post) => new Promise((resolve) => {
    useDb(db => {
        let stmt = db.prepare('DELETE FROM posts WHERE ROWID = ?;');
        let sqlStatus = stmt.run(post.rowId);
        stmt.finalize();
        resolve({message: 'Deleted OK... probably', sqlStatus: sqlStatus});
    });
});

let getPosts = (post) => new Promise((resolve, reject) => {
    useDb(db => {
        db.all("SELECT *, ROWID as rowId FROM posts ORDER BY ROWID DESC;", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

let login = (requestData) => new Promise((resolve) => {
    let verifier = require('google-id-token-verifier');
    let idToken = requestData.googleUser.Zi.id_token;
    let clientId = '521166378127-vhkak167b5ghngfkk5r6ukrq059njoo8.apps.googleusercontent.com';
    verifier.verify(idToken, clientId, function (err, tokenInfo) {
        useDb(db => {
            let stmt = db.prepare('REPLACE INTO users (email, displayName, imageUrl) VALUES (?,?,?);');
            let sqlStatus = stmt.run(tokenInfo.email, tokenInfo.name, tokenInfo.picture);
            stmt.finalize();
            resolve({tokenInfo: tokenInfo, sqlStatus: sqlStatus});
        });
    });
});

exports.processRequest = (requestData) => new Promise((resolve, reject) => {
    let func = requestData.func;
    if (func === 'getRelevantPosts') {
        getPosts(requestData).then(posts => 1 && {records: posts || null})
            .then(resolve).catch(reject);
    } else if (func === 'addPost') {
        addPost(requestData).then(resolve).catch(reject);
    } else if (func === 'deletePost') {
        deletePost(requestData).then(resolve).catch(reject);
    } else if (func === 'login') {
        console.log(requestData);
        login(requestData).then(resolve).catch(reject);
    } else {
        reject('Unknown func - ' + func);
    }
});