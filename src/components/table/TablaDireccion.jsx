import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaTrash,
  FaPlus,
  FaUser,
  FaEdit,
  FaUserPlus,
} from "react-icons/fa";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoClose } from "react-icons/io5";
import clienteAxios from "../../axios/axios";
import useAuth from "../../hooks/useAuth";
import useValidation from "../../hooks/useValidation";

const PanelDireccion = () => {
  const { auth } = useAuth();
  const { direcciones, obtenerDirecciones, validarInput } = useValidation();
  const [direccionUpdate, setDireccionUpdate] = useState("");
  const [direccionId, setDireccionId] = useState({});
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showConfirmDelete, setShowComfirmDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newDireccion, setNewDireccion] = useState("");
  const [errorText, setErrorText] = useState("");

  const parcearDate = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = date.getMonth() + 1; // Asumimos que enero es 1 y diciembre es 12
    const ano = date.getFullYear() % 100;
    return `${dia}/${mes}/${ano}`;
  };

  const handleDeleteDireccion = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `direccion/eliminar-direccion/${id}`;
    try {
      const response = await clienteAxios.delete(url, config);
      setShowComfirmDelete(false);
      toast.success(response.data.msg);
      setTimeout(() => {
        obtenerDirecciones();
      }, 4000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleCrearDireccion = async (e) => {
    e.preventDefault();
    const errores = validarInput(newDireccion, "text", "");
    setErrorText(errores || "");
    if (errores) {
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      if (token && auth) {
        const url = `/direccion`;

        const respuesta = await clienteAxios.post(
          url,
          { direccionEjecutiva: newDireccion },
          config
        );
        setShowModal(false);
        setNewDireccion('');
        toast.success(respuesta.data.msg);
        setTimeout(() => {
          obtenerDirecciones();
        }, 4000);
      }
    } catch (error) {
      console.error("Error al asignar rol:", error.message);
      toast.error(error.response.data.msg);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const errores = validarInput(direccionUpdate, "text", "");
    setErrorText(errores || "");
    if (errores) {
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `direccion/modificar-direccion/${direccionId}`;
      const respuesta = await clienteAxios.put(
        url,
        { direccionEjecutiva: direccionUpdate },
        config
      );
      setShowModalUpdate(false);
      setDireccionUpdate('');
      toast.success(respuesta.data.msg);
      setTimeout(() => {
        obtenerDirecciones();
      }, 4000);
    } catch (error) {
      console.error("Error al actualizar rol:", error.message);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div>
          <h2 className="bg-clip-text text-xl font-semibold mb-4 text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Direcciones existentes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-l border-b border-r">No.</th>
                  <th className="py-2 px-4 border-l border-b border-r">
                    Dirección Ejecutiva
                  </th>
                  {auth.tipo_usuario==='Admin_Gnl' ? <th className="py-2 px-4 border-b border-r">Creado Por</th> : ''}
                  <th className="py-2 px-4 border-b border-r">
                    Fecha de Creado
                  </th>
                  <th className="py-2 px-4 border-b border-r ">
                    Fecha de Modificado
                  </th>
                  <th className="py-2 px-4 border-b border-r ">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {direcciones.map((direccion, index) => (
                  <tr key={direccion._id}>
                    <td className="py-2 border-l px-6 border-b border-r ">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b border-r ">
                      {direccion.direccionEjecutiva}
                    </td>
                    {auth.tipo_usuario==='Admin_Gnl' ? <td className="py-2 px-4 border-b border-r">
                      {direccion.nombreEjecutivo}
                    </td> : ''}
                    <td className="py-2 px-4 border-b border-r text-center">
                      {parcearDate(new Date(direccion.creado))}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-center">
                      {parcearDate(new Date(direccion.modificado))}
                    </td>
                    <td className="py-2 px-4 border-b border-r">
                      <div className="flex space-x-2 justify-center">
                        <FaEdit
                          className="text-blue-500 cursor-pointer"
                          onClick={() => {
                            setShowModalUpdate(true);
                            setDireccionId(direccion._id);
                            setDireccionUpdate(direccion.direccionEjecutiva);
                          }}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => {
                            setShowComfirmDelete(true);
                            setDireccionId(direccion._id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=" flex justify-items-start">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center mt-3 space-x-1 px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <FaPlus className="h-3 w-2" />
                <span className="text-sm">
                  Agregar nueva Dirección Ejecutiva
                </span>
              </button>
            </div>
          </div>
        </div>
        {showConfirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
              <button
                onClick={() => setShowComfirmDelete(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close confirmation"
              >
                <IoClose size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Advertencia</h2>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas eliminar esta direccion ejecutiva?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowComfirmDelete(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteDireccion(direccionId)}
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h3 className="text-lg font-semibold mb-4">
                Registra una nueva Dirección
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="direccion"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Dirección Ejecutiva
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Dirección Ejecutiva"
                  value={newDireccion}
                  onChange={(e) => setNewDireccion(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errorText && <span className="text-red-500">{errorText}</span>}
              </div>
              <div className="flex justify-between space-x-4 mt-5">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setErrorText("");
                    setDireccionUpdate("");
                    setDireccionId("");
                    setNewDireccion('');
                  }}
                  className="px-10 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={(e) => handleCrearDireccion(e)}
                  className="px-10 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        )}
        {showModalUpdate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
              <button
                onClick={() => {setShowModalUpdate(false)
                    setErrorText("");
                    setDireccionUpdate("");
                    setDireccionId("");
                    setNewDireccion('');
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close confirmation"
              >
                <IoClose size={24} />
              </button>
              <h3 className="text-lg font-semibold mb-4">
                Actualizar Dirección
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="direccion"
                  className="block text-gray-700 text-sm font-semibold mb-1"
                >
                  Dirección Ejecutiva
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="Dirección Ejecutiva"
                  value={direccionUpdate}
                  onChange={(e) => setDireccionUpdate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errorText && <span className="text-red-500">{errorText}</span>}
              </div>
              <div className="flex justify-end space-x-4 mt-5">
                <button
                  onClick={() => {
                    setShowModalUpdate(false);
                    setErrorText("");
                    setDireccionUpdate("");
                    setDireccionId("");
                    setNewDireccion('');
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={(e) => handleUpdate(e)}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default PanelDireccion;
