import React,{Component} from 'react';
import {FlatList,RefreshControl,StyleSheet} from "react-native";
import LaunchItem from "./LaunchItem";
import {LaunchListProps} from '../Types';
import {connect} from 'react-redux';
import {Events} from '../Enums';
import {RefreshFetch} from '../Actions';
import EmptySearch from './EmptySearch';
import Empty from './Empty';
class LaunchList extends Component<LaunchListProps>{
    constructor(props){
        super(props);
        this.eventSelector = this.eventSelector.bind(this);
    }
    eventSelector():Array{
        return this.props.Events===Events.All?
            this.props.AllEvents:this.props.Events===Events.Past?this.props.PastEvents:
            this.props.Events===Events.Upcoming?this.props.UpcomingEvents:
                this.props.Events===Events.Saved?this.props.SavedEvents:this.props.SearchEvents;
    }
    renderList():React.ReactNode{
        return(<FlatList style={Styles.list}
                         refreshControl={this.props.Events!==Events.Search?<RefreshControl refreshing={this.props.Refreshing}
                                                         onRefresh={()=>this.props.refreshFetch()}/>:null}
                         keyExtractor={(item)=>item.flight_number.toString()}
                         data={this.eventSelector()} renderItem={(item)=><LaunchItem item={item.item}/>}
        />)
    }
    renderEmpty():React.ReactNode{
         return this.props.Events===Events.Search ?(<EmptySearch/>):(<Empty/>);
    }
    render(): React.ReactNode {
        return this.eventSelector().length?this.renderList():this.renderEmpty();
    }
}
const Styles= StyleSheet.create({
    list:{
        marginLeft: 5,
        marginRight: -8
    }
});
const mapStateToProps=(state)=>{
    return {
        AllEvents:state.AllEvents,
        PastEvents:state.PastEvents,
        UpcomingEvents:state.UpcomingEvents,
        SavedEvents:state.SavedEvents?state.AllEvents.filter(elem=>state.SavedEvents.includes(elem.flight_number)):[],
        SearchEvents:state.SearchEvents,
        Refreshing:state.Refreshing,
        RefreshError:state.RefreshError,
        RefreshSuccess:state.RefreshSuccess
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        refreshFetch:()=>dispatch(RefreshFetch())
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(LaunchList);