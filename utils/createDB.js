const sqlite3 = require('sqlite3').verbose();

// Open a database connection (or create a new file if it doesn't exist)
const db = new sqlite3.Database('main.db');

// Create a table named 'orders'
db.serialize(() => {
    db.run('drop table orders');
    db.run('drop table client');
    db.run('drop table status');
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id varchar(256) PRIMARY KEY,
            title varchar(256) not null unique,
            description TEXT,
            price REAL,
            id_client varchar(256),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            status varchar(256) DEFAULT 'Pending' CHECK(status IN ('Pending', 'Processing', 'Shipped', 'Delivered','Cancelled')),
            FOREIGN KEY (id_client) REFERENCES client(id)
        )
    `);
    db.run(`
    CREATE TABLE IF NOT EXISTS client (
        id varchar(256) PRIMARY KEY,
        username varchar(256) not null unique,
        password varchar(256) not null,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);
db.run(`
CREATE TABLE IF NOT EXISTS status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_order varchar(256),
    status varchar(256) CHECK(status IN ('Pending', 'Processing', 'Shipped', 'Delivered')),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_order) REFERENCES orders(id)
)
`);
    console.log('Tables "status","client" and "orders" created successfully.');

    // Close the database connection
    db.close();
});
