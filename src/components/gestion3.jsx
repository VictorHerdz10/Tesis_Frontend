import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmationModal from "./confirmacionModal";

const ContractManager = () => {
  const [contracts, setContracts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    contractor: "",
    client: "",
    affiliate: "",
    category: "",
    startDate: new Date(),
    endDate: new Date(),
    budget: 0,
  });
  const [filter, setFilter] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    // Simulating fetching contracts from an API
    const fetchContracts = () => {
      const dummyContracts = [
        {
          id: 1,
          title: "Web Development Project",
          contractor: "Tech Solutions Inc.",
          client: "E-commerce Giant",
          affiliate: "Digital Marketing Agency",
          category: "IT Services",
          startDate: new Date(2023, 0, 1),
          endDate: new Date(2023, 11, 31),
          budget: 50000,
        },
        {
          id: 2,
          title: "Marketing Campaign",
          contractor: "Creative Minds Co.",
          client: "Startup Innovators",
          affiliate: "Social Media Influencers",
          category: "Marketing",
          startDate: new Date(2023, 3, 1),
          endDate: new Date(2023, 8, 30),
          budget: 25000,
        },
      ];
      setContracts(dummyContracts);
    };

    fetchContracts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, type) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: date ? date.toISOString().split('T')[0] : ''
    }));
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      if (!file.type.includes('application/pdf')) {
        console.error('Solo se permiten archivos PDF');
        return;
      }

      console.log('Archivo seleccionado:', {
        name: file.name,
        type: file.type,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      });

      event.target.value = '';
    }
  };

  const showModalForConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const hideModalForConfirmation = () => {
    setShowConfirmationModal(false);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    /*if (formData.id) {
      // Update existing contract
      setContracts(
        contracts.map((contract) =>
          contract.id === formData.id ? { ...formData } : contract
        )
      );
      hideModalForConfirmation();
      toast.success("Contract updated successfully!");
    } else {
      // Add new contract
      const newContract = { ...formData, id: Date.now() };
      setContracts([...contracts, newContract]);
      hideModalForConfirmation();
      toast.success("Contract added successfully!");
    }
    setFormData({
      id: "",
      title: "",
      contractor: "",
      client: "",
      affiliate: "",
      category: "",
      startDate: new Date(),
      endDate: new Date(),
      budget: 0,
    });
    setShowForm(false);*/
    console.log("primer clic")
      toast.success("Contract added successfully!");
  };

  const handleEdit = (contract) => {
    setFormData(contract);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setContracts(contracts.filter((contract) => contract.id !== id));
    toast.success("Contract deleted successfully!");
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredContracts = contracts.filter((contract) => {
    return Object.keys(filter).every((key) => {
      if (!filter[key]) return true;
      return contract[key].toString().toLowerCase().includes(filter[key].toLowerCase());
    });
  });

  const getBudgetStatus = (budget) => {
    if (budget > 40000) return "bg-green-500";
    if (budget > 20000) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Contract Manager</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        <FaPlus className="inline mr-2" />
        {showForm ? "Hide Form" : "Add New Contract"}
      </button>

      
  <>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo_contrato">
          Tipo de Contrato
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="tipo_contrato" 
          type="text" 
          placeholder="Tipo de Contrato" 
          name="tipo_contrato" 
          value={formData.tipo_contrato || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="objeto_contrato">
          Objeto del Contrato
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="objeto_contrato"
          rows="5"
          placeholder="Objeto del Contrato"
          name="objeto_contrato"
          value={formData.objeto_contrato || ''}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entidad">
          Entidad
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="entidad" 
          type="text" 
          placeholder="Entidad" 
          name="entidad" 
          value={formData.entidad || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccionEjecuta">
          Dirección de Ejecución
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="direccionEjecuta" 
          type="text" 
          placeholder="Dirección de Ejecución" 
          name="direccionEjecuta" 
          value={formData.direccionEjecuta || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aprovadorCC">
    Aprobador por el CC
  </label>
  <DatePicker
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="aprovadorCC"
    dateFormat="DD/MM/YYYY"
    placeholderText="Aprobador por el CC"
    selected={formData.aprovadorCC ? new Date(formData.aprovadorCC) : null}
    onChange={(date) => handleDateChange(date, 'aprovadorCC')}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firmado">
    Fecha Firmada
  </label>
  <DatePicker
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="firmado"
    dateFormat="DD/MM/YYYY"
    placeholderText="Fecha Firmada"
    selected={formData.firmado ? new Date(formData.firmado) : null}
    onChange={(date) => handleDateChange(date, 'firmado')}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entregadoJuridica">
    Fecha Entregado Jurídica
  </label>
  <DatePicker
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="entregadoJuridica"
    dateFormat="DD/MM/YYYY"
    placeholderText="Fecha Entregado Jurídica"
    selected={formData.entregadoJuridica ? new Date(formData.entregadoJuridica) : null}
    onChange={(date) => handleDateChange(date, 'entregadoJuridica')}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaRecibido">
    Fecha Recibido
  </label>
  <DatePicker
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="fechaRecibido"
    dateFormat="DD/MM/YYYY"
    placeholderText="Fecha Recibido"
    selected={formData.fechaRecibido ? new Date(formData.fechaRecibido) : null}
    onChange={(date) => handleDateChange(date, 'fechaRecibido')}
  />
</div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
          Valor
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="valor" 
          type="number" 
          placeholder="Valor" 
          name="valor" 
          value={formData.valor || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vigencia">
          Vigencia
        </label>
        <div className="relative">
          <select 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vigencia"
            name="vigencia"
            value={formData.vigencia || ''}
            onChange={handleInputChange}
          >
            <option value="">Seleccione...</option>
            <option value="mes">Mes</option>
            <option value="ano">Año</option>
            <option value="dia">Día</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>


<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
    Estado
  </label>
  <select 
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="estado" 
    name="estado" 
    value={formData.estado || ''}
    onChange={handleInputChange}
  >
    <option value="">Seleccione...</option>
    {/* Agregar opciones de estado aquí */}
  </select>
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroDictamen">
    Número de Dictamen
  </label>
  <input 
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="numeroDictamen" 
    type="text" 
    placeholder="Núm. de Dictamen" 
    name="numeroDictamen" 
    value={formData.numeroDictamen || ''}
    onChange={handleInputChange}
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subirPDF">
    Subir PDF
  </label>
  <input 
    type="file"
    accept=".pdf"
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="subirPDF" 
    name="subirPDF" 
    onChange={(e) => handleFileChange(e)}
  />
</div>

<ConfirmationModal 
isOpen={showConfirmationModal} 
onClose={() =>  hideModalForConfirmation()} 
onConfirm={() => {hideModalForConfirmation()
  handleSubmit(e);
  ; // Llama a este método después de que se ejecute handleSubmit
}}

title="¿Estás seguro de querer continuar?" 
message="Esta acción no se puede deshacer. ¿Deseas continuar?" 
/>
</form>
<div className="flex items-center justify-between">
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  onClick={showModalForConfirmation} 
  >
  
    {formData.id ? "Actualizar Contrato" : "Agregar Contrato"}
  </button>
</div>

</>





      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Filter Contracts</h2>
        <div className="flex flex-wrap -mx-2">
          <div className="px-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Contractor"
              name="contractor"
              onChange={handleFilter}
            />
          </div>
          <div className="px-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Client"
              name="client"
              onChange={handleFilter}
            />
          </div>
          <div className="px-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Affiliate"
              name="affiliate"
              onChange={handleFilter}
            />
          </div>
          <div className="px-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Category"
              name="category"
              onChange={handleFilter}
            />
          </div>
          <div className="px-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Min Budget"
              name="budget"
              onChange={handleFilter}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Contractor
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract) => (
              <tr key={contract.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {contract.title}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {contract.contractor}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {contract.client}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {contract.category}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {contract.startDate.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {contract.endDate.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">${contract.budget.toLocaleString()}</span>
                    <div className={`w-4 h-4 rounded-full ${getBudgetStatus(contract.budget)}`}></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => handleEdit(contract)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(contract.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContractManager;
