const mysql = require('mysql');
const properties = require('../properties');

let masterPool = mysql.createPool({
    host     : properties.DB.HOST.MASTER,
    port     : properties.DB.PORT,
    user     : properties.DB.USER,
    password : properties.DB.PASS,
    database : properties.DB.NAME
});

const createMasterConnection = () => new Promise((resolve, reject) => {
    masterPool.getConnection(function(err, connection) {
        if (!err) resolve(connection);
        else {
            reject(err);
            console.log('CANT CONNECT TO DATABASE', err)
            process.exit();
        }
    });
})

class MasterDatabase {
    query(sql, args) {
        return new Promise((resolve, reject) => {
            createMasterConnection()
            .then(connection => {
                connection.query(sql, args, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                    connection.release();
                });
            });
        })
    }

    async queryUpdate(table, data, primary_key, primary_value) {
        let keys = Object.keys(data).map(key => `${key} = ?`).join(', ');
  
        let query = `UPDATE ${table} SET ${keys} WHERE ${primary_key} = ?`;
        let values = Object.values(data);
        values.push(primary_value);
        return await this.query(query, values);
    }
}

module.exports = new MasterDatabase();