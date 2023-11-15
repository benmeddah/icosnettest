const sqlite3 = require('sqlite3').verbose();

// Open a database connection (or create a new file if it doesn't exist)
const db = new sqlite3.Database('main.db');

// Create a table named 'orders'
db.serialize(() => {
    //db.run('drop table orders');
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id varchar(256) PRIMARY KEY,
            title varchar(256) not null,
            description TEXT,
            price REAL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            status varchar(256) DEFAULT 'Pending' CHECK(status IN ('Pending', 'Processing', 'Shipped', 'Delivered'))
        )
    `);

    console.log('Table "order" created successfully.');

    // Close the database connection
    db.close();
});
