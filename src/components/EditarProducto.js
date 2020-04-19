import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from "../actions/productoActions";
import { useHistory } from "react-router-dom";

const EditarProducto = () => {
  // Nuevo state de producto
  const [producto, setProducto] = useState({
    nombre: "",
    precio: null,
  });

  // utilizar use dispatch y devuelve una funcion
  // Se usa para ejecutar las funciones en los actions
  const dispatch = useDispatch();

  const hisory = useHistory();

  // useSelector para obtener el state
  const productoeditar = useSelector((state) => state.productos.productoeditar);

  // Llenar el state local al cargar la pagina
  useEffect(() => {
    setProducto(productoeditar);
  }, [productoeditar]);
  
  const { nombre, precio } = producto;

  // Leer los datos del formulario
  const onChangeFormulario = (e) => {

    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const submitEditarProducto = (e) => {
    e.preventDefault();

    dispatch(editarProductoAction(producto));

    hisory.push("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar producto
            </h2>
            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label>Precio producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="precio"
                  value={precio}
                  onChange={onChangeFormulario}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
