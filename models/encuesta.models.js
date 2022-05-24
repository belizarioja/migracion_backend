const { query } = require("express");
const conexion = require("../config/conexion")
const moment = require('moment')

module.exports = {
    async listarencuestas () {
        const sqlsel = "select * from t_encuestas order by 1 asc "
        const resultados = await conexion.query(sqlsel)
        // console.log(resultados.rows)
        // for (const i in resultados.rows) {
        // item = resultados.rows[i]
        // console.log("Sin asignacion ", item)
        // arreglo.push(item)
        // }
        // return arreglo;
        return resultados.rows;
    },
    async crearencuesta (tx_encuesta, co_tipo_encuesta) {
        const sqlmax = "select MAX(co_encuesta) from t_encuestas "
        const res = await conexion.query(sqlmax)
        let co_encuesta = 1
        if (res.rows[0].max) {
            co_encuesta = Number(res.rows[0].max) + 1
        }
        fe_encuesta = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql = "insert into t_encuestas (co_encuesta, tx_encuesta, co_tipo_encuesta, fe_encuesta, in_estatus, in_activa) values ($1, $2, $3, $4, 1, 1)";
        const resultados = await conexion.query(sql, [co_encuesta, tx_encuesta, co_tipo_encuesta, fe_encuesta])
        return resultados
    }

}