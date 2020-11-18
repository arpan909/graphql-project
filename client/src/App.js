import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/menubar.component";
import Home from "./pages/home.component";
import Login from "./pages/login.component";
import Register from "./pages/register.component";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
