import {NativeModules} from 'react-native';
export default class ImageToGradient {
    static RNtoGradient = (url:String,steps:Number,angle:Number,callBack:Function)=>{
        if(angle===null) angle =0;
        if(steps===null) steps = 12;
        if(url===null) callBack('Null Url',null);
        else NativeModules.ImageToGradient.toGradient(url,steps,angle,callBack);
    };
}