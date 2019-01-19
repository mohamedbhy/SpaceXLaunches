import React,{PureComponent} from 'react';
import {Button, Text, Left, Right, Icon} from "native-base";
import {StyleSheet,View,TouchableWithoutFeedback} from 'react-native';
import RNLanguages from 'react-native-languages';
import  {LaunchItemProps} from '../Types';
import {connect} from 'react-redux';
import {NavigationService} from '../Navigation';
import Colors from "../Constants/Colors";
import {SaveEvent,UnSaveEvent} from '../Actions';
class LaunchItem extends PureComponent<LaunchItemProps>{
    static formatDate(date:String) {
        let _date:Date=new Date(date);
        return _date.toLocaleDateString(RNLanguages.language)
    }
    render(): React.ReactNode {
        return (
            <TouchableWithoutFeedback onPress={()=>NavigationService.navigate('Details',{launchId:this.props.item.flight_number})}>
                <View style={Styles.container}>
                    <Left>
                        <Text style={[Styles.title,Styles.text]}>{this.props.item.mission_name}</Text>
                        <Text style={Styles.text} note numberOfLines={1}>{this.props.item.launch_site.site_name_long}</Text>
                        <Text note>{LaunchItem.formatDate(this.props.item.launch_date_utc)}</Text>
                    </Left>
                    <Right>
                        <Button transparent
                                onPress={this.props.SavedEvents.includes(this.props.item.flight_number) ?()=>this.props.unsaveEvent(this.props.item.flight_number):
                                    ()=>this.props.saveEvent(this.props.item.flight_number)}>
                            {this.props.SavedEvents.includes(this.props.item.flight_number)?
                                <Icon name='star' type='Entypo' style={Styles.star}/>:
                                <Icon name='star-outlined' type='Entypo' style={Styles.star}/>}
                        </Button>
                    </Right>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const Styles = StyleSheet.create({
    title:{
        fontWeight: 'bold',
    },
    image:{
        width: 30,
        height: 30
    },
    container:{
        flex:1,
        flexDirection: 'row'
    },
    text:{
        width: 300
    },
    star:{
        color: Colors.bg,
        fontSize:30
    }
});
const mapStateToProps = (state)=>{
    return {
        SavedEvents: state.SavedEvents?state.SavedEvents:[]
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        saveEvent:(flight_number:Number)=>dispatch(SaveEvent(flight_number)),
        unsaveEvent:(flight_number:Number)=>dispatch(UnSaveEvent(flight_number))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(LaunchItem);
