import React from 'react';
import {Container,Text,Content} from 'native-base';
import {Image,StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';
let Empty=()=>(
    <Container>
        <Content contentContainerStyle={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Image style={Styles.image} source={require('../Assets/starlight.png')}/>
            <Text style={Styles.text}>Nothing Here</Text>
        </Content>
    </Container>
);
const Styles = StyleSheet.create({
   image:{
       width:90,
       height:90
   },
    text:{
       fontSize:30,
        color:Colors.light
    }
});
export default Empty;