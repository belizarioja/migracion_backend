const { query } = require("express");
const conexion = require("../config/conexion")

module.exports = {
    async listartopicos (co_encuesta, co_seccion) {
        const sqlsel = "select * from t_topicos "
        let where = " where co_encuesta = " + co_encuesta
        if (co_seccion) {
            where += " and co_seccion = " + co_seccion
        }
        const order = " order by 1 asc "
        const resultados = await conexion.query(sqlsel + where + order)
        return resultados.rows
    },
    async listartopicositems (co_encuesta, co_seccion, co_topico) {
        const sqlsel = "select * from t_topico_items "
        let where = " where co_encuesta = " + co_encuesta
        if (co_seccion) {
            where += " and co_seccion = " + co_seccion
        }
        if (co_topico) {
            where += " and co_topico = " + co_topico
        }
        const order = " order by 1 asc "
        const resultados = await conexion.query(sqlsel + where + order)
        return resultados.rows
    },
    async editartopicositems (co_encuesta, co_seccion, co_topico, co_topico_item, tx_topico_item) {
        const update = "update t_topico_items "
        const sqlset = " set tx_topico_item = '" + tx_topico_item + "'"
        let where = " where co_encuesta = " + co_encuesta
        where += " and co_seccion = " + co_seccion
        where += " and co_topico = " + co_topico
        where += " and co_topico_item = " + co_topico_item
        const resultados = await conexion.query(update + sqlset + where)
        return true
    },
    async listartipotopicos () {
        const sqlsel = "select * from t_tipo_topicos order by 1 asc "
        const resultados = await conexion.query(sqlsel)
        return resultados.rows
    },
    async creartopico (tx_topico, co_encuesta, co_seccion, co_tipo_topico, items) {
        const sqlmax = "select MAX(co_topico) from t_topicos where co_encuesta = $1 and co_seccion = $2 "
        const res = await conexion.query(sqlmax, [co_encuesta, co_seccion])

        let co_topico = 1
        if (res.rows[0].max) {
            co_topico = Number(res.rows[0].max) + 1
        }
        const sql = "insert into t_topicos (co_topico, co_encuesta, co_seccion, tx_topico, in_activa, co_tipo_topico) values ($1, $2, $3, $4, 1, $5)"
        const resultados = await conexion.query(sql, [co_topico, co_encuesta, co_seccion, tx_topico, co_tipo_topico])
        if (co_tipo_topico === 1) {
            for (const i in items) {
                const co_topico_item = Number(i) + 1
                const tx_topico_item = items[i]
                const sqlitem = "insert into t_topico_items (co_topico_item, tx_topico_item, co_encuesta, co_seccion, co_topico, nu_valor) values ($1, $2, $3, $4, $5, $6)"
                conexion.query(sqlitem, [co_topico_item, tx_topico_item, co_encuesta, co_seccion, co_topico, co_topico_item])
            }
        }
        return resultados
    }

}