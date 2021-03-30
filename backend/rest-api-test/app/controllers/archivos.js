const { response } = require('express');
const XLSX = require('xlsx')

const cargarArchivo = async( req, res = response ) => {

    if( req.body.archivos.length === 0 ){
        
        return res.json({
            codigo: -1,
            mensaje: 'Debe cargar al menos un archivo'
        })

    }


    let j = 1;
    let solicitudes = [];

    for( let x of req.body.archivos ){

        const fs = require('fs');
        const file = `planilla-clientes-${j}.json`;
        
        let archivo_base64 = x.archivo.split(',');
        const excel_decode = Buffer.from(archivo_base64[1], 'base64'); 

        const workbook = XLSX.read(excel_decode);
        const despachos = workbook.Sheets['Envíos'];

        let columnas = {};
        let data = [];

        for( cell in despachos ) {

            //Ej: cell[0] => A, cell[1] => 1, num_cell_pos => 1

            if(cell[0] === '!') continue;
            
            let num_cell_pos = 0;

            for (let i = 0; i < cell.length; i++) {
                //Ej: cell[0] => A, cell[1] => A, cell[2] => 5, num_cell_pos => 2
                if (!isNaN(cell[i])) {
                    num_cell_pos = i;
                    break;
                }
            };

            //cell => A1, col => A, row => 1, value => Tipo de Servicio, num_cell_pos => 1
            let col = cell.substring(0,num_cell_pos);
            let row = parseInt(cell.substring(num_cell_pos));
            let value = despachos[cell].v;

            if(row === 1 && value) {
                
                columnas[col] = value;
                continue;
            }

            if(!data[row]) data[row]={};
            data[row][columnas[col]] = value;

        }

        data.shift();
        data.shift();

        fs.writeFile(file, JSON.stringify(data), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("El archivo se guardo con exito!");
        });

        solicitudes.push( data );

        j++;
    }  
    
    res.json({
        ok: true,
        solicitudes
    })
}

module.exports = { cargarArchivo }