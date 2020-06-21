import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Login from './pages/Login';
import List from './pages/List';

const Routes = createAppContainer(
    createSwitchNavigator( {
        Login,
        List
    })
);

export default Routes;