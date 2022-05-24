const { query } = require("express");
const conexion = require("../config/conexion")
// const crypto = require('crypto')

module.exports = {
    async listarsedes () {
        // const clavehash = crypto.createHash('md5').update(clave).digest("hex");
        const sql = "select * from t_sedes ";
        // console.log(sql);
        const resultados = await conexion.query(sql)
        // console.log(resultados);
        return resultados.rows;
    },
    async crearsede (tx_sede) {
        const sqlmax = "select MAX(co_sede) from t_sedes "
        const res = await conexion.query(sqlmax)
        // console.log('Maximo')
        // console.log(res.rows[0].max)
        let co_sede = 1
        if (res.rows[0].max) {
            co_sede = Number(res.rows[0].max) + 1
        }
        // console.log('co co_seccion')
        // console.log(co_seccion)
        const sql = "insert into t_sedes (co_sede, tx_sede) values ($1, $2)"
        const resultados = await conexion.query(sql, [co_sede, tx_sede])
        return resultados
    }
}