const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');

const db = new sqlite3.Database('main.db');
module.exports = {
    createOrder(orderData) {
        console.log(orderData);
        const orderId = uuidv4();
        const { orderName:title, description, price } = orderData;
        return new Promise((resolve, reject) => {
            db.run(`
            INSERT INTO orders (id, title, description, price)
            VALUES (?, ?, ?, ?)`
        , [orderId, title, description, price], 
        function (err) {
            if (err) {
                reject(err.message);
            } else {
                resolve(true);
            }
        });
    });
 },
 readOrders() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM orders', function (err, rows) {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows);
            }
        });
    });
 }
}