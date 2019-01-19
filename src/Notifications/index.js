import PushNotification from 'react-native-push-notification';
import Colors from '../Constants/Colors';
import {LaunchItem} from '../Types';
PushNotification.configure({
    onNotification: function(notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
});
export const ScheduleEventNotification=(event:LaunchItem)=>{
    const id = event.flight_number.toString();
    const bigText = event.mission_name;
    const subText =event.launch_site.site_name;
    const color = Colors.bgs;
    const vibration = 300;
    const title = 'New Rocket Will Launch Today !';
    const message = event.mission_name;
    const date = new Date(event.launch_date_utc);
    PushNotification.localNotificationSchedule({
       id,bigText,subText,color,vibration,title,message,date
    });
};
export const CancelScheduleEventNotification=(flight_number:Number)=>{
    PushNotification.cancelLocalNotifications({id:flight_number.toString()});
};