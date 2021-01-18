import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesByID } from '../../selectores/getHeroeById'

export const HeroesScreen = ({ history }) => {

    const { heroeid } = useParams();

    const heroe = useMemo(() => getHeroesByID(heroeid), [heroeid]);//utilizamos el useMemo para enviar la petición sólo cuando cambie el heroeid

    if(!heroe){
        return <Redirect to="/" />;
    }

    const handleReturn = () => {

        //revisamos el length del historial,
        //ya que si abrimos el navegador e ingresamos directamente en un heroe
        //y presionamos return, nos lleva  a página de nueva pestaña
        if( history.length <=2 ) {
            history.push('/');
        } else {
            history.goBack();
        }

    }

    const { superhero,publisher,alter_ego,first_appearance,characters } = heroe

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={ `../assets/heroes/${ heroeid }.jpg` }
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-8 animate__animated animate__fadeIn">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"> <b> First appearance: </b> { first_appearance } </li>
                </ul>

                <h5> Characters </h5>
                <p> { characters } </p>

                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>

            </div>

        </div>
    )
}
