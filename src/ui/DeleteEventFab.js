import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { eventClearActiveEvent, eventDeleted } from '../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { activeEvent } = useSelector( state => state.calendar );
    
    const handleDelete = () => {

    Swal.fire({
        title: '¿Estás seguro de eliminar este evento?',
        text: "Luego no podrás deshacer esta acción.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch( eventDeleted(activeEvent.id) );
            dispatch( eventClearActiveEvent() );
            Swal.fire(
            'Eliminado!',
            'El evento ha sido eliminado.',
            'success'
            )
        }
    })

    }
    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
        >
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
            
        </button>
    )
}
