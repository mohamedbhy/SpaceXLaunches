import {AppRegistry} from 'react-native';
import {AppContainer} from './src/Navigation';
import Splash from './src/Components/Splash';
import {name as appName} from './app.json';
import React from 'react';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import {NavigationService} from './src/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import persistedStore from './src/Store';
const App=()=>(
    <Provider store={persistedStore.store}>
    <PersistGate persistor={persistedStore.persistor} loading={<Splash rehydrate/>}>
        <Root>
            <AppContainer ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);}}/>
        </Root>
    </PersistGate>
</Provider>);
AppRegistry.registerComponent(appName, () => App);
