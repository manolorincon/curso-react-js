import { heroes } from "../data/heroes";

export const getHeroesByID = ( id ) => {

    return heroes.find( hero => hero.id === id);

}