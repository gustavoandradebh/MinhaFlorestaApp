import React, { useState, useEffect } from 'react';
import {View, Text, AsyncStorage, StyleSheet} from 'react-native';

import api from '../services/api';

export default function PlantListComponent() {
    const [_token, setToken] = useState('');
    const [_idUser, setIdUser] = useState('');
    const [_plants, setPlants] = useState([]);
    
    // async/await e .then(callbackfn) são sintaxes diferentes pra mesma coisa (Promise e código assíncrono)
    useEffect(() => {
        AsyncStorage.getItem('_id').then(storagedId => {
            setIdUser(storagedId);
        });

        AsyncStorage.getItem('token').then(storagedToken => {
            setToken(storagedToken);
        });
    }, []); // array de dependências -> essa função vai rodar sempre que alguma coisa no array mudar. Sem argumento é 
            // em todos os renders, vazio é no primeiro, normalmente pra side-effect (chamada API). Já fiz uns loops 
            // infinitos esquecendo ele. Na dúvida, pega um plugin de VSCode/Eslint pra React Native.

    useEffect(() => {
        async function loadPlants() {
            const bearer = 'Bearer ' + _token;
            const url = `/users/${_idUser}/plants`; // es6 template string
            const { data } = await api.get(url, { 'headers': { 'Authorization': bearer } }); // desestruturação de objeto

            console.log(data);
            setPlants(data.plants);
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
