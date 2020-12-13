import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createDrawerNavigator,DrawerNavigatorItems } from 'react-navigation-drawer';
import Colors from '../constants/Colors';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import StartScreen from '../screens/StartScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import AuthScreen from '../screens/user/AuthScreen'
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';


const ProductsNavigator = createStackNavigator({
    ProductsOverview : ProductOverviewScreen,
    ProductDetails : ProductDetailsScreen,
    Cart : CartScreen
},{  
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name= 'md-cart'
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions : {
        headerStyle : {
            backgroundColor : 'white'
        },
        headerTintColor : Colors.primary
    }
});

const OrderScreenNavigator = createStackNavigator({
    Orders : OrdersScreen
},{
    navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name='md-list'
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
    defaultNavigationOptions : {
        headerStyle : {
            backgroundColor : 'white'
        },
        headerTintColor : Colors.primary
    }
});

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='md-create'
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions : {
      headerStyle : {
          backgroundColor : 'white'
      },
      headerTintColor : Colors.primary
  }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },{
    defaultNavigationOptions : {
      headerStyle : {
          backgroundColor : 'white'
      },
      headerTintColor : Colors.primary
    }
  } 
)

const DrawerNavigator = createDrawerNavigator({
    Products : ProductsNavigator,
    Orders : OrderScreenNavigator,
    Admin : AdminNavigator
},{
    contentOptions:{
        activeTintColor : Colors.accent
    },
    contentComponent : (props)=>{
      const dispatch = useDispatch();
      return(
        <View style={{
          flex : 1,
          paddingTop : 20
        }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props}/>
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logoutUser());
              }}/>
          </SafeAreaView>
        </View>
      )
    }
})

const MainNavigator = createSwitchNavigator({
  Start : StartScreen,
  Auth: AuthNavigator,
  Shop: DrawerNavigator
});

export default createAppContainer(MainNavigator);