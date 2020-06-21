import React, { useState, useEffect } from 'react';
import {View, Text, AsyncStorage, StyleSheet} from 'react-native';

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
        });
    });

    useEffect(() => {
        async function loadPlants() {
            const bearer = 'Bearer ' + _token;
            const url = '/users/' + _idUser + '/plants';
            const response = await api.get(url, { 'headers': { 'Authorization': bearer } });

            console.log(response.data);
            setPlants(response.data.plants);
        }

        loadPlants();
    }, []);
    return ( 
    <View style={styles.container}>
        <Text>{_idUser}</Text>
        <Text>{_token}</Text>
        <Text style={styles.title}>{_plants[0].name}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
        fontWeight: "bold"
    }
})