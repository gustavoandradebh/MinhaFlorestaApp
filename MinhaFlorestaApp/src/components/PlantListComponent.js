import React, { useState, useEffect } from 'react';
import {View, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'

import api from '../services/api';

export default function PlantListComponent() {
    const [_token, setToken] = useState('');
    const [_idUser, setIdUser] = useState('');
    const [_plants, setPlants] = useState([]);
    
    useEffect(() => {
        AsyncStorage.getItem('_id').then(storagedId => {
            setIdUser(storagedId);
        });

        AsyncStorage.getItem('token').then(storagedToken => {
            setToken(storagedToken);

            loadPlants();
        });

        async function loadPlants() {
            try {
                const bearer = 'Bearer ' + _token;
                const url = `/users/${_idUser}/plants`; 

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

    function handlePlantDetails(plantId) {
        console.log("Chamou " + plantId);
        //navigation.navigate('PlantDetails');
    }

    return ( 
    <View style={styles.container}>
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
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    
})
