import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Room from './Room';


const Routes = () => {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/chat/:name"><Room/></Route>
      <Redirect to="/" />
    </Switch>
    </>
  );
};

export default Routes;