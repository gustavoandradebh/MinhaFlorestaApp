import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, AsyncStorage, View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

//import Routes from './src/routes';
import ListPlants from './src/pages/Plants/ListPlants';
import CreatePlant from './src/pages/Plants/CreatePlant';
import SignUp from './src/pages/User/SignUp';
import Login from './src/pages/User/Login';

import menu_hamburguer from '../MinhaFlorestaApp/src/assets/drawerWhite.png'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        <Image
          source={menu_hamburguer}
          style={{ width: 40, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}
function LoginScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false, 
        }}/>
      </Stack.Navigator>
  );
}

function ListPlantsScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="PlantList">
        <Stack.Screen
          name="ListPlants"
          component={ListPlants}
          options={{
            title: '', //Set Header Title
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
              backgroundColor: '#f05a5b', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
}

function CreatePlantScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="CreatePlant"
      screenOptions={{
        headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#f05a5b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
      <Stack.Screen
        name="CreatePlant"
        component={CreatePlant}
        options={{
          title: '', 
        }}/>
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="ListPlants"
          options={{ drawerLabel: 'Suas Plantas' }}
          component={ListPlantsScreenStack} />
        <Drawer.Screen
          name="CreatePlant"
          options={{ drawerLabel: 'Cadastrar uma Planta' }}
          component={CreatePlantScreenStack} />
        <Drawer.Screen
          name="Login"
          options={{ drawerLabel: 'Sair/Logout' }}
          component={LoginScreenStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;