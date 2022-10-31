import React, {useEffect} from "react";
import './CityList.css';
import {useParams} from "react-router";
import {NavPage} from "./NavPage";
import {useDispatch, useSelector} from "react-redux";
import {setWeatherT} from "../BLL/mainReducer";
import {RootReduxStateType} from "../BLL/store";
import { Link } from "react-router-dom";


type ParamTypes = {
    title: string
}
type SelectTempTypes = {
    temp: number
    tomorrow: number
    tempAfterTomorrow: number
}
export const CityList: React.FC<{}> = () => {
    const {title} = useParams<ParamTypes>()
    const {temp, tomorrow, tempAfterTomorrow } = useSelector<RootReduxStateType, SelectTempTypes>(state => state.main)
    //const tempTomorrow = useSelector<RootReduxStateType, number>(state => state.main.tomorrow)
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(setWeatherT(title))
    },[dispatch, title])

    function celsiusTemp(temp: number){
        return Math.floor(temp) - 273;
    }
    const today = new Date()
    const tomorrowDt = new Date(today.getTime() + (24 * 60 * 60 * 1000))
    const afterTomorrowDt = new Date(today.getTime() + ((24 * 60 * 60 * 1000) * 2))
    return (
        <div className='CityListContainer'>
            <NavPage />
            <div className='CityListBlock'>
                <h2>Город: {title}</h2>
                <div>Температура сегодня ({today.toLocaleDateString()}): {celsiusTemp(temp)} &#xb0;С</div>
                <div>Температура завтра({tomorrowDt.toLocaleDateString()}): {celsiusTemp(tomorrow)} &#xb0;С</div>
                <div>Температура послезавтра ({afterTomorrowDt.toLocaleDateString()}): {celsiusTemp(tempAfterTomorrow)} &#xb0;С</div>
                <Link to='/'>Подробнее</Link>
            </div>
        </div>
    )
}
