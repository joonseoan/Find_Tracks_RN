import React from 'react';
import styled from 'styled-components';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// withNavigationFocus // return true when this page displayed and return false when this page is away.
// We can use withNavigatioFocus instead of NavigationEvent, "willBlure" using customized function.
import { SafeAreaView, NavigationEvents, withNavigationFocus } from 'react-navigation';

import Map from '../../components/Map';
import trackCreateScreen 
    from '../../hooks/stateManager/trackCreateScreen/trackCreateScreen';

import TrackCreateScreenInputs from './TrackCreateScreenRenderHandler/TrackCreateScreenInputs';

// [ IMPORTANT ]
// as long as withNavigationFocus wrapps up the component
// isFocused used as props.
const TrackCreateScreen = ({ isFocused }) => {
    
    const [ 
        error, 
        state, 
        addLocation, 
        startRecording, 
        stopRecording, 
        changeName,
     ] = trackCreateScreen(isFocused);

    return(
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
            <OuterView>
                <TracKCreateTitleView>
                    <TracKCreateTitleText>
                        TrackCreateScreen
                    </TracKCreateTitleText>
                </TracKCreateTitleView>
                <MapTrackView>
                    <Map />
                </MapTrackView>
                <ErrorView>
                    {/* 
                       it is working only in android. ios does not return any error message so far.
                       For iOS need to folowup Expo document
                    */}
                    { error && <ErrorText>{ error }</ErrorText> }
                </ErrorView>
                {/* 1)  when we leave this page, the function runs before we arrives at the next page {<NavigationEvents onWillBlur={ () => console.log("leaving") } />} */}
                <TrackFormView>
                    <TrackCreateScreenInputs  
                        startRecording={ startRecording }
                        stopRecording={ stopRecording }
                        changeName={ changeName }
                        recording={ state.recording }
                        name={ state.name }
                        locations={ state.locations }
                    />
                </TrackFormView>
            </OuterView>
        </SafeAreaView>
    )
}

const OuterView = styled.View`
    flex: 1;
    align-items: center;
`;

const TracKCreateTitleView = styled.View`
    background-color: #FFFFFF;
    height: ${ hp('15%') };

    margin-left: ${ wp('2%') };
    align-self: flex-start;
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

    justify-content: center;
`;

const ErrorView = styled.View`
    height: ${ hp('2%') };
    align-items: center;
`;

const ErrorText = styled.Text`
    color: red;
`;

const TrackFormView = styled.View`
    height: ${ hp('30%') };
    width: ${ wp('85%') };

    align-items: center;
    justify-content: space-around;
`;

// hoc
export default withNavigationFocus(TrackCreateScreen);