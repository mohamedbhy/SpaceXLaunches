import {INIT,SAVE_EVENT,UNSAVE_EVENT,REFRESH,REFRESH_SUCCESS,REFRESH_ERROR,INIT_ERROR,INIT_SUCCESS,API_ALL,API_PAST,API_UPCOMING,EMPTY_SEARCH,SEARCH} from '../Constants';
import axios from 'axios';
import {ScheduleEventNotification,CancelScheduleEventNotification} from '../Notifications';
import PersistedStore from '../Store';
const Refresh=()=>({type: REFRESH});
const RefreshSuccess=(payload:Array)=>({type: REFRESH_SUCCESS,payload});
const RefreshError=()=>({type: REFRESH_ERROR});
const Init =()=>({type: INIT});
const InitSuccess=(payload:Array)=>({type: INIT_SUCCESS,payload});
const InitError=()=>({type: INIT_ERROR});
const _SaveEvent=(payload:Number)=>({type: SAVE_EVENT,payload});
export const _UnSaveEvent=(payload:Number)=>({type: UNSAVE_EVENT,payload});
export const Search=(payload:String)=>({type:SEARCH,payload});
export const EmptySearch=()=>({type:EMPTY_SEARCH});
export const InitFetch =()=>async dispatch=>{
    dispatch(Init());
    let apiRes = {};
    await axios.get(API_ALL)
        .then(res=>{apiRes.AllEvents = Array.from(res.data);
            axios.get(API_UPCOMING)
                .then(res=>{apiRes.UpcomingEvents = Array.from(res.data);
                    axios.get(API_PAST)
                        .then(res=>{apiRes.PastEvents = Array.from(res.data);
                            dispatch(InitSuccess(apiRes));
                        }).catch(()=>dispatch(InitError()));
                }).catch(()=>dispatch(InitError()));
        })
        .catch(()=>dispatch(InitError()));
};
export const RefreshFetch =()=>dispatch=>{
    dispatch(Refresh());
    let apiRes = {};
    axios.get(API_ALL)
        .then(res=>{apiRes.AllEvents = Array.from(res.data);
            axios.get(API_UPCOMING)
                .then(res=>{apiRes.UpcomingEvents = Array.from(res.data);
                    axios.get(API_PAST)
                        .then(res=>{apiRes.PastEvents = Array.from(res.data);
                            dispatch(RefreshSuccess(apiRes));
                        })
                        .catch(()=>dispatch(RefreshError()));
                })
                .catch(()=>dispatch(RefreshError()));
        })
        .catch(()=>dispatch(RefreshError()));
};
export const SaveEvent=(payload:Number)=>dispatch=>{
    const Launch = PersistedStore.store.getState().AllEvents[payload-1];
    ScheduleEventNotification(Launch);
    dispatch(_SaveEvent(payload));
};
export const UnSaveEvent=(payload:Number)=>dispatch=>{
    CancelScheduleEventNotification(payload);
    dispatch(_UnSaveEvent(payload));
};

