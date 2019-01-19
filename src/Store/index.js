import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../Reducers';
import {persistStore,persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage';
import initState from '../Constants/initState';
const persistConfig = {
    timeout: 10000,
    key:'root',
    storage,
    whitelist:['AllEvents','UpcomingEvents','PastEvents','savedEvents'],
    stateReconciler:autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig,reducer);
const persistedStore = ()=>{
    let store = createStore(persistedReducer,initState,applyMiddleware(thunk));
    let persistor = persistStore(store);
    return {store,persistor};
};
export default persistedStore();
