
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import {fetchHeroes} from '../../redux/slices/heroeSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    const {status} = useSelector(state => state.heroes);
    const dispatch = useDispatch();


    const filteredHeroessSelector = createSelector(
        (state) => state.filter.activeFilter,
        (state) => state.heroes.heroes,
        (filter,heroes) => {
            if(filter === "all"){
                console.log('render')
                return heroes
            } else {
                return heroes.filter((item) =>  item.element === filter)
            }
        }
    );

    const heroesFiltred = useSelector(filteredHeroessSelector)

    useEffect(() => {
        dispatch(fetchHeroes())
        
    }, []);

    if (status === "loading") {
        return <Spinner/>;
    } else if (status === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} id={id}/>
        })
    }

    const elements = renderHeroesList(heroesFiltred);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;