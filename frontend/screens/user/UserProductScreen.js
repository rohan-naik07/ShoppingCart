import React,{useState,useCallback} from 'react';
import {FlatList, Button, Platform, Alert, View,StyleSheet,Text} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/product';


const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = id => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        }
      }
    ]);
  };

 

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <View style={styles.centeredView}>
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelectItem={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <View style={{
              flexDirection:'row',
              justifyContent : 'space-between'
          }}>
            <View  style={styles.button}>
                <Button
                    color={Colors.accent}
                    title="Edit"
                    onPress={() => {
                    editProductHandler(itemData.item.id);
                    }}/>
            </View>  

            <View  style={styles.button}>
                <Button
                    color={Colors.primary}
                    title="Delete"
                    onPress={deleteHandler.bind(this, itemData.item.id)}/>
            </View> 
          </View>   
        </ProductItem>
      )}
    />
     </View>  
  );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center"
      },
      button: {
        width:'50%',
        overflow:'hidden'
      }
})

UserProductScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Products',
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductScreen;
