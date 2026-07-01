const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function connectDB() {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    db.exec('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, descricao TEXT, feito BOOLEAN)');
    
    return db;
}

module.exports = {
    connectDB
}