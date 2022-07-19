import React from 'react';
import { View } from 'react-native';

const Cards = (props) => {
	return (
		<View style={styles.containerSytle}>
			{props.children}
		</View>
	);
};

const styles = {
	containerSytle: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 2,
		backgroundColor: '#fff',
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 5,
	}
};

export { Cards };
