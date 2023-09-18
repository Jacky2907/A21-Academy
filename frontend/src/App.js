import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js"; 
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Switch, Routes, Navigate } from "react-router-dom";
import React from "react";
import Home from './component/Home/Home.js';
import Loader from "./component/layout/Loader/Loader.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import { loadUser, updatePassword } from "./actions/userAction.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import OrderList from "./component/Admin/OrderList.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import NotFound from "./component/layout/NotFound.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  React.useEffect(() => {
    WebFont.load({
      google:{
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  },  []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  return (
    <Router>
      <Header />

      
      {isAuthenticated && <UserOptions user={user} />}
      

      <Routes>
        
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/search" Component={Search} />

              
        <Route exact path="/account" Component={Profile} />
        <Route exact path="/me/update" Component={UpdateProfile} />
        <Route exact path="/password/update" Component={UpdatePassword} />
        <Route exact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route exact path="/login" Component={LoginSignUp} />
        <Route exact path="/cart" Component={Cart} />
        <Route 
            path="/login/shipping" 
            element={
              user
                ? <Shipping /> 
                : <Navigate to="/login" />  
            }
          />
        <Route exact path="/order/confirm" element={
              user  
                ? <ConfirmOrder /> 
                : <Navigate to="/login" />  
            } />
        
        {stripeApiKey && (
        <Route
          path="/process/payment"
          element={(
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          )}
        />
      )}

        <Route exact path="/success" element={
              user  
                ? <OrderSuccess /> 
                : <Navigate to="/login" />  
            } />

        <Route exact path="/orders" Component={MyOrders} />

        <Route 
            path="/order/:id" 
            element={
              user 
                ? <OrderDetails /> 
                : <Navigate to="/login" />  
            }
          />

        <Route 
            isAdmin={true}
            path="/admin/dashboard" 
            element={
              user && user.role === "admin" 
                ? <Dashboard /> 
                : <Navigate to="/login" />  
            }
          />

      <Route 
            isAdmin={true}
            path="/admin/products" 
            element={
              user && user.role === "admin" 
                ? <ProductList  /> 
                : <Navigate to="/login" />  
            }
          />

      <Route 
            isAdmin={true}
            path="/admin/product" 
            element={
              user && user.role === "admin" 
                ? <NewProduct  /> 
                : <Navigate to="/login" />  
            }
          />

      <Route 
            isAdmin={true}
            path="/admin/product/:id" 
            element={
              user && user.role === "admin" 
                ? <UpdateProduct   /> 
                : <Navigate to="/login" />  
            }
          />

      <Route 
            isAdmin={true}
            path="/admin/orders" 
            element={
              user && user.role === "admin" 
                ? <OrderList   /> 
                : <Navigate to="/login" />  
            }
          />

      <Route 
            isAdmin={true}
            path="/admin/order/:id" 
            element={
              user && user.role === "admin" 
                ? <ProcessOrder  /> 
                : <Navigate to="/login" />  
            }
          />

      <Route 
            isAdmin={true}
            path="/admin/users" 
            element={
              user && user.role === "admin" 
                ? <UsersList /> 
                : <Navigate to="/login" />  
            }
          />

      <Route 
            isAdmin={true}
            path="/admin/user/:id" 
            element={
              user && user.role === "admin" 
                ? <UpdateUser /> 
                : <Navigate to="/login" />  
            }
          />
      <Route 
            isAdmin={true}
            path="/admin/reviews" 
            element={
              user && user.role === "admin" 
                ? <ProductReviews /> 
                : <Navigate to="/login" />  
            }
          />
      
      <Route 
  path="/process/payment"
  element={<Payment />}
/>

<Route 
  path="/contact"
  element={<Contact />}
/>

<Route 
  path="/about"
  element={<About />}
/>


<Route 
  path="*"  
  element={<NotFound />}  
/>
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
