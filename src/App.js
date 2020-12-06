import "./App.scss";
import Index from "./components/index.component";
import Show from "./components/show.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 className="banner-title">Vignette</h1>
      </div>

      <Switch>
        <Route path="/read/:id" children={<Show />} />
        <Route exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
