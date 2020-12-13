import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ImageBackground,Button} from 'react-native';

const CartItem = props => {
    return (
        <View style={styles.screen}>
            <View>
                <View style={{...styles.row,...styles.Header}}>
                    <ImageBackground source={{uri : props.imageUrl}} style={styles.bgImage}>
                        <TouchableOpacity onPress={props.onSelectItem}>
                        <View style={styles.dataContainer}>
                            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </View>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </View>
            <View>
                <View style={{...styles.row, ...styles.cartDetail}}>
                    <Text style={{color:'black'}}>{props.price}</Text>
                    <Text style={styles.quantity}>{props.quantity}</Text>
                    <Button title="Delete" color="#2979ff" onPress={props.onDeletePressed}/>
                </View>
            </View>
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
        shadowOpacity : 0.26,
        shadowRadius : 10,
        elevation : 5,
        overflow : 'hidden',
        //justifyContent : 'flex-end'
    },
    quantity : {
        backgroundColor : '#FFC107',
        padding:10,
        margin: 10,
        borderRadius : 10,
        color: 'black'
    },
    Header : {
        height:'85%'
    },
    bgImage: {
        width : '100%',
        height : '100%',
        justifyContent : 'flex-end'
    },
    row : {
        flexDirection : 'row',
    },
    title : {
        fontSize : 15,
        color : 'white',
        textAlign : 'center'
    },
    dataContainer : {
        width : '100%',
        backgroundColor : 'rgba(0,0,0,0.6)',
        padding : 5
    },
    cartDetail : {
        paddingHorizontal : 10,
        justifyContent: 'space-between',
        alignItems : 'center',
        height : '15%',
    }
})
  export default CartItem;