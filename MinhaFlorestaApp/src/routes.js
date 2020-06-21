import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Test from './pages/Test';
import Login from './pages/Login';
import ListPlants from './pages/ListPlants';
import SignUp from './pages/SignUp';

const Routes = createAppContainer(
    createSwitchNavigator( {
        Login,
        ListPlants,
        SignUp,
        Test,
    })
);

export default Routes;