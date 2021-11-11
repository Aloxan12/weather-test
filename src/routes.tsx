import {Route, Switch} from 'react-router-dom';
import React from 'react';
import App from "./App";
import {NavPage} from "./UI/NavPage";
import {CityList} from "./UI/CityList";

export const routes = [
    {
        id: 'Main',
        path: '/',
        exact: true,
        component: App
    },
    {
        id: "Weather",
        path: '/weather/',
        exact: true,
        component: NavPage
    },
    {
        id: "City",
        path: '/weather/:title',
        exact: true,
        component: CityList
    },
];

export const getRouteConfig = (id: any) => {
    const route = routes.find(route => route.id === id);

    if(route) {
        const { component, ...rest } = route;

        return rest;
    }
}

const Routes = () => {
    return (
        <Switch>
            { routes.map(route => {
                const { id, ...props } = route;
                return (
                    <Route key={id} {...props} />
                )
            })}
        </Switch>
    )
}

export default Routes;
