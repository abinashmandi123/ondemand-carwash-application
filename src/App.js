// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import AddCar from './components/AddCar';
import EditProfile from './components/EditProfile';
import ViewCar from './components/ViewCar';
import EditCar from './components/EditCar';
import UserMgmt from './components/UserMgmt';
import ViewCustomer from './components/ViewCustomer';
import AddWasher from './components/AddWasher';
// import SideNav from './components/SideNav';
import ViewWasher from './components/ViewWasher';
import CarMgmt from './components/CarMgmt';
import ViewAllCars from './components/ViewAllCars';
import Payment from './components/Payment';
import Header1 from './components/Header1';
import Join from './components/Join';
import StripePayment from './services/StripePayment';
import Checkout from './components/Checkout';
import Order from './components/Order';
import Bookings from './components/Bookings';
import ScheduleLater from './components/ScheduleLater';
import Schedules from './components/Schedules';
import ScheduledOrder from './components/ScheduledOrder';


function App() {
  return (
    <div className="App">
      <Router>
        <Header1/>
          <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/addCar" component={AddCar}/>
          <Route exact path="/viewCar" component={ViewCar}/>
          <Route exact path="/viewCars" component={ViewAllCars}/>
          <Route exact path="/editProfile" component={EditProfile}/>
          <Route exact path="/editCar/:id" component={EditCar}/>
          <Route exact path="/usermanagement" component={UserMgmt}/>
          <Route exact path="/viewCustomer" component={ViewCustomer}/>
          <Route exact path="/viewWasher" component={ViewWasher}/>
          <Route exact path="/addWasher" component={AddWasher}/>
          <Route exact path="/carmanagement" component={CarMgmt}/>
          <Route exact path="/payment/:id" component={Checkout}/>
          <Route exact path="/join" component={Join}/>
          <Route exact path="/orders" component={Order}/>
          <Route exact path="/scheduleWash/:id" component={ScheduleLater}/>
          <Route exact path="/yourbookings" component={Bookings}/>
          <Route exact path="/schedules" component={Schedules}/>
          <Route exact path="/scheduledOrder" component={ScheduledOrder}/>
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;
