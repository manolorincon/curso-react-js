const baseURL = 'http://localhost:8000/api/fecha';

const fetchDiaSemana = ( endpoint, data, method = 'GET') => {

    const url = `${ baseURL }/${ endpoint }`;

    if( method === 'GET' ){
        console.log('Entro al get');
        return fetch(url);
    }else if( method === 'POST' ){
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }

}

export { fetchDiaSemana }