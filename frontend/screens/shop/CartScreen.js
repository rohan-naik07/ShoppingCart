import React ,{useState,useCallback} from 'react';
import { Button, FlatList, View,ActivityIndicator} from 'react-native';
import {StyleSheet,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {removeCart,clearCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import CartItem from '../../components/CartItem';

const CartScreen = props=>{
    const CartProducts = useSelector(state=>state.cart.products);
    //console.log(CartProducts)
    const totalPrice = useSelector(state=>state.cart.price);
    const dispatch = useDispatch();
    const [isLoading,setLoading] = useState(false);
    const [error,setError] = useState();

    const placeOrder = useCallback(async (CartProducts,totalPrice)=>{
        setError(null);
        try {
            setLoading(true);
            await dispatch(addOrder(CartProducts,totalPrice));
            dispatch(clearCart()); 
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    },[setError,setLoading,dispatch,addOrder,clearCart])
    
    const renderCartItem = (itemData)=>{
        return (
        <CartItem onSelectItem={()=>{
            props.navigation.navigate('ProductDetails',{
                productId : itemData.item.id,
                productTitle : itemData.item.title
            });
        }}
        onDeletePressed = {()=>{
            dispatch(removeCart(itemData.item));
        }}
                imageUrl={itemData.item.imageUrl}
                title = {itemData.item.title}
                price={itemData.item.price}
                quantity={itemData.item.quantity}/>
        )
    }

    if(isLoading){
        //console.log('loading..')
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
    
    if(error){
        //console.log('error..')
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
            </View>
        )
    }

    if(CartProducts.length===0){
        return <View style={styles.screen}>
                <Text style={styles.empty}>Cart is empty! Wanna put some Stuff?</Text>
            </View>
    }

    return (
        <View style={styles.screen}>
                <FlatList data = {CartProducts}
                    style = {{width : '100%',height:'90%'}}
                    keyExtractor={item=>item.id} 
                    renderItem={renderCartItem}/>
            <View style={styles.total}>
                <Text style={styles.totalPrice}>${totalPrice}</Text>
                <View style={styles.clear}>
                    <Button title="Clear" 
                    color={Colors.primary} onPress={()=>{
                        dispatch(clearCart());
                    }}/>
                </View>
                <View style={styles.clear}>
                    <Button title="Pay" color={Colors.accent} onPress={placeOrder.bind(this,CartProducts,totalPrice)}/>
                </View>
            </View>
        </View>
    );
}

CartScreen.navigationOptions = {
    headerTitle : 'Cart'
}

const styles = StyleSheet.create({
    screen:{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    empty : {
       fontSize : 15,
       color : 'gray'
    },
    totalPrice : {
        width:'30%',
        height:'100%',
        fontSize : 20,
        color : 'white',
        textAlign : 'center',
        backgroundColor:'#2979ff',
        margin : 10,
        padding:10,
        borderRadius : 10,
        shadowColor : 'black',
        shadowOffset : {width : 0,height : 2},
        shadowOpacity : 0.26,
        shadowRadius : 10,
        elevation : 5
    },
    total : {
        width:'100%',
        height : '10%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor: '#f5f5f5',
        margin : 15,
        padding:10,
        borderRadius : 10,
        shadowColor : 'black',
        shadowOffset : {width : 0,height : 2},
        shadowOpacity : 0.26,
        shadowRadius : 10,
        elevation : 5
    },
    clear:{
        width:'30%',
        
    }
});
// export const and default

export default CartScreen;

