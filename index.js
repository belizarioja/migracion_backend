const express = require('express')
const cors = require('cors')
// const cookieParser = require("cookie-parser")
// const dotenv = require('dotenv').config();

const app = express();
var corsOptions = {
    origin: '*'
};
// app.use(cookieParser())
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// const usuarios = require("./controllers/user.controller.js");
const usermodel = require("./models/user.models")
const sedemodel = require("./models/sede.models")
const encuestamodel = require("./models/encuesta.models")
const seccionmodel = require("./models/seccion.models")
const topicomodel = require("./models/topico.models")
const resultadomodel = require("./models/resultado.models")
const config = require("./config/general")

// const SERVIDOR = process.env.SERVIDOR
const SERVIDOR = config.SERVIDOR

app.post(SERVIDOR + '/login', function (req, res, next) {
    const { usuario, clave } = req.body
    /* if (usuario.length === 0 || clave.length === 0) {
        res.status(400).send('Se requiere Usuario y Clave')
    } */
    usermodel.login(usuario, clave).then(resp => {
        const cant = resp.length
        if (cant > 0) {
            res.json({
                message: 'Acceso válido',
                resp: resp[0],
                status: 200
            })
        } else {
            res.status(403).send('Credenciales Incorrectas!')
        }
    }).catch(err => {
        res.status(500).send('Error obteniendo login ' + err)
    });
})
app.get(SERVIDOR + '/listarusuarios', (req, res) => {
    usermodel.listarusuarios().then(resp => {
        if (resp) {
            res.json({
                message: "Listado de usuarios con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando usuarios " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/crearusuario', (req, res) => {
    const { tx_usuario, tx_clave, tx_nombre, co_rol } = req.body;
    usermodel.crearusuario(tx_usuario, tx_clave, tx_nombre, co_rol).then(resp => {
        if (resp) {
            res.status(200).send('Usuario creada con éxito')
        }
    }).catch(err => {
        res.json({
            message: "Error creando usuario " + err,
            status: 500
        })
    })

})
app.get(SERVIDOR + '/listarroles', (req, res) => {
    usermodel.listarroles().then(resp => {
        if (resp) {
            res.json({
                message: "Listado de roles con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando roles " + err,
            status: 500
        })
    })

})
app.get(SERVIDOR + '/listarsedes', (req, res) => {
    sedemodel.listarsedes().then(resp => {
        if (resp) {
            res.json({
                message: "Listado de sedes con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando sedes " + err,
            status: 500
        })
    })

})
app.get(SERVIDOR + '/listarencuestas', (req, res) => {
    encuestamodel.listarencuestas().then(resp => {
        if (resp) {
            res.json({
                message: "Listado de encuestas con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando encuestas " + err,
            status: 500
        })
    })

})
app.post(SERVIDOR + '/crearencuesta', (req, res) => {
    const { tx_encuesta, co_tipo_encuesta } = req.body;
    encuestamodel.crearencuesta(tx_encuesta, co_tipo_encuesta).then(resp => {
        if (resp) {
            res.status(200).send('Encuesta creada con éxito')
        }
    }).catch(err => {
        res.json({
            message: "Error creando encuesta " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/crearsede', (req, res) => {
    const { tx_sede } = req.body;
    sedemodel.crearsede(tx_sede).then(resp => {
        if (resp) {
            res.status(200).send('Sede creada con éxito')
        }
    }).catch(err => {
        res.json({
            message: "Error creando sede " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/listarsecciones', (req, res) => {
    const { co_encuesta } = req.body
    seccionmodel.listarsecciones(co_encuesta).then(resp => {
        if (resp) {
            res.json({
                message: "Listado de secciones con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando secciones " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/crearseccion', (req, res) => {
    const { tx_seccion, co_encuesta } = req.body;
    seccionmodel.crearseccion(tx_seccion, co_encuesta).then(resp => {
        if (resp) {
            res.status(200).send('Seccion creada con éxito')
        }
    }).catch(err => {
        res.json({
            message: "Error creando seccion " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/listartopicos', (req, res) => {
    const { co_encuesta, co_seccion } = req.body
    topicomodel.listartopicos(co_encuesta, co_seccion).then(resp => {
        if (resp) {
            res.json({
                message: "Listado de topicos con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando topicos " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/creartopico', (req, res) => {
    const { tx_topico, co_encuesta, co_seccion, co_tipo_topico, items } = req.body;
    topicomodel.creartopico(tx_topico, co_encuesta, co_seccion, co_tipo_topico, items).then(resp => {
        if (resp) {
            res.status(200).send('Topico creada con éxito')
        }
    }).catch(err => {
        res.json({
            message: "Error creando Topico " + err,
            status: 500
        })
    })

})

app.get(SERVIDOR + '/listartipotopicos', (req, res) => {
    topicomodel.listartipotopicos().then(resp => {
        if (resp) {
            res.json({
                message: "Listado de tipo de topicos con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando tipo de topicos " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/listartopicositems', (req, res) => {
    const { co_encuesta, co_seccion, co_topico } = req.body;
    topicomodel.listartopicositems(co_encuesta, co_seccion, co_topico).then(resp => {
        if (resp) {
            res.json({
                message: "Listado de items de topicos con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error listando items de topicos " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/editartopicositems', (req, res) => {
    const { co_encuesta, co_seccion, co_topico, co_topico_item, tx_topico_item } = req.body;
    topicomodel.editartopicositems(co_encuesta, co_seccion, co_topico, co_topico_item, tx_topico_item).then(resp => {
        if (resp) {
            res.status(200).send('Actualizado de items de topicos con Exito')
        }
    }).catch(err => {
        res.json({
            message: "Error listando items de topicos " + err,
            status: 500
        })
    })

})

app.post(SERVIDOR + '/guardaresultados', (req, res) => {
    const { resultados } = req.body;
    resultadomodel.guardaresultados(resultados).then(resp => {
        if (resp) {
            res.json({
                message: "Resultados de encuestas guardados con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error guardando Resultados de encuestas >>>>>>> " + err,
            status: 500
        })
    })

})
app.get(SERVIDOR + '/mostrarresultados', (req, res) => {
    resultadomodel.mostrarresultados().then(resp => {
        if (resp) {
            res.json({
                message: "Resultados de encuestas mostrados con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error mostrando Resultados de encuestas >>>>>>> " + err,
            status: 500
        })
    })

})
app.post(SERVIDOR + '/mostrardetalles', (req, res) => {
    const { co_resultado } = req.body;
    resultadomodel.mostrardetalles(co_resultado).then(resp => {
        if (resp) {
            res.json({
                message: "Detalles de encuestas mostrados con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error mostrando Detalles de encuestas >>>>>>> " + err,
            status: 500
        })
    })

})
app.post(SERVIDOR + '/graficar', (req, res) => {
    const { co_encuesta, co_seccion, co_topico, co_sede } = req.body;
    resultadomodel.graficar(co_encuesta, co_seccion, co_topico, co_sede).then(resp => {
        if (resp) {
            res.json({
                message: "Resultados de graficas con Exito",
                resp,
                status: 200
            })
        }
    }).catch(err => {
        res.json({
            message: "Error mostrando Resultados de Graficas >>>>>>> " + err,
            status: 500
        })
    })

})
app.get(SERVIDOR + '/', function (req, res) {
    res.json({
        message: 'Conexion válida.',
        status: 200
    });
});

// const PORT = process.env.PORT
const PORT = config.PORT || 4004

app.listen(PORT, () => {
    console.log(`Servidor ejecutando en puerto ${PORT}.`)
})