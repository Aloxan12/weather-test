import React, {ChangeEvent, useState} from "react";
import { Link } from "react-router-dom";
import './NavPage.css'


export const NavPage: React.FC<{}> = ()=>{
    const [cityTitle, setCityTitle] = useState('Введите свой город')
    const [editMode, setEditMode] = useState<boolean>(true)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCityTitle(e.currentTarget.value)
    }
    const offEditMode =()=> setEditMode(false);
    const onEditMode =()=> setEditMode(true);
    return (
        <div className='NavPageContainer'>
            <Link to={'/weather/Минск'} >Минск</Link>
            <Link to={'/weather/Москва'} >Москва</Link>
            <Link to={'/weather/Братислава'} >Братислава</Link>
            <div className='changeCity'>
                {
                    editMode
                        ? <><input value={cityTitle} onChange={onChangeHandler}/>
                            <button onClick={offEditMode}>Изменить ✔</button></>
                        : <><Link to={`/weather/${cityTitle}`}>{cityTitle}</Link>
                            <button onClick={onEditMode}> Редактировать</button> </>
                }
            </div>
        </div>
    )
}
