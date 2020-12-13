import React,{useState,useEffect,useCallback} from 'react';
import { View,FlatList, Text, Platform,StyleSheet,ScrollView,Image,ActivityIndicator } from 'react-native';
import { useSelector,useDispatch} from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {fetchOrders} from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import HeaderButton from '../../components/HeaderButton';

const OrderItem = props=>{
  return (
    <View style={styles.orderItem}>
      <Image source={{uri : props.image}} style={styles.orderImage}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.quantity}>{props.quantity.toString()}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.price}>${props.price}</Text>
      </View>
    </View>
  )
}

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();
  const [isLoading,setLoading] = useState(false);
  const [isRefreshing,setRefreshing] = useState(false);
  const [error,setError] = useState();

  const getOrders = useCallback(async ()=>{
    setError(null);
    setRefreshing(true);
    try {
      await dispatch(fetchOrders());
    } catch (error) {
      setError(error.message)
    }
    setRefreshing(false);
  },[setError,setRefreshing,dispatch])

  
  useEffect(()=>{
    setLoading(true);
    getOrders();
    setLoading(false);
  },[setLoading,getOrders])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      getOrders
    );

    return () => {
      willFocusSub.remove();
    };
  }, [getOrders]);
  

  const renderOrderItem = (itemData) => {
    const orderedProducts = itemData.item.items;
    const Date = itemData.item.date;

    return (
      <View style={styles.item}>
        <View style={styles.date}>
          <Text style={{
              fontSize : 15,
              color : 'white'
          }}>{Date.toDateString()}</Text>
          <Text style={{
              fontSize : 20,
              padding : 10,
              color: 'black',
              backgroundColor : Colors.accent,
              borderRadius : 10
          }}>${itemData.item.totalAmount.toString()}</Text>
        </View>
        <ScrollView style={styles.list} key={orderedProducts.id}>
          {orderedProducts.map((product)=>{
            return <OrderItem image={product.imageUrl}
                    title={product.title}
                    price={product.price}
                    quantity={product.quantity}/>
          })}
        </ScrollView>
      </View>
    )
  }

  
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

if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.screen}>
        <Text>No orders found. Maybe start shopping!</Text>
      </View>
    );
  }

  return (
      <View style={styles.screen}>
        <FlatList data = {orders}
           onRefresh={getOrders}
           refreshing={isRefreshing}
          keyExtractor={item=>item.id} 
          renderItem={renderOrderItem}/>
      </View>
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen : {
    flex : 1,
    justifyContent:'center'
  },
  item : {
    flex : 1,
    margin:10,
    backgroundColor: 'white',
    borderRadius : 10,
    elevation : 5,
    overflow : 'hidden',
    shadowColor : 'black',
    shadowOffset : {width : 0,height : 2},
    shadowOpacity : 0.26,
    shadowRadius : 10,
  },
  date : {
    width : '100%',
    height : 60,
    flexDirection : 'row',
    justifyContent : 'space-around',
    backgroundColor: Colors.primary,
    alignItems : 'center'
  },
  orderItem : {
    flex : 1,
    backgroundColor: '#EEEEEE',
    flexDirection : "row",
    justifyContent : 'space-between',
    alignItems: 'center',
    //borderRadius : 10,
    marginTop : 5,
    padding : 20
  },
  list : {
    width : '100%',
    height : 250
  },
  orderImage : {
    height : '100%',
    width : '20%',
  },
  textContainer : {
    height : '100%',
    width : '30%',
    justifyContent : 'center',
    alignItems: 'center',
  },
  title : {
    fontSize : 15,
    padding : 5,
    paddingLeft : 20
  },
  quantity : {
    borderColor : 'black',
    borderWidth : 1,
    borderRadius : 10,
    fontSize : 15,
    padding : 5,
    color : 'black'
  },
  price: {
    fontSize : 15,
    padding : 10,
    marginRight : 10,
    color: 'white',
    backgroundColor : '#2979ff',
    borderRadius : 10
  }
  
})

export default OrdersScreen;
