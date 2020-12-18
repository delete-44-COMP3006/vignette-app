import "./App.scss";
import Index from "./components/index.component";
import Show from "./components/show.component";
import New from "./components/new.component";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav className="d-inline-flex align-items-center justify-content-between w-75">
        <div className="banner-title">
          <Link to="/">Vignette</Link>
        </div>

        <Link to="/write" style={{ fontSize: "2rem" }}>
          Get Writing!
        </Link>
      </nav>

      <Switch>
        <Route path="/write" component={New} />
        <Route path="/read/:id" children={<Show />} />
        <Route exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
