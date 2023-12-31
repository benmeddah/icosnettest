const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const db = new sqlite3.Database('main.db');
module.exports = {
    createOrder(orderData, username) {
        console.log(orderData);
        const orderId = uuidv4();
        const { orderName:title, description, price } = orderData;
        return new Promise((resolve, reject) => {
            db.run(`
            INSERT INTO orders (id, title, description, price, id_client)
            VALUES (?, ?, ?, ?, ?)`
        , [orderId, title, description, price, username ?? null], 
        function (err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(true);
            }
        });
    });
 },
 readOrder(id) {
    if(id === undefined)
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM orders', function (err, rows) {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows);
            }
        });
    });
    else
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM orders where id = ?',[id], function (err, rows) {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows);
            }
        });
    });
 },
 cancelOrder(id){
    if (id === undefined) {
        return false;
    }
    return new Promise((resolve, reject) => {
        db.run(`UPDATE orders
                    SET status = 'Cancelled'
                    WHERE id = ?`,[id],function (err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(`Order with ID ${id} Cancelled.`);
            }
        });
    });
 },
 updateOrder(id, order) {
    if (id === undefined) {
        return false;
    }

    const { orderName:title, description, price, status } = order;

    return new Promise((resolve, reject) => {
        db.run(`UPDATE orders
                    SET title = ?,
                        description = ?,
                        price = ?,
                        status = ?
                    WHERE id = ?`, [title, description, price, status, id], function (err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(`Order with ID ${id} updated successfully.`);
            }
        });
    });
},
deleteOrder(id) {
    if (id === undefined) {
        return false; // Invalid ID
    }

    return new Promise((resolve, reject) => {

        db.run('DELETE FROM orders WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err.message);
            } else {
                if (this.changes > 0) {
                    resolve(`Order with ID ${id} deleted successfully.`);
                } else {
                    reject(`Order with ID ${id} not found.`);
                }
            }
        });
    });
},
searchOrder(keyword) {
   /* if (!keyboard) {
        return {orders:[]}; // Invalid ID
    }*/

    return new Promise((resolve, reject) => {
        db.all(`select * FROM orders ${(keyword?"WHERE title LIKE '%" +keyword +"%'":'')}`, function (err, rows) {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows);
            }
        });
    });
},

}
