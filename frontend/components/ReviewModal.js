import Colors from '../constants/Colors';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Modal,
  Alert,
  Text,
  TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as productsActions from '../store/actions/product';
import { Rating, AirbnbRating } from 'react-native-ratings';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const ReviewModal=props => {

  const dispatch = useDispatch();
  const Reviews = ["Terrible", "Bad","Good", "Very Good","Amazing"]
  const [feedback,setFeedback] = useState("");
  const [rating,setRating] = useState("0");
  const ratingCompleted = (Rating)=>{
    setRating(Rating)
  }

  const {productId,toggleModal} = props;

  const submitHandler = useCallback(async() => {
      await dispatch(authActions.addReview(productId,parseInt(rating),feedback))
      await dispatch(productsActions.fetchReviews(productId))
      toggleModal();
  }, [dispatch,rating,feedback,productId]);

     return(
      <Modal
          animationType="fade"
          transparent={true}
          visible={props.open}
          onRequestClose={() => {
            toggleModal();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <AirbnbRating
                count={5}
                reviews={Reviews}
                defaultRating={5}
                onFinishRating={ratingCompleted}
                size={25}
              />
            <View style={styles.formControl}>
                <Text style={styles.label}>Feedback</Text>
                  <TextInput
                    returnKeyType="next"
                    value={feedback}
                    onChangeText={text =>setFeedback(text)}
                    style={styles.input}/>
              </View>
              <View style={{...styles.button,...styles.submit}}>
                    <Button
                      color={Colors.blue}
                      title="Submit"
                      onPress={submitHandler}/>
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
        width : '60%',
        justifyContent: "center",
        marginTop : 10
        //alignItems: "center"
      }
})

export default ReviewModal;