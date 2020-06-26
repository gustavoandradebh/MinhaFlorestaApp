import React, { useState } from 'react';
import { View, SafeAreaView, Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../../services/api';
import logo from '../../assets/logo.png'

export default function SignUp( { navigation } ){
    const [_name, setName] = useState('');
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');

    async function handleSignUp() {
        const response = await api.post('/users', { 
            name: _name, 
            email: _email, 
            password: _password
        });

        navigation.navigate('Login');
    };

    async function handleCancel()
    {
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <SafeAreaView style={styles.form}>
                <Image style={styles.logo} source={logo} />
            </SafeAreaView>
            
            <Text style={styles.title}>
                FAÇA SEU CADASTRO
            </Text>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex:1,
            alignItems: 'center',
            //justifyContent: 'center',
            backgroundColor: '#FFF'
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
            marginBottom: 20,
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
            height: 180,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 0
        }
    });