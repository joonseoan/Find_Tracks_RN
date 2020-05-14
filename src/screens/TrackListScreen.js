import React from 'react';
import { View, FlatList } from 'react-native';
import styled from 'styled-components';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SafeAreaView, NavigationEvents } from 'react-navigation';

import useTrackList from '../hooks/stateManager/trackListScreen/useTrackList';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// [ Important : the way of cache update in component level]
// import { graphql } from 'react-apollo';
// import getTrack from '../graphql/queries/getTracks';

const TrackListScreen = ({ 
    navigation,
    // 3rd way to change Apollo cache
    // [ Important : the way of cache update in component level]
    // data 

}) => {

    // [ Important : the way of cache update in component level]
    // const { fetchTrack, loading } = data;
    // if(loading) return <View />;

    const { state, fetchTracks } = useTrackList(navigation);
    
    return(
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
            {/* To do: style and check fetchTrack update */}
            <OuterView>
                <NavigationEvents onWillFocus={ fetchTracks } />
                <TrackListTitleView>
                    <TrackListTitleText>Track List</TrackListTitleText>
                </TrackListTitleView>
                <TrackListItemView>
                    {
                        !state.length 
                            && <NoDataMessageText> NO TRACK LIST AVAILABLE </NoDataMessageText> 
                    }
                    <FlatList
                        showsHorizontalScrollIndicator={ false }
                        // [ Important : the way of cache update in component level]
                        // data={ data.fetchTrack }
                        data={ state }
                        renderItem={({ item }) => {

                            return (
                                <TrackListItemTouchableOpacity
                                    onPress={ () => navigation.navigate('TrackDetail', { id: item.id }) }
                                >
                                    <TrackListItemText>{ item.name }</TrackListItemText>
                                    <MaterialCommunityIcons
                                        name="dots-vertical"
                                        size={wp('6.5%')}
                                        color="#B8B8B8"
                                    />
                                </TrackListItemTouchableOpacity>
                            );
                        }}
                        keyExtractor={ item => item.id.toString() }
                    />
                </TrackListItemView>
            </OuterView>
        </SafeAreaView>
    )
}

TrackListScreen.navigationOptions = { 
    headerShown: false,
};

const OuterView = styled.View`
    background-color: #FFFFFF;
    flex: 1;
    align-items: center;
`;

const TrackListTitleView = styled.View`
    height: ${ hp('15%') };
    margin-left: ${ wp('2%') };
    align-self: flex-start;

    justify-content: center;
`;

const TrackListTitleText = styled.Text`
    color: #438899;
    font-size: ${ wp('7%') };
    font-weight: 700;
`;

const TrackListItemView = styled.View`
    width: ${ wp('90%') };
    padding-vertical: ${ hp('2%') };

    flex: 1;
    border-top-width: 3px;
    border-top-color: pink;
`;

const NoDataMessageText = styled.Text`
    color: pink;
    font-size: ${ wp('8%') };
    text-align: center;
    font-weight: 600;
    position: absolute;
    top: ${ hp('30%') };
`;

const TrackListItemTouchableOpacity = styled.TouchableOpacity`
    background-color: #FFFFFF;
    height: ${ hp('6%') };
    margin-bottom: ${ hp('1%') };
    padding-horizontal: ${ wp('2%') };
    
    shadow-color: #00000030;
    border-radius: 10px;
    shadow-color: #000000;
    shadow-offset: 5px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 8px;
    elevation: 5;
    
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const TrackListItemText = styled.Text`
    color: #66D3FA;
    font-size: ${ wp('4%') };
    text-transform: uppercase;
    font-weight: 700;
`;

export default TrackListScreen;

// The way of Cache Update
// export default graphql(getTrack)(TrackListScreen);