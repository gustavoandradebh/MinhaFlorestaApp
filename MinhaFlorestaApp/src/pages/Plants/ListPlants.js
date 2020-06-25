import React, {useEffect} from 'react';
import { View, SafeAreaView,Text, AsyncStorage, Image, TouchableOpacity, StyleSheet } from 'react-native';

import PlantListComponent from '../../components/PlantListComponent';

import logo from '../../assets/logo.png'

export default function ListPlants( {navigation}){
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
        await AsyncStorage.setItem('token', ''); 
        await AsyncStorage.setItem('_id', '');
        navigation.navigate('Login');
    }

    async function handleCreatePlant()
    {
        navigation.navigate('CreatePlant');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <View style={styles.form}>
                <Text style={styles.title}>
                    SUAS PLANTAS
                </Text>

                <TouchableOpacity onPress={handleCreatePlant} style={styles.link}>
                    <Text style={styles.linkText}>Cadastrar nova planta</Text>
                </TouchableOpacity>

                <PlantListComponent />

                <TouchableOpacity onPress={handleLogout} style={styles.button}>
                    <Text style={styles.buttonText}>Fazer logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 10
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
        borderRadius: 4,
        marginBottom: 8
    },

    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

    link: {
        alignItems: "flex-end"
    },
    linkText: {
        fontWeight: 'bold',
        color: '#f05a5b',
        marginBottom: 8,
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 15,
        fontWeight: "bold"
    }
});