import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectores/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroesList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);
    
    return (
        <div className="card-columns animate__animated animate__fadeIn">
        {
            heroes.map( hero => (
                <HeroCard 
                    key={ hero.id }
                    { ...hero } //lo enviamos de esta manera para que el herocard pueda extraer sus componentes en forma ordenada.
                />
            ))
        }  
        </div>
    )
}