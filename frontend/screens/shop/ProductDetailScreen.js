import React, { useEffect } from 'react';
import { FlatList, View,Image,Button,ScrollView } from 'react-native';
import {StyleSheet,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {addCart} from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductDetailsScreen = props =>{
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
      );

    return (
        <View style={styles.screen}>
            <View style={styles.ImageContainer}>
                <Image style={styles.Image} source={{uri : selectedProduct.imageUrl}}/>
            </View>
            <View style={styles.ButtonContainer}>
                <Button title="Add to cart" color= {Colors.primary} onPress={()=>{
                    dispatch(addCart(selectedProduct));
                    props.navigation.navigate('Cart');
                }}/>
            </View>
            <View style={styles.titleContainer}>
                <Text>{selectedProduct.description}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={{
                    color : 'white',
                    fontSize : 20
            }}>${selectedProduct.price}</Text>
            </View>
        </View>
    );
}

ProductDetailsScreen.navigationOptions = (navData)=>{
    const productTitle = navData.navigation.getParam('productTitle');
    return{
        headerTitle : productTitle
    }
}

const styles = StyleSheet.create({
    screen:{
        flex : 1,
        alignItems : 'center'
    },
    ImageContainer : {
        width : '100%',
        height : '40%'
    },
    titleContainer : {
        margin : 10,
        backgroundColor : '#E0E0E0',
        width : '70%',
        borderRadius : 10,
        padding : 10,
        alignItems: 'center'
    },
    priceContainer:{
        margin : 10,
        backgroundColor : '#0288D1',
        width : '60%',
        borderRadius : 10,
        padding : 10,
        alignItems: 'center'
    },
    Image: {
        width : '100%',
        height : '100%'
    },
    ButtonContainer : {
        width : '100%',
        marginBottom : 10
    }
});


export default ProductDetailsScreen;