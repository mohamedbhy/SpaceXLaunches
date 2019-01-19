import { createStackNavigator, createAppContainer,NavigationActions } from 'react-navigation';
import Splash from '../Components/Splash';
import Home from '../Components/Home';
import Search from '../Components/Search';
import Details from '../Components/Details';
import React from 'react';
let _navigator;
let _subscriber:Splash;
let defaultGerStateForAction;
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
    defaultGerStateForAction = _navigator._navigation.router.getStateForAction;
    _navigator._navigation.router.getStateForAction=(action,state)=>{
        if(state.routes[state.index].routeName==='Home' && action.type === NavigationActions.BACK){
            const newRoutes = state.routes.filter(r=>r.routeName!=='Splash');
            const newIndex = newRoutes.length-1;
            return defaultGerStateForAction(action,{
                routes: newRoutes,
                index: newIndex
            });}
        return defaultGerStateForAction(action,state);
    };
    ready();
}
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}
function goBack() {
    _navigator.dispatch(
        NavigationActions.back()
    )
}
function subscribe(subscriber:Splash) {
    _subscriber=subscriber;
}
function ready() {
    _subscriber.NavigatorReady();
}
const AppNavigator = createStackNavigator({
    Splash,Home,Search,Details
    },
    {
    initialRouteName: 'Splash', headerMode: 'none'
});
export const NavigationService = {navigate,goBack,setTopLevelNavigator,subscribe};
export const AppContainer = createAppContainer(AppNavigator);