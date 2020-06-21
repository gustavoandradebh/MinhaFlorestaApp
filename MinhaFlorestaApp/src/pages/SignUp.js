import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png'

export default function List( { navigation } ){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignUp() {
        const response = await api.post('/users', { 
            name, email, password
        });
        const { _id } = response.data.id;
        
        await AsyncStorage.setItem('token', _token);
        await AsyncStorage.setItem('_id', _id);

        navigation.navigate('ListPlants');
    };

    async function handleCancel()
    {
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image style={{width: 300, height: 150, resizeMode: 'contain'}}
                source={logo} />

            <Text style={styles.title}>
                CADASTRE-SE
            </Text>
            <View style={styles.form}>
                <Text style={styles.label}>SEU NOME *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu nome"
                    placeholderTextColor="#999"
                    keyboardType="default"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setName}
                />

                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>SUA SENHA *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Sua senha"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
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
            marginTop: 50,
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
            borderRadius: 2
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
            fontSize: 16
        },
    });