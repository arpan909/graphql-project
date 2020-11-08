import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import MenuBar from "./components/menubar.component";
import Home from "./pages/home.component";
import Login from "./pages/login.component";
import Register from "./pages/register.component";

function App() {
  return (
    <Container>
      <Router>
        <MenuBar />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
      </Router>
    </Container>
  );
}

export default App;
