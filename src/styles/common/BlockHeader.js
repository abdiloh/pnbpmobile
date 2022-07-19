import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { theme } from "../constants";

export default class Block extends Component {
    render() {
        const {
            flex,
            row,
            column,
            center,
            middle,
            left,
            right,
            card,
            shadow,
            color,
            space,
            style,
            children,
            ...props
        } = this.props;

        const blockStyles = [
            styles.block,
            flex && { flex },
            flex === false && { flex: 0 }, // reset / disable flex
            row && styles.row,
            column && styles.column,
            center && styles.center,
            middle && styles.middle,
            left && styles.left,
            right && styles.right,
            card && styles.card,
            shadow && styles.shadow,
            space && { justifyContent: `space-${space}` },
            color && styles[color], // predefined styles colors for backgroundColor
            color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
            style, // rewrite predefined styles
        ];

        return (
            <View style={blockStyles} {...props}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    card: {
        borderRadius: theme.sizesHeader.border,
    },
    center: {
        alignItems: 'center',
    },
    middle: {
        justifyContent: 'center',
    },
    left: {
        justifyContent: 'flex-start',
    },
    right: {
        justifyContent: 'flex-end',
    },
    accent: { backgroundColor: theme.colorsHeader.accent, },
    primary: { backgroundColor: theme.colorsHeader.primary, },
    secondary: { backgroundColor: theme.colorsHeader.secondary, },
    tertiary: { backgroundColor: theme.colorsHeader.tertiary, },
    black: { backgroundColor: theme.colorsHeader.black, },
    white: { backgroundColor: theme.colorsHeader.white, },
    gray: { backgroundColor: theme.colorsHeader.gray, },
    gray2: { backgroundColor: theme.colorsHeader.gray2, },
})
