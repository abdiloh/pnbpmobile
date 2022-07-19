import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { Text } from '../common/index'
import { Button, Icon, } from 'react-native-elements';

import { theme } from '../constants/'

export default class modalCustom extends Component {
    constructor(props) {
        super(props)
    }

    renderInternet = () => {
        return (
            <View style={{
                backgroundColor: 'white',
                padding: 22,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                borderColor: 'rgba(0, 0, 0, 0.1)',
                height: 300
            }}>
                <Icon type={'FontAwesome5'} name='wifi' style={{fontSize:50, color:theme.colors.accent, paddingBottom:10}}/>
                <Text style={{
                    fontSize: 20,
                    marginBottom: 12,
                    textAlign: 'center'
                }}>Jaringan Internet Terputus</Text>

            </View>
        )
    }

    render() {
        return (
            <Modal
                // isVisible={this.props.isVisible}
                // onSwipeComplete={() => this.props.onSwipeComplete() ? this.props.onSwipeComplete() : null}
                // onBackButtonPress={() => { this.props.onBackButtonPress() ? this.props.onBackButtonPress() : null }}
                // onBackdropPress={() => { this.props.onBackdropPress() ? this.props.onBackdropPress() : null }}
                // swipeDirection={this.props.swipeDirection}
                // style={{ ...this.props.style }}
                backdropOpacity={0.8}
                //animationInTiming={600}
                //backdropTransitionInTiming={1000}
               
            >
            </Modal>
        )
    }
}