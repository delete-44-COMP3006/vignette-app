import "./App.scss";
import Index from "./components/index.component";
import Show from "./components/show.component";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="banner-title">
        <Link to='/' className="banner-title">Vignette</Link>
      </div>

      <Switch>
        <Route path="/read/:id" children={<Show />} />
        <Route exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
