import React from 'react';
import LottieView from 'lottie-react-native';
import { width, height } from '../utility/'
export default class BasicExample extends React.Component {

    componentDidMount() {
        this.animation.play();
        this.animation.play(30, 90);
    }
    componentWillUnmount() {
        this.animation.play()
    }
    render() {
        return (
            <LottieView
                source={require('../images/truck_running')}
                ref={animation => {
                    this.animation = animation;
                }}
                style={{
                    width: width / 2,
                    height: height / 5,
                    //marginTop: -10,
                }}
            />
        );
    }
}