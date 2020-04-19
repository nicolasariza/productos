import { combineReducers } from "redux";
import productosReducer from "./productosReducer";
import alertaReducer from "./alertaReducer";
// Combine reducers por si se tienen varios reducers y así solo pasar uno al store
export default combineReducers({
    productos: productosReducer,
    alerta : alertaReducer
});