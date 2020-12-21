import Colors from '../constants/Colors';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Modal,
  Alert,
  Text
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as productsActions from '../store/actions/product';
import Input from '../components/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


const ItemModal=props => {

  const dispatch = useDispatch();
  
  const submitHandler = useCallback(() => {
   
  }, [dispatch]);

     return(
      <Modal
          animationType="fade"
          transparent={true}
          visible={props.open}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}></View>  
          </View>
        </Modal>
      )
  }

  const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center"
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      formControl: {
        width: '100%'
      },
      label: { 
        marginHorizontal: 5,
        marginVertical : 5
      },
      input: {
        padding: 5,
        borderColor: '#ccc',
        borderRadius : 10,
        borderWidth: 1
      },
      button: {
        width:'40%',
        borderRadius:20,
        overflow:'hidden'
      },
      modalHeader : {
        //justifyContent:'center',
        //alignItems : 'center',
        backgroundColor : Colors.primary,
        borderRadius : 20,
        padding : 10
      },
      textHeader : {
        fontSize : 20,
        color : 'white'
      },
      submit : {
        width : '40%',
        justifyContent: "center",
        //alignItems: "center"
      }
})

export default ItemModal;