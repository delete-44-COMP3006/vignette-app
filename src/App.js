import "./App.scss";
import Index from "./components/index.component";
import Show from "./components/show.component";
import New from "./components/new.component";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav className="d-flex flex-wrap flex-lg-nowrap d-lg-inline-flex align-items-center justify-content-center justify-content-md-between w-75 mb-1">
        <Link to="/" className="banner-title">
          Vignette
        </Link>

    <div>
    <Link to="/write" tabIndex={-1}>
          <Button className="w-100">Get Writing!</Button>
        </Link>
        <p className="subtle">You can use ctrl + q instead of clicking this!</p>
    </div>
      </nav>

      <Switch>
        <Route exact path="/write" component={New} />
        <Route path="/read/:id" children={<Show />} />
        <Route exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
