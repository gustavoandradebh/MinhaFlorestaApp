import React, {useEffect} from 'react';
import { SafeAreaView,Text, AsyncStorage, Image, TouchableOpacity, StyleSheet } from 'react-native';

import PlantListComponent from '../components/PlantListComponent';

import logo from '../assets/logo.png'

export default function List(){
    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            console.log(token);
            if(token == null || token == '') {
                navigation.navigate('Login');
            }
        })
    }, []);

    async function handleLogout()
    {
        await AsyncStorage.setItem('token', null);
        await AsyncStorage.setItem('_id', null);
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            
            <PlantListComponent/>

            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    logo: {
        height: 100,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10
    },

    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 8
    },

    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12
    },
});