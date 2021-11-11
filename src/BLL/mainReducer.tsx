import {getWeather} from "../DAL/api";

const initialState = {
    loading: false,
    temp: 0,
    tomorrow: 0,
    tempAfterTomorrow: 0,
    dt: [],
}

export const setWeather =(temp: number)=>({type: 'SET-WEATHER', temp} as const)
export const setWeatherTomorrow =(temp: number)=>({type: 'SET-WEATHER-TOMORROW', temp} as const)
export const setWeatherAfterTomorrow =(temp: number)=>({type: 'SET-WEATHER-AFTER-TOMORROW', temp} as const)
export const isLoading =  (isLoading: boolean) => ({type: "IS-LOADING", isLoading} as const)
export const setDtToday =  (dates: []) => ({type: "SET-DT", dates} as const)

type ActionsType = ReturnType<typeof setWeather>  | ReturnType<typeof isLoading> | ReturnType<typeof setDtToday> | ReturnType<typeof setWeatherTomorrow>
    | ReturnType<typeof setWeatherAfterTomorrow>

export const mainReducer =(state = initialState, action: ActionsType)=>{
    switch (action.type){
        case 'IS-LOADING':{
            return {...state, loading: action.isLoading}
        }
        case 'SET-WEATHER':{
            return {...state, temp: action.temp}
        }
        case 'SET-WEATHER-TOMORROW':{
            return {...state, tomorrow: action.temp}
        }
        case 'SET-WEATHER-AFTER-TOMORROW':{
            return {...state, tempAfterTomorrow: action.temp}
        }
        case "SET-DT":{
            return {...state, dt: action.dates}
        }
        default:
            return state
    }
}

export const setWeatherT = (cityTitle: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(isLoading(true))
            let data = await getWeather(cityTitle).then(res => res.data)
            const allDt = data.list.map( async (obj: any) => {
                const today = new Date().getDay()
                const tomorrow = new Date().getDay() + 1
                const afterTomorrow = new Date().getDay() + 2
                const dates = await new Date((obj.dt * 1000));
                if(today === dates.getDay()){
                    dispatch(setWeather(obj.main.temp))
                }
                if(tomorrow === dates.getDay()){
                    dispatch(setWeatherTomorrow(obj.main.temp))
                }
                if(afterTomorrow === dates.getDay()){
                    console.log(obj.main.temp)
                    dispatch(setWeatherAfterTomorrow(obj.main.temp))
                }
                return dates
            })
            dispatch(setWeather(data.main.temp))
            dispatch(isLoading(false))
        }catch (e) {}
    }
}
