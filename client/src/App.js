import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';


const App = () => {
  return (
    <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
    </>
  );
}

export default App;
