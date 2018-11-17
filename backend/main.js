
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

let addPost = (post) => new Promise((resolve) => {
    useDb(db => {
        let stmt = db.prepare('INSERT INTO posts VALUES (?,?,?,?);');
        let sqlStatus = stmt.run(post.text, post.author, new Date().toISOString(), post.title);
        stmt.finalize();
        resolve({message: 'Written OK... probably', sqlStatus: sqlStatus});
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

let getPosts = (post) => new Promise((resolve) => {
    useDb(db => {
        db.all("SELECT *, ROWID as rowId FROM posts ORDER BY ROWID DESC;", (err, rows) => {
            resolve(rows);
        });
    });
});

let testGoogle = (requestData) => {
    let google = require('googleapis').google;
    let oauth = new google.auth.OAuth2(
        '521166378127-vhkak167b5ghngfkk5r6ukrq059njoo8.apps.googleusercontent.com',
        'j-KYTKjAidu59Y-k_c30zSQg',
        'https://midiana.lv/oauth2callback.html',
    );
};

exports.processRequest = (requestData) => new Promise((resolve, reject) => {
    let func = requestData.func;
    if (func === 'getRelevantPosts') {
        getPosts(requestData).then(posts => 1 && {records: posts})
            .then(resolve).catch(reject);
    } else if (func === 'addPost') {
        addPost(requestData).then(resolve).catch(reject);
    } else if (func === 'deletePost') {
        deletePost(requestData).then(resolve).catch(reject);
    } else if (func === 'login') {
        testGoogle(requestData);
        let oauthToken = requestData.oauthToken;
        console.log(requestData);
        reject('Not implemented yet');
    } else {
        reject('Unknown func - ' + func);
    }
});