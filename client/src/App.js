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
import SinglePost from "./components/singlepost.component";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Home}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
          <Route exact path="/posts/:postId" component={SinglePost}></Route>
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
