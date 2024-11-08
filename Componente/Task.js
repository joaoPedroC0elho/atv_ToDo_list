import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const task = (props) =>{
    return(
        <View style = {styles.item}>
            <View style = {styles.itemLeft}>
                <TouchableOpacity style = {styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style= {styles.circulo}></View>
        </View>
        
    

    )
}

const styles = StyleSheet.create ({

    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      square: {
        width: 24,
        height: 24,
        backgroundColor: '#16697A',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
      },
      itemText: {
        maxWidth: '80%',
      },
      circulo: {
        width: 12,
        height: 12,
        borderColor: '#16697A',
        borderWidth: 2,
        borderRadius: 5,
      }, 

});

export default task;