import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './user/Dashboard';
import PrivateRoute from './Components/private Routes/privateRoute';
import DashboardSeller from './user/DashboardSeller';
import AddHotel from './Components/AddHotel';
import StripeCallback from './stripe/StripeCallback';
import EditHotel from './Components/EditHotel';
import ViewHotel from './Components/ViewHotel';
import StripeSuccess from './stripe/StripeSuccess';
import StripeCancel from './stripe/StripeCancel';
import SearchResult from './Components/SearchResult';


function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/hotel/:id" component={ViewHotel}></Route>
        <Route exact path="/search-results" component={SearchResult}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller}></PrivateRoute>
        <PrivateRoute exact path="/hotels/new" component={AddHotel}></PrivateRoute>
        <PrivateRoute exact path="/stripe/callback" component={StripeCallback}></PrivateRoute>
        <PrivateRoute exact path="/stripe/success/:id" component={StripeSuccess}></PrivateRoute>
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel}></PrivateRoute>
        <PrivateRoute exact path="/hotel/edit/:id" component={EditHotel}></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
