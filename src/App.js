import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import FilterState from './Сomponents/Context/FilterState'
import AuthState from './Сomponents/Context/authContext/AuthState'
import PrivateRoute from './Сomponents/Pages/PrivateRoute'
import Navbar from './Сomponents/Layout/Navbar';
import Orders from './Сomponents/Pages/Orders';
import Couriers from './Сomponents/Pages/Couriers';
import About from './Сomponents/Pages/About';
import Archive from './Сomponents/Pages/Archive';
import FirstPage from './Сomponents/Pages/FirstPage';
import PrivateRouteCouriers from './Сomponents/Pages/PrivateRouteCouriers';

function App() {

  return (
    <AuthState>
      <FilterState>
        <Router>
        <div className="App">
          <Navbar />
          <div style={container}>
            <Switch>
              <PrivateRoute exact path="/orders" component={Orders}/>
              {/* <PrivateRoute exact path="/couriers" component={Couriers}/> */}
              <PrivateRouteCouriers exact path="/couriers" component={Couriers}/>
              <PrivateRoute exact path="/archive" component={Archive}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/" component={FirstPage}/>
            </Switch>       
          </div>
        </div>
        </Router>
      </FilterState>
    </AuthState>
  );
}

const container = {
  maxWidth: '95%', 
  padding: '10px',
  margin: '0 auto'
}

export default App;
