import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, SafeAreaView, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';

import api from '../../services/api';
import logo from '../../assets/logo.png'

export default function CreatePlant( { navigation } ){
    const [_name, setName] = useState('');
    const [_description, setDescription] = useState('');
    const [_quantity, setQuantity] = useState('');
    const [_waterDaysInterval, setWaterDaysInterval] = useState('');
    const [_idUser, setIdUser] = useState('');
    const [_token, setToken] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('_id').then(storagedId => {
            setIdUser(storagedId);
        });

        AsyncStorage.getItem('token').then(storagedToken => {
            setToken(storagedToken);
        });
    }, []);

    async function handleCreate() {
        Keyboard.dismiss();

        const bearer = 'Bearer ' + _token;
        const response = await api.post('/plants', { 
            name: _name, 
            description: _description, 
            quantity: _quantity,
            waterDaysInterval: _waterDaysInterval,
            startDate: new Date(),
            userId: _idUser
        }, { 'headers': { 'Authorization': bearer }});

        console.log(response.statuscode);
        console.log(response.data);
        navigation.navigate('ListPlants');
    };

    async function handleCancel()
    {
        navigation.navigate('ListPlants');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <SafeAreaView>
                <Image style={styles.logo} source={logo} />
            </SafeAreaView>

            <Text style={styles.title}>
                INSIRA SUA PLANTA
            </Text>
            <View style={styles.form}>
                <Text style={styles.label}>NOME DA PLANTA *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Nome da planta"
                    placeholderTextColor="#999"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setName}
                />

                <Text style={styles.label}>DESCRIÇÃO</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Descrição"
                    placeholderTextColor="#999"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect={true}
                    onChangeText={setDescription}
                />
                <Text style={styles.label}>INTERVALO DE REGAS (em dias) *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="De quantos em quantos dias é a rega?"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    onChangeText={setWaterDaysInterval}
                />
                <Text style={styles.label}>Quantidade *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Quantas você possui?"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    onChangeText={setQuantity}
                />
                <TouchableOpacity onPress={handleCreate} style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={handleCancel} style={styles.button}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        },
    
        form: {
            alignSelf: 'stretch',
            paddingHorizontal: 30,
            marginTop: 10
        },

        title:{
            color: '#444',
            fontWeight: 'bold',
            fontSize: 26,
            marginTop: 25,
            marginBottom: 20
        },
        label: {
            fontWeight: 'bold',
            color: '#444',
            marginBottom: 8
        },
        
        input: {
            borderWidth: 1,
            borderColor: '#ddd',
            paddingHorizontal: 20,
            fontSize: 16,
            color: '#444',
            height: 44,
            marginBottom: 20,
            borderRadius: 4
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

        logo: {
            height: 100,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 10
        },
    });