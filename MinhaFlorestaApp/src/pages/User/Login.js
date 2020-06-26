import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../../services/api';
import logo from '../../assets/logo.png'

export default function Login( { navigation } ){
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('token').then(user => {
            if(user) {
                //navigation.navigate('ListPlants');
            }
        })
    }, []);

    async function handleLogin() {
        const response = await api.post('/sessions/authenticate', {
            email: _email,
            password: _password
        });
       
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('_id', response.data.id);

        navigation.navigate('ListPlants');
    };

    async function handleSignUp()
    {
        navigation.navigate('SignUp');
    }
    return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>

        <Image source={logo} />

        <View style={styles.form}>
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
            <TouchableOpacity onPress={handleSignUp} style={styles.link}>
                <Text style={styles.linkText}>Ainda não possui cadastro?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
        
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    labelSecundario: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 2,
        marginTop: 30
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
        borderRadius: 4
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
    }
});

