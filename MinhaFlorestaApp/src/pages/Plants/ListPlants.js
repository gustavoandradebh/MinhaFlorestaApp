import React, {useEffect, useState} from 'react';
import { View, SafeAreaView,Text, AsyncStorage, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {ListItem} from 'react-native-elements';

import logo from '../../assets/logo.png'
import api from '../../services/api'

export default function ListPlants( {navigation}){
    
    useEffect(() => {
        AsyncStorage.getItem('token').then(storagedToken => {
            console.log(storagedToken);
            //if(token == null || token == '')
              //  navigation.navigate('Login');

            AsyncStorage.getItem('_id').then(storagedId => {
                //if(storagedToken != null && storagedId != null) {
                    loadPlants(storagedId, storagedToken);
                //}
            })
        })

        async function loadPlants(_idLoggedUser, _tokenUser) {
            try {
                const bearer = 'Bearer ' + _tokenUser;
                const url = `/users/${_idLoggedUser}/plants`; 

                console.log(bearer)
                console.log(url)
                const { data } = await api.get(url, { 'headers': { 'Authorization': bearer } }); 

                setPlants(data.plants);
            }
            catch (err) {
                console.log("Erro: " + err);
            }
        }
    }, []);

    const [_plants, setPlants] = useState([]);
    
    useEffect(() => {
        
        
        
    }, []); 

    function handlePlantDetails(plantId) {
        console.log("Chamou " + plantId);
        //navigation.navigate('PlantDetails');
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

                <View>
                {
                    _plants.map((item, i) => (
                        <TouchableOpacity key={i} onPress={() => handlePlantDetails(item.id)}>
                            <ListItem 
                                key={i}
                                title={item.name}
                                subtitle={item.description}
                                bottomDivider 
                            />
                        </TouchableOpacity>
                    ))
                }
                </View>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFF"
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