import React from 'react';
import ProductList from '../components/Makeup/ProductList'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductDetails from '../components/Makeup/ProductDetails'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar'
import ViewedElements from '../components/User/ViewedElements'

export default function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" >
          <ProductList /> 
        </Route>
        <Route exact path="/products">
          <ProductList /> 
        </Route>
        <Route path="/products/:searchTerm">
          <ProductList /> 
        </Route>
        <Route path="/p/:id">
          <ProductDetails />
        </Route>
        <Route path="/profile">
        </Route>
        <Route path="/viewed">
          <ViewedElements />
        </Route>
      </Switch>

    </Router>
  );
}