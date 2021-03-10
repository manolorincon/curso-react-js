import { types } from '../types/types'
import { fetchDiaSemana } from '../helpers/fetch'
import Swal from 'sweetalert2';

export const startSubmitDiaSemana = () => {
    
    return async (dispatch) => {

        dispatch(startSubmit());

        const resp = await fetchDiaSemana('getDiaSemana', '', 'GET');
        const body = await resp.json();

        if( body.codigo === 1 ){
            console.log('Ok');
            dispatch( diaSemana( body.diaSemana ) )
            dispatch(finishSubmit());
        }else{
            Swal.fire('Error', body.msg, 'error');
            dispatch(finishSubmit());
        }
    }
}

export const diaSemana = ( diaSemana ) => ({
    type: types.homeDiaSemana,
    payload: {
        diaSemana
    }
});

export const startSubmit = () => ({
    type: types.startSubmit,
    payload: {
        loading: true
    }
});

export const finishSubmit = () => ({
    type: types.finishSubmit,
    payload: {
        loading: false
    }
});