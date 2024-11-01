import React, { useState } from 'react';
import FileUploadInput from '../components/ui/fileupload'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./confirmacionModal";

const FormularioContrato = () => {
    
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [formData, setFormData] = useState({
    tipo_contrato: '',
    objeto_contrato: '',
    entidad: '',
    direccionEjecuta: '',
    aprovadorCC: '',
    firmado: '',
    entregadoJuridica: '',
    fechaRecibido: '',
    valor: '',
    vigencia: '',
    estado: '',
    numeroDictamen: '',
    subirPDF: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const showModalForConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const hideModalForConfirmation = () => {
    setShowConfirmationModal(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast.success('Formulario enviado con éxito');
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const fileName = file.name;
      
      if (!file.type.includes('application/pdf')) {
        alert('Solo se permiten archivos PDF');
        return;
      }
  
      alert(`Archivo seleccionado: ${fileName}`);
      setFormData(prevState => ({
        ...prevState,
        subirPDF: fileName
      }));
      event.target.value = '';
    }
  };

  const validateInput = (value, type) => {
    switch(type) {
      case 'tipo_contrato':
        return value.trim() !== '';
      case 'objeto_contrato':
        return value.trim() !== '';
      case 'entidad':
        return value.trim() !== '';
      case 'direccionEjecuta':
        return value.trim() !== '';
      case 'aprovadorCC':
        return !!(new Date(value)).getTime(); // Verifica si es una fecha válida
      case 'firmado':
        return !!(new Date(value)).getTime(); // Verifica si es una fecha válida
      case 'entregadoJuridica':
        return !!(new Date(value)).getTime(); // Verifica si es una fecha válida
      case 'fechaRecibido':
        return !!(new Date(value)).getTime(); // Verifica si es una fecha válida
      
      case 'vigencia':
        return ['mes', 'anio', 'dia'].includes(value.toLowerCase());
      case 'estado':
        return value.trim() !== '';
      case 'numeroDictamen':
        return value.trim() !== '';
    }
  };

  const isValidated = Object.keys(formData).every(key => {
    const value = formData[key];
    return validateInput(value, key);
  });

  return (
    <>
      <div className="container mx-auto px-4">
  <form onSubmit={handleSubmit} className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl bg-white shadow-md rounded px-6 pt-6 pb-8 mb-4">
  <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center mx-auto">
  Registra un nuevo Contrato
</h2>

  
      <div className="mb-4">
        <label htmlFor="tipo_contrato" className="block text-gray-700 text-sm font-semibold mb-1">Tipo de Contrato</label>
        <input
          type="text"
          id="tipo_contrato"
          name="tipo_contrato"
          placeholder="Tipo de Contrato" 
          value={formData.tipo_contrato}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!validateInput(formData.tipo_contrato, 'tipo_contrato') && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="objeto_contrato" className="block text-gray-700 text-sm font-semibold mb-1">Objeto del Contrato</label>
        <textarea
          id="objeto_contrato"
          name="objeto_contrato"
          rows={3}
          placeholder="Objeto del Contrato"
          value={formData.objeto_contrato}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!validateInput(formData.objeto_contrato, 'objeto_contrato') && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="entidad" className="block text-gray-700 text-sm font-semibold mb-1">Entidad</label>
        <input
          type="text"
          id="entidad"
          name="entidad"
          placeholder="Entidad"
          value={formData.entidad}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!validateInput(formData.entidad, 'entidad') && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="direccionEjecuta" className="block text-gray-700 text-sm font-semibold mb-1">Dirección Ejecutiva</label>
        <select
          id="direccionEjecuta"
          name="direccionEjecuta"
          placeholder="Dirección que lo Ejecuta"
          value={formData.direccionEjecuta}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione...</option>
          <option value="Mantenimiento">Mantenimiento</option>
          <option value="Inversiones">Inversiones</option>
          <option value="Servicios">Servicios</option>
        </select>
        {!validateInput(formData.direccionEjecuta, 'direccionEjecuta') && <span className="text-red-500">Este campo es obligatorio</span>}
      </div>
    

    
      <div className="mb-4">
        <label htmlFor="aprovadorCC" className="block text-gray-700 text-sm font-semibold mb-1">Aprobador por el CC</label>
        <input
          type="date"
          id="aprovadorCC"
          name="aprovadorCC"
          placeholder="Aprobador por el CC"
          value={formData.aprovadorCC || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!validateInput(formData.aprovadorCC, 'aprovadorCC') && <span className="text-red-500">Este campo es obligatorio y debe ser una fecha válida</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="firmado" className="block text-gray-700 text-sm font-semibold mb-1">Fecha Firmada</label>
        <input
          type="date"
          id="firmado"
          name="firmado"
          placeholder="Fecha Firmada"
          value={formData.firmado || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!validateInput(formData.firmado, 'firmado') && <span className="text-red-500">Este campo es obligatorio y debe ser una fecha válida</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="entregadoJuridica" className="block text-gray-700 text-sm font-semibold mb-1">Entregado Jurídica</label>
        <input
          type="date"
          id="entregadoJuridica"
          name="entregadoJuridica"
          placeholder="Entregado Jurídica"
          value={formData.entregadoJuridica || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!validateInput(formData.entregadoJuridica, 'entregadoJuridica') && <span className="text-red-500">Este campo es obligatorio y debe ser una fecha válida</span>}
      </div>

      <div className="mb-4">
        <label htmlFor="fechaRecibido" className="block text-gray-700 text-sm font-semibold mb-1">Fecha Recibido</label>
        <input
          type="date"
          id="fechaRecibido"
          name="fechaRecibido"
          placeholder="Fecha Recibido"
          value={formData.fechaRecibido || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {!validateInput(formData.fechaRecibido, 'fechaRecibido') && <span className="text-red-500">Este campo es obligatorio y debe ser una fecha válida</span>}
      </div>
    
   
<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
          Valor
        </label>
  <input
    type="number"
    id="valor"
    name="valor"
    placeholder="Valor" 
    value={formData.valor || ''}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  {/*!validateInput(formData.valor, 'valor') && <span className="text-red-500">Este campo es obligatorio y debe ser un número positivo</span>*/}
</div>

<div className="mb-4">
  <label htmlFor="vigencia" className="block text-sm font-medium text-gray-700 mb-1">
    Vigencia
  </label>
  <div className="flex items-center">
    <input
      type="number"
      id="vigencia"
      name="vigencia"
      placeholder="Vigencia"
      className="shadow appearance-none border rounded-l-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={formData.vigencia || ''}
      onChange={(e) => {
        const value = e.target.value;
        handleChange({ target: { name: 'vigencia', value } });
      }}
    />
    <div className="ml-2 flex-shrink-0">
      <select
        className="bg-gray-200 text-gray-700 border border-gray-400 rounded-r-lg w-32 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onChange={(e) => handleChange({ target: { name: 'vigencia', value: e.target.value } })}
      >
        <option value="">Seleccione...</option>
        <option value="months">Meses</option>
        <option value="years">Años</option>
        <option value="days">Días</option>
      </select>
    </div>
  </div>
  {/*!validateInput(formData.vigencia, 'vigencia') && <span className="text-red-500 ml-2">Este campo es obligatorio</span>*/}
</div>


<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
    Estado
  </label>
  <select
    type="text"
    id="estado"
    name="estado"
    value={formData.estado || ''}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
        <option value="">Seleccione...</option>
            <option value="Ejecutado">Ejecutando</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
  {!validateInput(formData.estado, 'estado') && <span className="text-red-500">Este campo es obligatorio</span>}
</div>

<div className="mb-4">
<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroDictamen">
    Número de Dictamen
  </label>
  <input
    type="text"
    id="numeroDictamen"
    name="numeroDictamen"
    placeholder="Núm. de Dictamen" 
    value={formData.numeroDictamen || ''}
    onChange={handleChange}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  {!validateInput(formData.numeroDictamen, 'numeroDictamen') && <span className="text-red-500">Este campo es obligatorio</span>}
</div>

<div className="mb-4">
  <label htmlFor="subirPDF" className="block text-gray-700 text-sm font-bold mb-2">
    Subir PDF
  </label>
    <FileUploadInput/>
</div>
<ConfirmationModal 
isOpen={showConfirmationModal} 
onClose={() =>  hideModalForConfirmation()} 
onConfirm={(e) => {hideModalForConfirmation()
  handleSubmit(e);
  ; // Llama a este método después de que se ejecute handleSubmit
}}

title="¿Estas  seguro de crer un nuevo registro de contrato?" 
message="Esta acción no se puede deshacer. ¿Deseas continuar?" 
/>
<div className="flex items-center justify-between">
            <a onClick={showModalForConfirmation} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out">
              Crear Registro
            </a>
          </div>
</form>
</div>
<ToastContainer />
</>
);
};

export default FormularioContrato;
