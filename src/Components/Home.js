import React,{Component} from 'react';
import {Container, Tab, Tabs, StyleProvider, Toast} from "native-base";
import {connect} from 'react-redux';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import {HomeProps} from '../Types';
import {Events} from '../Enums';
import {NavigationService} from '../Navigation';
import LaunchList from './LaunchList';
import SearchBar from './SearchBar';
import {RefreshFetch} from "../Actions";
class Home extends Component<HomeProps>{
    componentDidUpdate(): void {
        if(this.props.RefreshError)
            Toast.show({
                text: "Error While Refreshing Data",
                buttonText: "Retry",
                type: "danger",
                duration:30000,
                onClose:this.props.refreshFetch
            });
    }
    static search(){
        NavigationService.navigate('Search');
    }
    render(): React.ReactNode {
        return(<StyleProvider style={getTheme(material)}>
            <Container>
                <SearchBar home search={this.search}/>
                <Tabs>
                    <Tab heading={'UPCOMING'}>
                        <LaunchList Events={Events.Upcoming}/>
                    </Tab>
                    <Tab heading={'PAST'}>
                        <LaunchList Events={Events.Past}/>
                    </Tab>
                    <Tab heading={'ALL'}>
                        <LaunchList Events={Events.All}/>
                    </Tab>
                    <Tab heading={'SAVED'}>
                        <LaunchList Events={Events.Saved}/>
                    </Tab>
                </Tabs>
            </Container>
        </StyleProvider>);
    }
}
const mapStateToProps= (state)=>{
    return {
        RefreshError:state.RefreshError,
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        refreshFetch:()=>dispatch(RefreshFetch())
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);

