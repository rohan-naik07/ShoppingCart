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
  const id = props.id;
  const [title,setTitle] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");

  const onInputChange = (key,value,isValid)=>{
    console.log(value)
    switch (key){
      case "title":
          setTitle(value);
        break;
      case "description":
          setDescription(value);
        break;
      case "imageUrl":
          setImageUrl(value);
        break;
      case "price":
          setPrice(value.toString());
        break;
      default: break;
    }
  }

  useEffect(()=>{
    if(props.id){
      setTitle(props.title);
      setImageUrl(props.imageUrl);
      setDescription(props.description);
      setPrice(props.price);
    }
  },[])

  
  const submitHandler = useCallback(() => {
    console.log({
      title,
      description,
      price,
      imageUrl
    })
    if (props.title!='') {
      console.log('updated')
      dispatch(
        productsActions.updateProduct(
          id,
          title,
          description,
          imageUrl,
          price.toString()
        )
      );
    } else {
      console.log('added')
      dispatch(
        productsActions.createProduct(
          title,
          description,
          imageUrl,
          +price
        )
      );
    }
    //props.navigation.goBack();
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
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.textHeader}>{props.title?"Edit Product" : "Add Product"}</Text>
              </View>
              <Input
                id="title"
                label="Title"
                errorText="Please enter a valid title!"
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
                onInputChange={onInputChange}
                initialValue={props.title}
                initiallyValid={!!props.title}
                required
              />
              <Input
                id="imageUrl"
                label="Image Url"
                errorText="Please enter a valid image url!"
                keyboardType="default"
                returnKeyType="next"
                onInputChange={onInputChange}
                initialValue={props.imageUrl}
                initiallyValid={!!props.imageUrl}
                required
              />
        
              <Input
                id="price"
                label="Price"
                errorText="Please enter a valid price!"
                keyboardType="decimal-pad"
                returnKeyType="next"
                initialValue = {props.price.toString()}
                onInputChange={onInputChange}
                required
                min={0.1}
              />
              <Input
                id="description"
                label="Description"
                errorText="Please enter a valid description!"
                keyboardType="default"
                autoCapitalize="sentences"
                autoCorrect
                multiline
                numberOfLines={3}
                onInputChange={onInputChange}
                initialValue={props.description}
                initiallyValid={!!props.description}
                required
                minLength={5}
              />

              <View style={{
                flexDirection:'row',
                width : '100%',
                padding : 5,
                margin :10,
                justifyContent : 'space-between'
              }}>
                <View style={{...styles.button,...styles.submit}}>
                    <Button
                      color={Colors.accent}
                      title="Submit"
                      onPress={submitHandler}/>
                  </View>
                  <View style={{...styles.button,...styles.submit}}>
                    <Button
                      color={Colors.primary}
                      title="Dismiss"
                      onPress={() => {
                      props.toggleModal();
                    }}/>
                 </View>
              </View>  
            </View>
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