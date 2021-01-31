const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario =  await Usuario.findOne({ email }) // email : email

        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese email'
            });
        }

        usuario = new Usuario( req.body );
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();

        //generar token
        const token = await generarJWT( usuario.id, usuario.name );
        
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario =  await Usuario.findOne({ email }) // email : email

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe con ese email'
            });
        }

        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //generar token
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }
}

const revalidarToken = async (req, res = response) => {
    
    const { uid, name } = req;

    // generar un nuevo JWT y retornarlo en la petición
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    });
}


module.exports = { crearUsuario, loginUsuario, revalidarToken }