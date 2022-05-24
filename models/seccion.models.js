const { query } = require("express");
const conexion = require("../config/conexion")

module.exports = {
    async listarsecciones (co_encuesta) {
        const sqlsel = "select * from t_secciones where co_encuesta = $1 order by 1 asc "
        const resultados = await conexion.query(sqlsel, [co_encuesta])
        return resultados.rows
    },
    async crearseccion (tx_seccion, co_encuesta) {
        const sqlmax = "select MAX(co_seccion) from t_secciones where co_encuesta = $1 "
        const res = await conexion.query(sqlmax, [co_encuesta])
        // console.log('Maximo')
        // console.log(res.rows[0].max)
        let co_seccion = 1
        if (res.rows[0].max) {
            co_seccion = Number(res.rows[0].max) + 1
        }
        // console.log('co co_seccion')
        // console.log(co_seccion)
        const sql = "insert into t_secciones (co_seccion, co_encuesta, tx_seccion, in_activa) values ($1, $2, $3, 1)"
        const resultados = await conexion.query(sql, [co_seccion, co_encuesta, tx_seccion])
        return resultados
    }

}