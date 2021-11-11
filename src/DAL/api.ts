import axios from "axios";

const API_KEY = 'c862d54702b813ad8241ed73c3ee826f';

export const getWeather = (cityTitle: string)=>{
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityTitle}&cnt=16&APPID=${API_KEY}`).then(res=> res)
    //return instance.get('')
}
