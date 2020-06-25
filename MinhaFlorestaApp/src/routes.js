import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Test from './pages/Test';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import ListPlants from './pages/Plants/ListPlants';
import CreatePlant from './pages/Plants/CreatePlant';

const Routes = createAppContainer(
    createSwitchNavigator( {
        Login,
        SignUp,
        ListPlants,
        CreatePlant,
        Test,
    })
);

export default Routes;