import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/header/Header';
import AuthRoute from './components/auth/AuthRoute';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from './slices/authSlice';
import { useEffect } from 'react';
import EmailsPage from './components/emails/Emails';
import Home from './components/home/Home';
import Phishing from './components/token/Phishing';

function App() {
  const verifyingTokenLoading = useSelector(
    (state) => state.authSlice.verifyingTokenLoading
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
  if (verifyingTokenLoading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/" component={EmailsPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/phishing/:token" component={Phishing} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
