import React, { useEffect, useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import {
  FaEye,
  FaTrash,
  FaEdit,
  FaFileDownload,
  FaPlus,
  FaPencilAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import fs from "fs/promises";
import clienteAxios from "../../axios/axios";
import useValidation from "../../hooks/useValidation";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

const ContractTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [contrato, setContrato] = useState({});
  const [numeroDictamen, setNumeroDictamen] = useState("");
  const [numeroDictamenNew, setNumeroDictamenNew] = useState("");
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [monto, setMonto] = useState("");
  const [actualMonto, setActualMonto] = useState(0);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [errorMonto, setErrorMonto] = useState({});
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState();
  const [errorText1, setErrorText1] = useState();
  const [filtarDireccion, setFiltrarDireccion] = useState("");
  const [filtarEntidad, setFiltrarEntidad] = useState("");
  const [filtarEstado, setFiltrarEstado] = useState("");

  const parseDuration = (duration)=> {
    const regex = /(\d+)\s*(months?|years?)/;
    const match = duration.match(regex);
    
    if (match) {
      const quantity = parseInt(match[1]);
      const unit = match[2].toLowerCase().trim();
      
      if (['months', 'years'].includes(unit)) {
        if(quantity===1 && unit ==='months'){
          return `${quantity} mes de vigencia`;
        }
        if(quantity>1 && unit === 'months'){
          return `${quantity} meses de vigencia`;
        }
        if(quantity===1 && unit ==='years'){
          return `${quantity} año de vigencia`;

      }
      if(quantity>1 && unit ==='years'){
        return `${quantity} años de vigencia`;
      }
    }
    
    return null;
  }
  }


  const {
    validarInput,
    obtenerRegistros,
    contratos,
    setContratos,
    entidades,
    direcciones,
    selectContrato,
    setSelectContrato,
    setShowForm,
    isEditing,
    setIsEditing
  } = useValidation();
  let errores, errores2;

  const handleDownload = (id) => {
    const descargas = contratos.filter((contrato) => contrato._id === id);
    if (descargas.length > 0) {
      const link = descargas[0].subirPDF;

      if (!navigator.onLine) {
        toast.error(
          "No hay conexión a internet. No se puede descargar el archivo.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }

      if (link === null) {
        toast.error("No hay archivo vinculado a este registro.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      toast.info("Descargando archivo...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      window.location.href = link;
      setTimeout(() => {
        toast.success("Archivo descargado exitosamente!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 2500);
    } else {
      toast.error("Hubo un error al intentar descargar el archivo.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // 2. Restar 4 horas de una fecha base
  const restarCuatroHoras = (fechaBase) => {
    const offset = -4;
    const correctedDate = new Date(fechaBase.getTime());
    correctedDate.setHours(correctedDate.getHours() + offset);
    return correctedDate;
  };
  const parcearDate = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = date.getMonth() + 1; // Asumimos que enero es 1 y diciembre es 12
    const ano = date.getFullYear() % 100;
    return `${dia}/${mes}/${ano}`;
  };

  const getValueColor = (totalValue, remainingValue) => {
    if (remainingValue >= totalValue * 0.5) {
      return "bg-green-500"; // Más del 50%
    } else if (remainingValue >= totalValue * 0.3) {
      return "bg-yellow-500"; // Entre el 30% y el 50%
    } else {
      return "bg-red-500"; // Menos del 30%
    }
  };
  const handleFilter = async()=>{
    console.log('aqui')
    let query = {};

    if (filtarEstado) {
      query.estado = filtarEstado;
    }

    if (filtarDireccion) {
      query.direccionEjecuta = filtarDireccion;
    }

    if (filtarEntidad) {
      query.entidad = filtarEntidad;
    }
    if (Object.keys(query).some(key => query[key] !== '')) {
      console.log(query);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    
      try {
        const url = `contratos/filtrar-contratos`;
        const response = await clienteAxios.post(url, query, config);
        console.log(response.data);
        setContratos(response.data);
      } catch (error) {
        console.log(error);
      }
    }

  }

  const handleEliminarRegistro = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `contratos/eliminar-registro-contrato/${id}`;
      const response = await clienteAxios.delete(url, config);
      toast.success(response.data.msg);
      setShowEliminarModal(false);
      obtenerRegistros();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `facturas/eliminar-factura/${id}?numeroDictamen=${selectedInvoice.numeroDictamen}`;
      console.log(id, selectedInvoice.numeroDictamen);
      const response = await clienteAxios.delete(url, config);
      toast.success(response.data.msg);
      setShowModal(false);
      obtenerRegistros();
      setId("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    errores = validarInput(numeroDictamenNew, "text", "");
    errores2 = validarInput(monto, "number", "");
    console.log(errores, errores2);

    setErrorMonto({});
    setErrorText(errores || "");
    setErrorText1(errores2 || "");
    if (errores || errores2) {
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
      const url = `facturas/advertencia-monto-modificar`;
      const response = await clienteAxios.post(url, { _id: id, monto }, config);
      if (response.data) {
        setErrorMonto(response.data);
      }
    } catch (error) {
      console.error(error);
      setErrorMonto(error.response.data);

      return;
    }
    try {
      const url = `facturas/modificar-factura`;
      const response = await clienteAxios.put(
        url,
        { numeroDictamen, newNumeroDictamen: numeroDictamenNew, monto: monto },
        config
      );
      toast.success(response.data.msg);
      setShowModalUpdate(false);
      setErrorMonto({});
      setMonto("");
      setNumeroDictamen("");
      obtenerRegistros();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    errores = validarInput(numeroDictamen, "text", "");
    errores2 = validarInput(monto, "number", "");
    console.log(errores, errores2);
    setErrorMonto({});
    setErrorText(errores || "");
    setErrorText1(errores2 || "");
    if (errores || errores2) {
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
      const url = `facturas/advertencia-monto-crear`;
      const response = await clienteAxios.post(url, { _id: id, monto }, config);
      if (response.data) {
        setErrorMonto(response.data);
      }
    } catch (error) {
      console.error(error);
      setErrorMonto(error.response.data);

      return;
    }
    try {
      const url = `facturas/crear-factura`;
      const response = await clienteAxios.post(
        url,
        { _id: id, numeroDictamen, monto },
        config
      );
      toast.success(response.data.msg);
      setErrorMonto({});
      setErrorText("");
      setErrorText1("");
      setMonto("");
      setNumeroDictamen("");
      setShowModalCreate(false);
      obtenerRegistros();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleModal = (type, invoice, id) => {
    setModalType(type);
    if (type === "view") {
      obtenerFactura(invoice);
    }
    if (type === "info") {
      setContrato(invoice);
    }

    if (type === "delete") {
      console.log(invoice);
      obtenerFactura(invoice);
      setNumeroDictamen(selectedInvoice.numeroDictamen);
      setMonto(selectedInvoice.monto);
    }

    setShowModal(true);
  };
  const obtenerFactura = async (fac) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `facturas/visualizar-factura/`;
      const response = await clienteAxios.post(
        url,
        { numeroDictamen: fac.numeroDictamen },
        config
      );
      const factura = response.data;
      await setSelectedInvoice(factura);
      console.log(factura);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerRegistros();
  }, []);

  const Modal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            {modalType === "view" && "Detalles de la Factura"}
            {modalType === "delete" && "Eliminar Factura"}
            {modalType === "info" && "Detalles del Registro"}
          </h2>

          <div className="mb-4">
            {modalType === "view" && (
              <div>
                <div></div>
                <p className="font-semibold ">
                  Número de Dictamen:{" "}
                  <span className="text-gray-600">
                    {selectedInvoice?.numeroDictamen}
                  </span>
                </p>
                <p className="font-semibold ">
                  Fecha:{" "}
                  <span className="text-gray-600">
                    {parcearDate(
                      restarCuatroHoras(
                        new Date(selectedInvoice?.fechaCreacion)
                      )
                    )}
                  </span>
                </p>
                <p className="font-semibold ">
                  Monto:{" "}
                  <span className="text-gray-600">
                    ${selectedInvoice?.monto}
                  </span>
                </p>
              </div>
            )}
            {modalType === "delete" && (
              <p>
                ¿Está seguro de eliminar la factura{" "}
                {selectedInvoice?.numeroDictamen}?
              </p>
            )}
            {modalType === "info" && (
              <div>
                <p className=" font-semibold ">
                  Creado por:{" "}
                  <span className="text-gray-600">
                    {contrato.info?.creadoPor}
                  </span>
                </p>
                <p className=" font-semibold ">
                  Fecha de creación:{" "}
                  <span className="text-gray-600">
                    {parcearDate(
                      restarCuatroHoras(
                        new Date(contrato.info?.fechaDeCreacion)
                      )
                    )}
                  </span>
                </p>
                <p className=" font-semibold ">
                  Modificado por:{" "}
                  <span className="text-gray-600">
                    {contrato.info?.modificadoPor}
                  </span>
                </p>
                <p className=" font-semibold ">
                  Fecha de modificación:{" "}
                  <span className="text-gray-600">
                    {parcearDate(
                      restarCuatroHoras(
                        new Date(contrato.info?.fechaDeModificacion)
                      )
                    )}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {modalType === "view" || modalType === "info"
                ? "Cerrar"
                : "Cancelar"}
            </button>
            {modalType !== "view" && (
              <>
                {modalType === "delete" ? (
                  <button
                    onClick={() => handleDelete()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mx-auto p-4 ">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          Listado de Contratos{" "}
        </h1>
        <div className="mb-4 pr-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <select
            id="direccionEjecutiva"
            name="direccionEjecutiva"
            placeholder="Filtrar por dirección ejecutiva"
            value={filtarDireccion}
            onChange={(e) => setFiltrarDireccion(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value=" ">Filtrar por dirección ejecutiva</option>
            {direcciones.map((direccion) => (
              <option key={direccion._id} value={direccion.direccionEjecutiva}>
                {direccion.direccionEjecutiva}
              </option>
            ))}
          </select>
          <select
            id="entidad"
            name="entidad"
            placeholder="Entidad"
            value={filtarEntidad}
            onChange={(e) => setFiltrarEntidad(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value=" ">Filtar por Entidad.</option>
            {entidades.map((entidad) => (
              <option key={entidad._id} value={entidad.entidad}>
                {entidad.entidad}
              </option>
            ))}
          </select>

          <select
            type="text"
            id="estado"
            name="estado"
            value={filtarEstado}
            onChange={(e) => setFiltrarEstado(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value=" ">Filtar por estado</option>
            <option value="Ejecución">Ejecución</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button
            onClick={()=>handleFilter()}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700  transition duration-200"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={()=>{
              setFiltrarDireccion('');
              setFiltrarEntidad('');
              setFiltrarEstado('');
              obtenerRegistros();
            }}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
          >
            Limpiar Filtros
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-l">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Contrato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Objeto del Contrato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección Ejecutiva
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aprovado por el CC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Firmado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entregado al área jurídica
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Recibido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Disponible
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Gastado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facturas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vigencia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha de Vencimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. de Dicttamen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PDF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Editar e info del Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                  Crear Factura
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contratos.map((contract, index) => (
                <tr className="border-l border-r" key={contract._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contract.tipoDeContrato}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contract.objetoDelContrato}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contract.entidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contract.direccionEjecuta}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcearDate(
                      restarCuatroHoras(new Date(contract.aprobadoPorCC))
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcearDate(restarCuatroHoras(new Date(contract.firmado)))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcearDate(
                      restarCuatroHoras(new Date(contract.entregadoJuridica))
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcearDate(
                      restarCuatroHoras(new Date(contract.fechaRecibido))
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${contract.valor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${getValueColor(
                          contract.valor,
                          contract.valorDisponible
                        )} mr-2`}
                      ></div>
                      ${contract.valorDisponible}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${contract.valorGastado}
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {contract.factura.length === 0 ? (
                        <p className=" text-clip text-gray-500">
                          Sin facturas asociadas
                        </p>
                      ) : (
                        <>
                          {contract.factura.map((factura) =>
                            factura.numeroDictamen ? (
                              <div
                                key={factura._id}
                                className="flex items-center space-x-2"
                              >
                                <span>Fac {factura.numeroDictamen}</span>
                                <div className="flex space-x-1">
                                  <FaEye
                                    className="text-blue-500 cursor-pointer"
                                    onClick={() =>
                                      handleModal("view", factura, "")
                                    }
                                  />
                                  <FaTrash
                                    className="text-red-500 cursor-pointer"
                                    onClick={() => {
                                      handleModal("delete", factura, "");
                                      setId(contract._id);
                                    }}
                                  />
                                  <FaEdit
                                    className="text-yellow-500 cursor-pointer"
                                    onClick={() => {
                                      setNumeroDictamenNew(
                                        factura?.numeroDictamen
                                      );
                                      setNumeroDictamen(
                                        factura?.numeroDictamen
                                      );
                                      setErrorMonto({});
                                      setActualMonto(factura?.monto);
                                      setShowModalUpdate(true);
                                      setId(contract._id);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          )}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parseDuration(contract.vigencia)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parcearDate(
                      restarCuatroHoras(new Date(contract.fechaVencimiento))
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contract.estado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contract.numeroDictamen}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FaFileDownload
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleDownload(contract._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className=" flex space-x-2 justify-around">
                      <FaPencilAlt className="text-blue-500  cursor-pointer"
                      onClick={()=>{
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setShowForm(true);
                        setSelectContrato(contract)
                        setIsEditing(true);

                      }}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setShowEliminarModal(true);
                          setId(contract._id);
                        }}
                      />
                      <FaInfoCircle
                        className="text-blue-500  cursor-pointer"
                        onClick={() => handleModal("info", contract, "")}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={async () => {
                        setShowModalCreate(true);
                        await setId(contract._id);
                        setMonto("");
                        setNumeroDictamen("");
                      }}
                      className="flex items-center space-x-1 px-1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FaPlus className="h-3 w-2" />
                      <span className="font-serif text-sm">Crear Factura</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModalUpdate && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
                  <button
                    onClick={() => {
                      setShowModalUpdate(false);
                      setNumeroDictamen("");
                      setNumeroDictamenNew("");
                      setMonto("");
                      setErrorMonto({});
                      setErrorText("");
                      setErrorText1("");
                      setId("");
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close confirmation"
                  >
                    <IoClose size={24} />
                  </button>
                  <h3 className="text-xl font-semibold mb-4">
                    Actualizar Factura
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="numeroDictamen"
                      className="block text-gray-700 text-sm font-semibold mb-1"
                    >
                      Número Dictamen
                    </label>
                    <input
                      type="text"
                      id="numeroDictamen"
                      name="numeroDictamen"
                      placeholder="Número Dictamen"
                      value={numeroDictamenNew}
                      onChange={(e) => setNumeroDictamenNew(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errorText && (
                      <span className="text-red-500">{errorText}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="monto"
                      className="block text-gray-700 text-sm font-semibold mb-1"
                    >
                      Monto (Valor Actual: {actualMonto})
                    </label>
                    <input
                      type="number"
                      id="monto"
                      name="monto"
                      placeholder={`Monto actual ${actualMonto}`}
                      value={monto}
                      onChange={(e) => {
                        setMonto(e.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errorText1 && (
                      <span className="text-red-500">{errorText1}</span>
                    )}
                    {errorMonto && (
                      <span
                        className={`${
                          errorMonto.success === true
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {errorMonto.msg}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4 mt-5">
                    <button
                      onClick={() => {
                        setShowModalUpdate(false);
                        setNumeroDictamen("");
                        setNumeroDictamenNew("");
                        setErrorMonto({});
                        setErrorText("");
                        setErrorText1("");
                        setMonto("");
                        setId("");
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={(e) => handleUpdate(e)}
                      className={`px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors`}
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {showModalCreate && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
                  <button
                    onClick={() => {
                      setShowModalCreate(false);
                      setErrorText("");
                      setErrorText1("");
                      setId("");
                      setErrorMonto({});
                      setMonto("");
                      setNumeroDictamen("");
                    }}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close confirmation"
                  >
                    <IoClose size={24} />
                  </button>
                  <h3 className="text-xl font-semibold mb-4">
                    Registrar una nueva factura
                  </h3>
                  <div className="mb-4">
                    <label
                      htmlFor="numeroDictamen"
                      className="block text-gray-700 text-sm font-semibold mb-1"
                    >
                      Número Dictamen
                    </label>
                    <input
                      type="text"
                      id="numeroDictamen"
                      name="numeroDictamen"
                      placeholder="Número Dictamen"
                      value={numeroDictamen}
                      onChange={(e) => setNumeroDictamen(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errorText && (
                      <span className="text-red-500">{errorText}</span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="monto"
                      className="block text-gray-700 text-sm font-semibold mb-1"
                    >
                      Monto
                    </label>
                    <input
                      type="number"
                      id="monto"
                      name="monto"
                      placeholder="Monto"
                      value={monto}
                      onChange={(e) => {
                        setMonto(e.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errorText1 && (
                      <span className="text-red-500">{errorText1}</span>
                    )}
                    {errorMonto && (
                      <span
                        className={`${
                          errorMonto.success === true
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {errorMonto.msg}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4 mt-5">
                    <button
                      onClick={() => {
                        setShowModalCreate(false);
                        setErrorText("");
                        setErrorText1("");
                        setId("");
                        setErrorMonto({});
                        setMonto("");
                        setNumeroDictamen("");
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={(e) => handleCreate(e)}
                      className={`px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors `}
                    >
                      Registrar
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {showEliminarModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl animate-fadeIn">
                <button
                  onClick={() => setShowEliminarModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close confirmation"
                >
                  <IoClose size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">Advertencia</h2>
                <p className="text-gray-600 mb-6">
                  ¿Estás seguro de que deseas eliminar este registro?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowEliminarModal(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleEliminarRegistro()}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && <Modal />}
    </>
  );
};

export default ContractTable;
