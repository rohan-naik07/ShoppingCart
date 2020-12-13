import React from 'react';
import {FlatList, Button, Platform, Alert, View,StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import ProductItem from '../../components/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/product';
import {useState,useEffect,useCallback} from 'react';
import ItemModal from '../../components/ItemModal';


const UserProductScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [id,setId] = useState("");
  const [title,setTitle] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");

  const addProductHandler = useCallback(()=>{
    setId("");
    setTitle("");
    setDescription("");
    setImageUrl("");
    setPrice("");
    setModalVisible(true);
  },[setTitle,setDescription,setImageUrl,setModalVisible,setPrice]);

  const editProductHandler = (id) => {
    //props.navigation.navigate('EditProduct', { productId: id });
    const EditProduct = userProducts.find(product=>product.id===id);
    setId(id.toString());
    setTitle(EditProduct.title);
    setImageUrl(EditProduct.imageUrl);
    setDescription(EditProduct.description);
    setPrice(EditProduct.price);
    setModalVisible(true);
  };

  useEffect(()=>{
    props.navigation.setParams({
      add : addProductHandler
    });
  },[addProductHandler]);

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

  return (
    <View style={styles.centeredView}>
    <ItemModal 
        open={modalVisible} 
        toggleModal={()=>{
            setModalVisible(!modalVisible);   
        }}
        id={id}
        title={title}
        description={description}
        price={price}
        imageUrl={imageUrl}/>
        
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
  const showModal = navData.navigation.getParam('add');
  return {
    headerTitle: 'Your Products',
    headerLeft: ()=>(
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
    headerRight: ()=>(
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={showModal}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductScreen;
