import React,{Component} from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Button,
    Header,
    Left,
    Body,
    Icon,
    Title,
    Text,
    StyleProvider,
    Right
} from 'native-base';
import Youtube from 'react-native-youtube';
import {StyleSheet,Image,View,Linking} from 'react-native';
import {connect} from 'react-redux';
import ImageToGradient from '../NativeModules/ImageToGradient';
import Colors from "../Constants/Colors";
import {NavigationService} from '../Navigation';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import {DetailsProps} from '../Types';
import {SaveEvent,UnSaveEvent} from '../Actions';
import LaunchItem from './LaunchItem';
import {Core,Payload} from '../Types';
import getTheme from "../../native-base-theme/components";
import material from "../../native-base-theme/variables/material";
class Details extends Component<DetailsProps>{
    constructor(props){
        super(props);
        this.launchId = this.props.navigation.getParam('launchId');
        this.state={
            launchItem:props.AllEvents[this.launchId-1],
            gradient:[]
        };
        this.goDetails = this.goDetails.bind(this);
    }
    componentDidMount(): void {
        if(this.state.launchItem.links.mission_patch)
            ImageToGradient.RNtoGradient(this.state.launchItem.links.mission_patch,null,null,
                (err,res)=>this.setState({...this.state,gradient:res}))
    }
    goDetails(){
        Linking.openURL(this.state.launchItem.links.article_link);
    }
    static goBack(){
        NavigationService.goBack()
    }
    static cores_serials(cores:Array<Core>):String{
        let cores_serials=cores[0].core_serial===null?"?":cores[0].core_serial;
        for (let i = 1; i < cores.length; i++) {
            let val = cores[i].core_serial===null?"?":cores[i].core_serial;
            cores_serials = cores_serials.concat("/"+val);
        }
        return cores_serials;
    }
    static payloads_ids(payloads:Array<Payload>):String{
        let payload_ids=payloads[0].payload_id===null?"?":payloads[0].payload_id;
        for (let i = 1; i < payloads.length; i++) {
            let val = payloads[i].payload_id===null?"?":payloads[i].payload_id;
            payload_ids = payload_ids.concat("/"+val);
        }
        return payload_ids;
    }
    render(): React.ReactNode {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header style={Styles.header} rounded androidStatusBarColor={Colors.bgs} iosBarStyle="light-content">
                        <Left>
                            <Button transparent onPress={Details.goBack}>
                                <Icon name='arrow-back' color={Colors.light}/>
                            </Button>
                        </Left>
                        <Body>
                        <Title>Details</Title>
                        </Body>
                        <Right>
                            <Button transparent
                                    onPress={this.props.SavedEvents.includes(this.state.launchItem.flight_number) ?()=>
                                            this.props.unsaveEvent(this.state.launchItem.flight_number):
                                        ()=>this.props.saveEvent(this.state.launchItem.flight_number)}>
                                {this.props.SavedEvents.includes(this.state.launchItem.flight_number)?
                                    <Icon name='star' type='Entypo' style={Styles.star}/>:
                                    <Icon name='star-outlined' type='Entypo' style={Styles.star}/>}
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Card>
                            <CardItem>
                                <Body  style={Styles.gradient}>{this.state.launchItem.links.mission_patch?
                                    this.state.gradient.length?
                                        <AnimatedLinearGradient customColors={this.state.gradient} speed={1000}>
                                            <Image style={Styles.image} source={{uri:this.state.launchItem.links.mission_patch}}/>
                                        </AnimatedLinearGradient>
                                    :<Image style={Styles.image} source={{uri:this.state.launchItem.links.mission_patch}}/>
                                    :<Icon name='block' type='Entypo' style={Styles.noImage}/>}</Body>
                            </CardItem>
                            <CardItem>
                                <Body>
                                <Text><Text style={Styles.title}>Mission Name : </Text>{this.state.launchItem.mission_name}</Text>
                                <Text><Text style={Styles.title}>Launch Date : </Text>{LaunchItem.formatDate(this.state.launchItem.launch_date_utc)}</Text>
                                <Text><Text style={Styles.title}>Rocket Name : </Text>{this.state.launchItem.rocket.rocket_name}</Text>
                                <Text><Text style={Styles.title}>Number Of Cores : </Text>{this.state.launchItem.rocket.first_stage.cores.length}</Text>
                                <Text><Text style={Styles.title}>Cores Serials : </Text>{Details.cores_serials(this.state.launchItem.rocket.first_stage.cores)}</Text>
                                <Text><Text style={Styles.title}>Number Of Payloads : </Text>{this.state.launchItem.rocket.second_stage.payloads.length}</Text>
                                <Text><Text style={Styles.title}>Payloads Ids : </Text>{Details.payloads_ids(this.state.launchItem.rocket.second_stage.payloads)}</Text>
                                {this.state.launchItem.upcoming?null:<Text><Text style={Styles.title}>Static Fire Date : </Text>{LaunchItem.formatDate(this.state.launchItem.static_fire_date_utc)}</Text>}
                                {this.state.launchItem.upcoming?
                                    null:<Text><Text style={Styles.title}>Launch Succeed : </Text>{this.state.launchItem.launch_success?"Yes":"No"}</Text>}
                                {this.state.launchItem.details?
                                    <View><Text style={Styles.title}>Details : </Text>
                                        <Text note>{this.state.launchItem.details}</Text></View>:null}
                                {this.state.launchItem.links.video_link?
                                    <View style={Styles.video}>
                                        <Text style={Styles.title}>Video :</Text>
                                        <Youtube style={Styles.youtube} apiKey={"AIzaSyARoxTFxTDJ7HrQwAfdNDWXNRFZiHU9OCE"} controls={1} play={false} videoId={this.state.launchItem.links.video_link.split("=")[1]}/>
                                    </View>
                                    :null}
                                {this.state.launchItem.links.article_link?<Body>
                                <Button textStyle={Styles.link} style={Styles.mt} dark bordered rounded onPress={this.goDetails}>
                                    <Text>More Details</Text>
                                    <Icon name='arrow-forward'/>
                                </Button></Body>:null}
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

}
const Styles = StyleSheet.create({
    youtube:{
        height:250,
        marginTop:15
    },
    video:{
      alignSelf:'stretch',
    },
    header:{
        backgroundColor:Colors.bgs
    },
    star:{
        fontSize:25
    },
    noImage:{
        alignSelf: 'center',
        fontSize: 50
    },
    image:{
        width:60,
        height:60,
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    gradient:{
        height: 70,
    },
    title:{
        fontWeight: 'bold'
    },
    mt:{
        marginTop: 30
    }
});
const mapStateToProps=(state)=>{
    return {
        AllEvents:state.AllEvents,
        SavedEvents:state.SavedEvents?state.SavedEvents:[]
    }
};
const mapDispatchToProps=(dispatch)=>{
    return {
        saveEvent:(id:Number)=>dispatch(SaveEvent(id)),
        unsaveEvent:(id:Number)=>dispatch(UnSaveEvent(id))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Details);