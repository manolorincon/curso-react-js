const { response } = require('express');
const XLSX = require('xlsx')

const cargarArchivo = async( req, res = response ) => {

    let x = 1;

    if( req.body.archivos.length === 0 ){
        
        return res.json({
            codigo: -1,
            mensaje: 'Debe cargar al menos un archivo'
        })

    }


    for( let i of req.body.archivos ){

        let archivo_excel = i.archivo.split(',');
        archivo_excel = archivo_excel[1];
        
        const excel_decode = Buffer.from(archivo_excel, 'base64'); 
        const workbook = XLSX.read(excel_decode);
        
        const fs = require('fs');
        const file = `planilla-clientes-${x}.json`;
        const data = JSON.stringify( workbook.Sheets );

        const despachos = workbook.Sheets['DESPACHOS'];
        const range = XLSX.utils.decode_range(despachos['!ref']);
        const num_rows = range.e.r + 1;
        console.log('Numero de filas: ', num_rows);
        fs.writeFile(file, data, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("El archivo se guardo con exito!");
        });
        
    }   

    res.json({
        ok: true,
    })
}

module.exports = { cargarArchivo }