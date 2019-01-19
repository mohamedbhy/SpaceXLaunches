import React,{Component} from 'react';
import {Container,H3,Spinner,Header,Content,Toast} from 'native-base';
import {StyleSheet,Image} from 'react-native';
import Colors from '../Constants/Colors';
import * as Redux from 'react-redux';
import {InitFetch} from '../Actions';
import {NavigationService} from '../Navigation';
import {SplashProps} from '../Types/';
class Splash extends Component<SplashProps>{
    componentDidMount(): void {
        if(!this.props.rehydrate){
            NavigationService.subscribe(this);
        }
    }
    componentDidUpdate(): void {
        if(this.props.InitError)
            Toast.show({
                text: "Error While Downloading Initial Data",
                buttonText: "Retry",
                type: "danger",
                duration:30000,
                onClose:this.props.initFetch
            });
        if(this.props.InitSuccess)
            NavigationService.navigate('Home');

    }

    NavigatorReady(){
        if(this.props.AllEvents.length===0){
            this.props.initFetch();
        }else NavigationService.navigate('Home');
    }
    render(): React.ReactNode {
        return(
            <Container style={Styles.container}>
                <Header androidStatusBarColor={Colors.bgs} iosBarStyle="light-content" style={{display:'none'}}/>
                <Content contentContainerStyle={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <Image source={require('../Assets/rocket.png')} style={Styles.image}/>
                    <H3 style={[Styles.logoTitle,Styles.mt]}>CooperStation Team</H3>
                    <Spinner style={Styles.mt} color={Colors.light}/>
                </Content>
            </Container>
        )
    }
}
const Styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.bgs,
    },
    logoTitle:{
        color:Colors.light
    },
    mb:{
        marginBottom: 20
    },
    mt:{
        marginTop: 20
    },
    image:{
        width: 80,
        height: 80,
        resizeMode: 'contain'
    }
});
const mapStateToProps = (state)=>{
    return{
        AllEvents:state.AllEvents,
        InitError:state.InitError,
        InitSuccess:state.InitSuccess
    }
};
const mapDispatchToProps = (dispatch)=>{
    return{
        initFetch:()=>dispatch(InitFetch())
    }
};
export default Redux.connect(mapStateToProps,mapDispatchToProps)(Splash);