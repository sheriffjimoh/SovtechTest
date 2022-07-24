import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View } from 'react-native';
import NavigationStack from './src/components/navigation';


export default function App() {

    return (
        <View style={styles.container}>
              <NavigationStack />
        </View>
    );
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding:10
    }
});
