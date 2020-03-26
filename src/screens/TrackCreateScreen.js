import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-navigation';

import Map from '../components/Map';


const TrackCreateScreen = props => {
    return(
        <SafeAreaView forceInset={{ top: 'always' }}>
            <OuterView>
                <TracKCreateTitleView>
                    <TracKCreateTitleText>
                        TrackCreateScreen
                    </TracKCreateTitleText>
                </TracKCreateTitleView>
                <MapTrackView>
                    <Map />
                </MapTrackView>
            </OuterView>
        </SafeAreaView>
    )
}

const OuterView = styled.View`
    flex: 1;
    border-width: 2px;
    border-color: blue;
`;

const TracKCreateTitleView = styled.View`
    background-color: #FFFFFF;
    height: ${ hp('15%') };

    margin-left: ${ wp('2%') };
    justify-content: center;
`;

const TracKCreateTitleText = styled.Text`
    color: #438899;
    font-size: ${wp('7%')};
    font-weight: 700;
    
`; 

const MapTrackView = styled.View`
    height: ${ hp('35%') };
    width: ${ wp('95%') };
    align-self: center;

    border-radius: 20px;
    overflow: hidden;
    border-width: 2px;
    border-color: red;
`;

export default TrackCreateScreen;