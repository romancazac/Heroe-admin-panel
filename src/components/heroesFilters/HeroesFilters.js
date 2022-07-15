
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { fetchFilters, setActiveFilter } from "../../redux/slices/filterSlice";

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const { filters, status, activeFilter } = useSelector((state) => state.filter)

    
    React.useEffect(() => {
        dispatch(fetchFilters());
        
    }, [])


    const onFilterActive = React.useCallback((element) => {
  
        dispatch(setActiveFilter(element))
       
    },[]);



    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {   
                        status ===  "loading" ? <Spinner/>
                        :
                        filters.map((obj) => 
                            <button
                                key={obj.name} 
                                className={classNames('btn',obj.className, {
                                    'active': activeFilter === obj.element,
                                })}
                                onClick={() => onFilterActive(obj.element)}
                            >{obj.name}</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;