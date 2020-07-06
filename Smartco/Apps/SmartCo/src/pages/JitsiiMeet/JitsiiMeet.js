import React from 'react';
import { View } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

class JitsiiMeet extends React.Component {
    constructor(props) {
        super(props);
        this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
        this.onConferenceJoined = this.onConferenceJoined.bind(this);
        this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            const url = 'https://meet.smartdom.ch/babba123456'; // can also be only room name and will connect to jitsi meet servers
            const userInfo = { displayName: 'Amine', email: 'amine.babba.work@gmail.com', avatar: 'https:/gravatar.com/avatar/abc123' };
            JitsiMeet.call(url, userInfo);
            /* You can also use JitsiMeet.audioCall(url) for audio only call */
            /* You can programmatically end the call with JitsiMeet.endCall() */
        }, 1000);
    }

    onConferenceTerminated(nativeEvent) {
        console.log(nativeEvent)
    }

    onConferenceJoined(nativeEvent) {
        //console.log(nativeEvent);
    }

    onConferenceWillJoin(nativeEvent) {
        /* Conference will join event */
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black',flex: 1 }}>
                <JitsiMeetView onConferenceTerminated={this.onConferenceTerminated}
                               onConferenceJoined={this.onConferenceJoined}
                               onConferenceWillJoin={this.onConferenceWillJoin}
                               style={{ flex: 1, height: '100%', width: '100%' }} />
            </View>
        );
    }
}

export default JitsiiMeet;