import React, { useState } from 'react';
import { StatusBar, Alert,TextInput, SafeAreaView, AsyncStorage, Text, StyleSheet, TouchableOpacity } from 'react-native'
import api from '../services/api';
export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() { 
        const user_id = await AsyncStorage.getItem('user');
        const response = await api.post(`/spots/${id}/bookings`,{
            date
        },{
            headers:{user_id}
        })
        const {message} = response.data;
       Alert.alert(message);

       navigation.navigate('List');
    }

    async function handleCancel() { 
       
       navigation.navigate('List');
    }

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor='#999'
                autoCapitalize='words'
                value={date}
                autoCorrect={false}
                onChangeText={text => setDate(text)}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:30
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop:30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop:10
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});