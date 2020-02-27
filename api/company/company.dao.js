const db = require("../../config/database/mysql");

exports.create = async data => {

    return await db.query(`INSERT INTO faq SET ?`, data);
}

exports.getAll = async (fields) => {
    
    return await db.query(`SELECT ${fields} FROM faq ORDER BY \`order\` ASC`);
}

exports.get = async (fields, id) => {
    
    return (await db.query(`SELECT ${fields} FROM faq WHERE id = ?`, [ id ]))[0];
}

exports.edit = async (data, id) => {

    let keys = Object.keys(data).map(key => `${key} = ?`).join(', ');

    let query = `UPDATE faq SET ${keys} WHERE id = ?`;
    let values = Object.values(data);
    values.push(id);
    await db.query(query, values);
}