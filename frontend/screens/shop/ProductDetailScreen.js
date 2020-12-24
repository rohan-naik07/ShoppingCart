import React, { useEffect,useState,useCallback} from 'react';
import { FlatList, View,Image,Button} from 'react-native';
import {StyleSheet,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {addCart} from '../../store/actions/cart';
import Colors from '../../constants/Colors';
import ReviewModal from '../../components/ReviewModal';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import {fetchReviews} from '../../store/actions/product'
import { Rating, AirbnbRating } from 'react-native-ratings';

const ProductDetailsScreen = props =>{
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');
    const reviews = useSelector(state => state.products.reviews);
    const [isLoading,setLoading] = useState(false);
    const [isRefreshing,setRefreshing] = useState(false);
    const [avgRating,setAvgRating] = useState(0);
    const [isOpen,setOpen] = useState(false);
    const [error,setError] = useState(null);
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
      );
    
    const renderReviewItem = (itemData)=>{
        return (
            <View style={{
                flex : 1,
                margin : 10,
                borderRadius : 10,
                backgroundColor : '#E0E0E0',
                padding : 10
            }}>
            <AirbnbRating
                count={itemData.item.rating}
                showRating={false}
                defaultRating={itemData.item.rating}
                isDisabled={true}
                size={20}
                starContainerStyle={{
                    width : '100%',
                    justifyContent : 'flex-start',
                }}
              />
                <Text>{itemData.item.feedback}</Text>
            </View>
        )
    }

    useEffect(()=>{
        let result = 0;
        if(reviews){
            reviews.forEach(review=>{
                result+=parseFloat(review.rating);
            })
            result = result/reviews.length;
            setAvgRating(result.toFixed(1).toString())
        }
        
    },[isOpen,reviews])
    
    const getReviews= useCallback(async ()=>{
        setError(null);
        setRefreshing(true);
        try{
            await dispatch(fetchReviews(productId));  
        } catch (error){
            setError(error.message)
        }
        setRefreshing(false);
    },[setRefreshing,dispatch,setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
          'willFocus',
          getReviews
        );
        props.navigation.setParams({
            addReview : ()=>{
                setOpen(!isOpen);
            }
        })
        return () => {
          willFocusSub.remove();
        };
      }, []);

    useEffect(()=>{
        setLoading(true);
        getReviews();
        setLoading(false);
    },[getReviews])  // const and useCallback

    if(isLoading){
        return (
            <View style={styles.screen}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
             <ReviewModal 
                open={isOpen}
                navigation = {props.navigation}
                productId ={productId}
                toggleModal={()=>{
                    setOpen(!isOpen);   
            }}/>
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
            <View style={{
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'center',
                margin : 10
            }}>
                <View style={{ flex : 1}}>
                    <Text style={{
                        fontSize : 20
                    }}>User Reviews</Text>
                </View>
                <View style={{ 
                    flex : 1,
                    borderColor : 'black',
                    borderRadius : 10,
                    borderWidth : 1,
                    alignItems : 'center',
                    padding : 5
                }}>
                    <Text style={{color : Colors.primary}}>Average Ratings : {avgRating}</Text>
                </View>
            </View>
            {reviews?
            <FlatList data={reviews}
            onRefresh={getReviews}
            refreshing={isRefreshing}
            style = {{width : '100%'}}
            keyExtractor={item=>item._id} 
            renderItem={renderReviewItem}/>
            :  <Text>No Reviews for this product</Text>}   
        </View>
    );
}

ProductDetailsScreen.navigationOptions = (navData)=>{
    const productTitle = navData.navigation.getParam('productTitle');
    const addReview = navData.navigation.getParam('addReview');
    return{
        headerTitle : productTitle,
        headerRight : ()=> <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Review' 
            iconName='md-create'
            onPress={addReview}/>
            </HeaderButtons>
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