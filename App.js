import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome, CodeScreen, CompanyDeets, ForgotPass, ForgotOtp, Changepassword, Home, Support, ProductDetailsScreen, CartScreen, Search, Shippingdeets, Categories } from "./screens";
import { CartProvider } from './screens/CartContext';


const stack = createNativeStackNavigator()


export default function App() {
  return(
    <CartProvider>
    <NavigationContainer independent={true}>
      <stack.Navigator
        initialRouteName='Welcome'
      >
        <stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown:false
          }}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown:false
          }}
        />
        <stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown:false
          }}
        />
         <stack.Screen
          name="CodeScreen"
          component={CodeScreen}
          options={{
            headerShown:false
          }}
        />
        <stack.Screen
          name="CompanyDeets"
          component={CompanyDeets}
          options={{
            headerShown:false
          }}
        />
        <stack.Screen
          name="ForgotPass"
          component={ForgotPass}
          options={{
            headerShown:false
          }}
        />
        <stack.Screen
          name="ForgotOtp"
          component={ForgotOtp}
          options={{
            headerShown:false
          }}
        />
         <stack.Screen
          name="Changepassword"
          component={Changepassword}
          options={{
            headerShown:false
          }}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown:true
          }}
        />
        <stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
          }}
        />
        <stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
          }}
        />
        <stack.Screen
          name="Search"
          component={Search}
          options={{
          }}
        />
         <stack.Screen
          name="Shippingdeets"
          component={Shippingdeets}
          options={{
          }}
        />
         <stack.Screen
          name="Categories"
          component={Categories}
          options={{
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}