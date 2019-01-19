import React,{PureComponent} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import Colors from "../Constants/Colors";
import {SearchBarProps} from '../Types';
import {Header, Icon, Input, Item,Left,Button,Body} from "native-base";
import {Search as SearchFN} from "../Actions";
import {connect} from 'react-redux';
import {NavigationService} from "../Navigation";
class SearchBar extends PureComponent<SearchBarProps>{
    constructor(props){
        super(props);
        TextInput.defaultProps.selectionColor=Colors.light;
    }
    goBack(){
        NavigationService.goBack()
    }
    render(): React.ReactNode {
        return (
            <Header style={Styles.header} searchBar rounded androidStatusBarColor={Colors.bgs} iosBarStyle="light-content" hasTabs>
                {this.props.home?null:<Left style={{flex:0.1}}>
                    <Button transparent onPress={this.goBack}>
                        <Icon name='arrow-back' color={Colors.light}/>
                    </Button>
                </Left>}
                <Item style={Styles.search}>
                    <Icon name="ios-search" />
                    <Input autoFocus={!this.props.home} placeholder="Search"
                           style={{color:Colors.lighter}}
                           onFocus={this.props.home?this.props.search:null}
                           onChangeText={(text)=>this.props.Search(text)}/>
                </Item>
            </Header>
        )
    }
}
const Styles = StyleSheet.create({
    header:{
        backgroundColor:Colors.bgs
    },
    search:{
        backgroundColor: Colors.bg
    }
});
const mapDispatchToProps = (dispatch)=>{
    return {
        Search:(keyword:String)=>dispatch(SearchFN(keyword))
    }
};
export default connect(null,mapDispatchToProps)(SearchBar);