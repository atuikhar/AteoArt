import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ArtScreen from "./screens/ArtScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ArtListScreen from "./screens/ArtListScreen";
import ArtEditScreen from "./screens/ArtEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/page/:pageNumber" component={HomeScreen} />
          <Route
            exact
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
          />
          <Route exact path="/search/:keyword" component={HomeScreen} />
          <Route exact path="/art/:id" component={ArtScreen} />
          <Route exact path="/admin/userlist" component={UserListScreen} />
          <Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route exact path="/admin/artlist" component={ArtListScreen} />
          <Route exact path="/admin/art/:id/edit" component={ArtEditScreen} />
          <Route
            exact
            path="/admin/artlist/:pageNumber"
            component={ArtListScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
