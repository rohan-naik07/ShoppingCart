import React, { useState,useCallback, useEffect } from 'react';
import { FlatList, View,ActivityIndicator } from 'react-native';
import {StyleSheet,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/ProductItem';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import {fetchProducts} from '../../store/actions/product';


const ProductOverviewScreen = props => {
    const products = useSelector(state=>state.products.availableProducts);
    const dispatch = useDispatch();
    const [isLoading,setLoading] = useState(false);
    const [isRefreshing,setRefreshing] = useState(false);
    const [error,setError] = useState(null);

    const renderProductItem = (itemData)=>{
        return (
        <ProductItem onSelectItem={()=>{
            props.navigation.navigate('ProductDetails',{
                productId : itemData.item.id,
                productTitle : itemData.item.title
            });
        }}
                imageUrl={itemData.item.imageUrl}
                title = {itemData.item.title}
                price={itemData.item.price}/>
        )
    }

    const getProducts= useCallback(async ()=>{
        setError(null);
        setRefreshing(true);
        try{
            await dispatch(fetchProducts());  
        } catch (error){
            setError(error.message)
        }
        setRefreshing(false);
    },[setRefreshing,dispatch,setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
          'willFocus',
          getProducts
        );
    
        return () => {
          willFocusSub.remove();
        };
      }, []);

    const cartHandler = useCallback(()=>{
        props.navigation.navigate('Cart');
    },[]) 

    const drawerHandler = useCallback(()=>{
        props.navigation.toggleDrawer();
    },[]) 

   
    useEffect(()=>{
        props.navigation.setParams({
            cartHandler : cartHandler
        })
        props.navigation.setParams({
            drawerHandler : drawerHandler
        })
        setLoading(true);
        getProducts();
        setLoading(false);
    },[cartHandler,drawerHandler,getProducts,dispatch])  // const and useCallback

    if(isLoading){
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }

    if(error){
        return (
            <View style={styles.screen}>
                <Text>{error}</Text>
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
          <View style={styles.screen}>
            <Text>No products found. Maybe start adding some!</Text>
          </View>
        );
      }
    return(
        <View style={styles.screen}>
            <FlatList data={products}
                onRefresh={getProducts}
                refreshing={isRefreshing}
                style = {{width : '100%'}}
                keyExtractor={item=>item.id} 
                renderItem={renderProductItem}/>
        </View>
    )
}

ProductOverviewScreen.navigationOptions = navData=>{

    const Carthandler = navData.navigation.getParam('cartHandler');
    const drawerHandler = navData.navigation.getParam('drawerHandler');

    return {
        headerTitle : 'All Products',
        headerLeft : ()=> <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' 
            iconName='ios-menu'
            onPress={drawerHandler}/>
            </HeaderButtons>,
        headerRight : ()=> <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart' 
            iconName='ios-cart'
            onPress={Carthandler}/>
            </HeaderButtons>
    };
}

const styles = StyleSheet.create({
    screen:{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
});

export default ProductOverviewScreen;