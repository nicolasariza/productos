import React from "react";
import Header from "./components/Header";
import { HashRouter, Switch, Route } from "react-router-dom";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import { Provider } from "react-redux";
import store from "./store";

function App() {

  return (
    <HashRouter basename="/">
      {/*Provider que permitira tener todos los datos del store en toda la app*/}
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <p className="alert alert-warning">Para usarlo se require un json server</p>
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            />
          </Switch>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
