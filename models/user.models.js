const { query } = require("express");
const conexion = require("../config/conexion")
// const crypto = require('crypto')

module.exports = {
    async login (usuario, clave) {
        // const clavehash = crypto.createHash('md5').update(clave).digest("hex");
        const sql = "select a.co_usuario, a.tx_nombre, a.tx_usuario, a.tx_clave, a.co_rol, b.tx_rol, a.in_activa ";
        const from = " from t_usuarios a, t_roles b ";
        const where = " where a.co_rol = b.co_rol and a.tx_usuario = '" + usuario + "' and a.tx_clave = '" + clave + "'";

        // console.log(sql);
        const resultados = await conexion.query(sql + from + where)
        // console.log(resultados);
        return resultados.rows;
    },
    async listarusuarios () {
        // const clavehash = crypto.createHash('md5').update(clave).digest("hex");
        const sql = "select a.co_usuario, a.tx_nombre, a.tx_usuario, a.tx_clave, a.co_rol, b.tx_rol, a.in_activa from t_usuarios a, t_roles b where a.co_rol = b.co_rol ";
        // console.log(sql);
        const resultados = await conexion.query(sql)
        // console.log(resultados);
        return resultados.rows;
    },
    async listarroles () {
        // const clavehash = crypto.createHash('md5').update(clave).digest("hex");
        const sql = "select * from t_roles ";
        // console.log(sql);
        const resultados = await conexion.query(sql)
        // console.log(resultados);
        return resultados.rows;
    },
    async crearusuario (tx_usuario, tx_clave, tx_nombre, co_rol) {
        const sqlmax = "select MAX(co_usuario) from t_usuarios "
        const res = await conexion.query(sqlmax)
        let co_usuario = 1
        if (res.rows[0].max) {
            co_usuario = Number(res.rows[0].max) + 1
        }
        const sql = "insert into t_usuarios (co_usuario, tx_usuario, tx_clave, tx_nombre, co_rol, in_activa) values ($1, $2, $3, $4, $5, 1)";
        const resultados = await conexion.query(sql, [co_usuario, tx_usuario, tx_clave, tx_nombre, co_rol])
        return resultados
    }
}