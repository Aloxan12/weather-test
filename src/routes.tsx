import {Route, Switch} from 'react-router-dom';
import React from 'react';
import {App} from "./App";
import {NavPage} from "./UI/NavPage";
import {CityList} from "./UI/CityList";
import { NotFound } from './UI/NotFound';

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
    {
        id: "CityDetails",
        path: '/weather/:title/details',
        exact: true,
        component: CityList
    },
    {
        id: "notFound",
        path: '*',
        component: NotFound
    },
];

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
