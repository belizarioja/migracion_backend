const { query } = require("express");
const conexion = require("../config/conexion")
const moment = require('moment')

module.exports = {
    async guardaresultados (resultados) {
        const fe_resultado = moment().format('YYYY-MM-DD HH:mm:ss')
        for (let i = 0; i < resultados.length; i++) {
            const co_encuesta = resultados[i].co_encuesta
            const co_seccion = resultados[i].co_seccion
            const co_topico = resultados[i].co_topico
            const co_tipo_topico = resultados[i].co_tipo_topico
            const nu_valor = resultados[i].nu_valor
            const tx_valor = resultados[i].tx_valor
            const co_usuario = resultados[i].co_usuario
            const co_sede = resultados[i].co_sede

            const sqlmax = "select MAX(co_resultado) from t_resultados where co_encuesta = $1 and co_seccion = $2 and co_topico = $3 "
            const res = await conexion.query(sqlmax, [co_encuesta, co_seccion, co_topico])

            let co_resultado = 1
            if (res.rows[0].max) {
                co_resultado = Number(res.rows[0].max) + 1
            }

            const sqlitem = "insert into t_resultados (co_encuesta, co_seccion, co_topico, co_tipo_topico, nu_valor, tx_valor, co_usuario, fe_resultado, co_sede, co_resultado) "
            const valuesitem = " values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
            await conexion.query(sqlitem + valuesitem, [co_encuesta, co_seccion, co_topico, co_tipo_topico, nu_valor, tx_valor, co_usuario, fe_resultado, co_sede, co_resultado])

        }
        return true
    },
    async mostrarresultados () {
        const select = "SELECT a.co_resultado, a.co_encuesta, a.tx_valor as tipo, b.tx_valor as doc, c.tx_valor as nom1, d.tx_valor as nom2, e.tx_valor as ape1, f.tx_valor as ape2, g.tx_valor as sexo, h.nu_valor as edad "
        const from = " FROM t_resultados a, t_resultados b, t_resultados c, t_resultados d, t_resultados e, t_resultados f, t_resultados g, t_resultados h "
        let where = " WHERE a.co_topico = 1 and a.co_seccion = 1 "
        where += " and b.co_topico = 2 and b.co_seccion = 1 and b.co_resultado = a.co_resultado "
        where += " and c.co_topico = 3 and c.co_seccion = 1 and c.co_resultado = a.co_resultado "
        where += " and d.co_topico = 4 and d.co_seccion = 1 and d.co_resultado = a.co_resultado "
        where += " and e.co_topico = 5 and e.co_seccion = 1 and e.co_resultado = a.co_resultado "
        where += " and f.co_topico = 6 and f.co_seccion = 1 and f.co_resultado = a.co_resultado "
        where += " and g.co_topico = 7 and g.co_seccion = 1 and g.co_resultado = a.co_resultado "
        where += " and h.co_topico = 8 and h.co_seccion = 1 and h.co_resultado = a.co_resultado "

        const resultados = await conexion.query(select + from + where)
        return resultados.rows
    },
    async mostrardetalles (co_resultado) {
        const select = "SELECT c.co_seccion, c.tx_seccion, b.co_topico, b.tx_topico, a.co_resultado, a.tx_valor, a.nu_valor "
        const from = " FROM t_resultados a, t_topicos b , t_secciones c  "
        let where = " WHERE a.co_resultado = $1 "
        where += " and a.co_topico=b.co_topico and a.co_seccion = b.co_seccion and a.co_encuesta = b.co_encuesta "
        where += " and a.co_seccion = c.co_seccion and a.co_encuesta = c.co_encuesta "
        const order = " ORDER BY co_seccion asc, co_topico asc"

        const resultados = await conexion.query(select + from + where + order, [co_resultado])
        return resultados.rows
    },
    async graficar (co_encuesta, co_seccion, co_topico, co_sede) {
        const select = "SELECT a.tx_topico_item as texto, "
        const selectcount = "(SELECT count (*) FROM public.t_resultados WHERE "
        const wherecount = " co_topico = a.co_topico and co_encuesta = a.co_encuesta and co_seccion = a.co_seccion and co_sede = $1 and nu_valor = a.nu_valor) as total "
        const from = " FROM public.t_topico_items a where "
        const where = " a.co_topico = $2 and a.co_encuesta = $3 and a.co_seccion = $4"
        const resultados = await conexion.query(select + selectcount + wherecount + from + where, [co_sede, co_topico, co_encuesta, co_seccion])
        return resultados.rows
    }

}