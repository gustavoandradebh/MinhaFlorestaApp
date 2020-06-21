import React from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function Test(){

    async function handleLogin() {
        const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjVlZWZiZTMxNjU3NmFmNGQ0OGEwOTdhNyIsIm5iZiI6MTU5Mjc3MDIwOSwiZXhwIjoxNjI0MzA2MjA0LCJpYXQiOjE1OTI3NzAyMDl9.m219S_JjWOaIzIEBQBgVBVCQXU-yhNfo0EoedES90QU'); 
        const response = await api.get('/users/5eefbe316576af4d48a097a7', { headers: { Authorization: AuthStr } });
        
        console.log(response.data.id);

        
    };

    return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
        <View style={styles.form}>

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
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    buttonText:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});

