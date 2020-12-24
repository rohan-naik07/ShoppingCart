import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import Colors from '../constants/Colors'

const ProductItem = props => {
    return (
        <View style={styles.screen}>
        <TouchableOpacity onPress={props.onSelectItem}>
        <View>
            <ImageBackground source={{uri : props.imageUrl}} style={styles.bgImage}>
                <View style={{...styles.row,...styles.dataContainer}}>
                    <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                    <View style={styles.price}><Text style={styles.title}>${props.price}</Text></View>
                </View>
            </ImageBackground>
        </View>
        </TouchableOpacity>
        {props.children}
    </View>
    )
}

const styles = StyleSheet.create({
    screen : {
        height : 200,
        backgroundColor: '#f5f5f5',
        margin : 15,
        borderRadius : 10,
        shadowColor : 'black',
        shadowOffset : {width : 0,height : 2},
        shadowOpacity : 0.46,
        shadowRadius : 10,
        elevation : 10,
        overflow : 'hidden',
        justifyContent : 'flex-end'
    },
    bgImage: {
        width : '100%',
        height : '100%',
        justifyContent : 'flex-end'
    },
    row : {
        flexDirection : 'row',
        padding : 15,
        justifyContent: 'space-between',
        alignItems : 'center',
    },
    title : {
        fontSize : 15,
        color : 'white',
        textAlign : 'center',
    },
    price :{
        backgroundColor:'#2979ff',
        borderRadius : 20,
        padding : 10
    },
    dataContainer : {
        width : '100%',
        backgroundColor : 'rgba(0,0,0,0.6)',
        padding : 10
    }
})
  export default ProductItem;