import React,{Component} from 'react';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import SearchBar from './SearchBar';
import LaunchList from './LaunchList';
import {Events} from '../Enums';
import {SearchProps} from '../Types';
import {EmptySearch} from '../Actions';
class Search extends Component<SearchProps>{
    componentWillUnmount(): void {
        this.props.emptySearch();
    }
    render(): React.ReactNode {
        return (
            <Container>
                <SearchBar/>
                <LaunchList Events={Events.Search}/>
            </Container>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        emptySearch:()=>dispatch(EmptySearch())
    }
};
export default connect(null,mapDispatchToProps)(Search);