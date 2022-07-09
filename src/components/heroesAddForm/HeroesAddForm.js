import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { heroCreate } from "../../actions";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp()
    const [name, setName] = useState();
    const [text, setText] = useState();
    const [element, setElement] = useState();
    const createPerson = (e) => {
        e.preventDefault();
        console.log(name, text, element)

        const newHero = {
            id:uuidv4(),
            name,
            description:text,
             element
        }
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        .then(
            dispatch(heroCreate({
                id:uuidv4(),
                name,
                description:text,
                 element
            }))
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