import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Screens/HomeScreen';
import Profile from './Screens/Profile';

const AppNav = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        header: null
      })
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: 'Home'
  }
);
const AppContainer = createAppContainer(AppNav);
export default AppContainer;
