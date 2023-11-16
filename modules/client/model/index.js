const crypto = require('crypto')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('main.db');
module.exports = {
    async login(username,password){
        const userdb = await getByUsername(username);
        if(!userdb) return false;
        return compare(password,userdb.password)
    },
    async create(username,password){
        try {
            const result = await db.run('INSERT INTO client (username,password) VALUES (?, ?)', [username,cry(password)]);
            if (result) {
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
}


function cry(clear){
    const hmac = crypto.createHmac('sha256', process.env.S_HASH)
    const salted = process.env.S_PREF + clear + process.env.S_SUFF
    return hmac.update(salted).digest('base64')
  }
function compare (clearPassword,hashedPassword){
    return cry(clearPassword)===hashedPassword;
  }

 async function getByUsername(username) {
    return new Promise((resolve, reject) => {
    const result = db.get('SELECT * FROM client WHERE username = ?',username,
    function (err, rows) {
        if (err) {
            reject(err.message);
        } else {
            resolve(rows);
        }
    });
    })
}