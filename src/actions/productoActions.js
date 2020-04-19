import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";

import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      // insertar en la API
      await clienteAxios.post("/productos", producto);
      dispatch(agregarProductoExito(producto));
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Intenta de nuevo",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (error) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: error,
});

// Funcion que descarga los productos de la base de datos
export function obtenerProductosAction() {
  return async (dispatch) => {
    // para cambiar el estado de cargando a true
    dispatch(descargarProductos());
    try {
      //Peticion a la api
      const resultado = await clienteAxios.get("/productos");
      // Asinga los productos al state
      dispatch(descargarProductosExito(resultado.data));
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductosExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      Swal.fire(
        "Eliminado!",
        "El producto se eliminó correctamente.",
        "success"
      );
    } catch (error) {
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

// Editar un registro en la api
export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch( editarProducto(producto));
    try{
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    }catch(error){
      console.log(error);
      dispatch(editarProductoError());
    }
  }
  
}

const editarProducto = () => ({
  type:COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = (producto) => ({
  type:PRODUCTO_EDITADO_EXITO,
  payload:producto
})

const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true,
});