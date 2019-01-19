import {INIT,SAVE_EVENT,UNSAVE_EVENT,REFRESH,REFRESH_ERROR,REFRESH_SUCCESS,INIT_ERROR,INIT_SUCCESS,SEARCH,EMPTY_SEARCH} from '../Constants';
import {LaunchItem} from '../Types';
export default (state={},action:{type:String,payload:{AllEvents:Array,UpcomingEvents:Array,PastEvents:Array}| any})=>{
    switch (action.type) {
        case INIT:
            return {Initializing:true};
        case INIT_ERROR:
            return {InitError:true};
        case INIT_SUCCESS:
            return {InitSuccess:true,
                AllEvents:action.payload.AllEvents,
                UpcomingEvents:action.payload.UpcomingEvents,
                PastEvents:action.payload.PastEvents};
        case REFRESH:
            return {...state,Refreshing:true,RefreshError:false};
        case REFRESH_ERROR:
            return {...state,Refreshing: false,RefreshError:true,RefreshSuccess:false};
        case REFRESH_SUCCESS:
            return {...state,
                AllEvents:action.payload.AllEvents,
                UpcomingEvents:action.payload.UpcomingEvents,
                PastEvents:action.payload.PastEvents,
                Refreshing: false,RefreshSuccess:true,RefreshError:false};
        case SAVE_EVENT:
            let savedEvent = [action.payload];
            return {...state,SavedEvents:[...state.SavedEvents,...savedEvent]};
        case UNSAVE_EVENT:
            return {...state,SavedEvents: state.SavedEvents.filter(elem=>elem!==action.payload)};
        case SEARCH:
            if(action.payload==="") return {...state,SearchEvents: []};
            let searchRegExp = new RegExp(action.payload,"i");
            return {...state,SearchEvents:state.AllEvents
                    .filter((elem:LaunchItem)=>elem.rocket.first_stage.cores.join(" ").match(searchRegExp) ||
                    elem.rocket.rocket_name.match(searchRegExp) ||
                    elem.launch_site.site_name_long.match(searchRegExp) ||
                    elem.mission_name.match(searchRegExp) ||
                    elem.rocket.second_stage.payloads.join(" ").match(searchRegExp))};
        case EMPTY_SEARCH:
            return {...state,SearchEvents: []};
        default:
            return state;
    }
}