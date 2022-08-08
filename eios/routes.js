import React, {Fragment, useReducer} from 'react';
import {ThroughProvider} from 'react-through';

import {Route, Routes} from 'react-router-dom'
import {routers as student_routers} from './app/src/student/routers';

const routes = [student_routers];

export var titles = {
    faculty: {},
    group: {},
}

export const reducer = (state, action) => {
    switch (action.type) {
        case titles.faculty:
            return {...state, faculty: action.value}
        case titles.group:
            return {...state, group: action.value}
    }
}

export const createMyRouteList = (router_list, parent_path, key = 0) => {
    return router_list.map(({path, name, Component, children}) => {
        key++;
        path = parent_path + path;
        return createMyRoute({path, name, Component, children, key});
    });
}


export const createMyRoute = (route) => {
    const childs = route.children ? createMyRouteList(route.children, route.path, route.key) : '';

    const Component = route.Component;

    return <Fragment key={route.key}>
        <Route path={route.path} key={route.key} name={route.name} element={<Component/>}/>
        {childs}
    </Fragment>;
};

export const useRoutes = (path = '') => {
    const route_list = createMyRouteList(routes, path);
    const [state, dispatch] = useReducer(reducer, titles);

    return <ThroughProvider>
        <Routes>{route_list}</Routes>
    </ThroughProvider>;
}
