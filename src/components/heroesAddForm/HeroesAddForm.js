import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { addHeroe } from "../../redux/slices/heroeSlice";



const HeroesAddForm = () => {
    const dispatch = useDispatch();


    const {request} = useHttp()
    const [name, setName] = useState();
    const [text, setText] = useState();
    const [element, setElement] = useState();

    const createPerson = (e) => {
        e.preventDefault();

        const newHero = {
            id:uuidv4(),
            name,
            description:text,
             element
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .then(
            dispatch(addHeroe(
                {
                    id:uuidv4(),
                    name,
                    description:text,
                    element
                }
            ))
        )
        

    }

    
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={e => setName(e.target.value)}
                    />
                    
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={e => setText(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={e => setElement(e.target.value)}
                    >

                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary"
            onClick={createPerson}
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;