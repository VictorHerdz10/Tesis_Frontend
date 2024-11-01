import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye, FaPlus, FaFilter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import ConfirmationModal from "./confirmacionModal";

const ModalForm = ({ isOpen, onClose }) => {
    
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
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
    tipo_contrato: "",
    objeto_contrato: "",
    entidad: "",
    direccionEjecuta: "",
    aprovadorCC: "",
    firmado: "",
    entregadoJuridica: "",
    fechaRecibido: "",
    valor: "",
    vigencia: "",
    estado: "",
    numeroDictamen: "",
    subirPDF: ""
  });
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
        size: (file.size / 1024 / 1024).toFixed(2) + 'MB'
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
    console.log("primer clic")
    toast.success("Contract added successfully!");
  };

  return (
    <>
      <Dialog open={isOpen} handler={onClose} className="fixed inset-0 flex items-center justify-center">
        <DialogHeader className="bg-white shadow-md rounded-t px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold">Formulario de Contrato</h2>
        </DialogHeader>
        <DialogBody className="p-8 bg-gray-100 rounded-b-lg">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Título
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="title" 
                type="text" 
                placeholder="Título del contrato" 
                name="title" 
                value={formData.title || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractor">
                Contratista
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="contractor" 
                type="text" 
                placeholder="Contratista" 
                name="contractor" 
                value={formData.contractor || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
                Cliente
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="client" 
                type="text" 
                placeholder="Cliente" 
                name="client" 
                value={formData.client || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="affiliate">
                Afiliado
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="affiliate" 
                type="text" 
                placeholder="Afiliado" 
                name="affiliate" 
                value={formData.affiliate || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Categoría
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="category" 
                type="text" 
                placeholder="Categoría" 
                name="category" 
                value={formData.category || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                Fecha de inicio
              </label>
              <DatePicker
                className="w-full px-3 py-2 border rounded"
                id="startDate"
                dateFormat="DD/MM/YYYY"
                placeholderText="Fecha de inicio"
                selected={formData.startDate ? new Date(formData.startDate) : null}
                onChange={(date) => handleDateChange(date, 'startDate')}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                Fecha de fin
              </label>
              <DatePicker
                className="w-full px-3 py-2 border rounded"
                id="endDate"
                dateFormat="DD/MM/YYYY"
                placeholderText="Fecha de fin"
                selected={formData.endDate ? new Date(formData.endDate) : null}
                onChange={(date) => handleDateChange(date, 'endDate')}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
                Presupuesto
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="budget" 
                type="number" 
                placeholder="Presupuesto" 
                name="budget" 
                value={formData.budget || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipo_contrato">
                Tipo de Contrato
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
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
                className="w-full px-3 py-2 border rounded"
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
                className="w-full px-3 py-2 border rounded"
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
                Dirección Ejecutiva
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="direccionEjecuta" 
                type="text" 
                placeholder="Dirección Ejecutiva" 
                name="direccionEjecuta" 
                value={formData.direccionEjecuta || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aprovadorCC">
                Aprobador CC
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="aprovadorCC" 
                type="text" 
                placeholder="Aprobador CC" 
                name="aprovadorCC" 
                value={formData.aprovadorCC || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firmado">
                Firmado
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="firmado" 
                type="checkbox" 
                name="firmado" 
                checked={formData.firmado === 'true'}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="entregadoJuridica">
                Entregado Jurídica
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="entregadoJuridica" 
                type="checkbox" 
                name="entregadoJuridica" 
                checked={formData.entregadoJuridica === 'true'}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaRecibido">
                Fecha Recibido
              </label>
              <DatePicker
                className="w-full px-3 py-2 border rounded"
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
                className="w-full px-3 py-2 border rounded"
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
              <input 
                className="w-full px-3 py-2 border rounded"
                id="vigencia" 
                type="text" 
                placeholder="Vigencia" 
                name="vigencia" 
                value={formData.vigencia || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
                Estado
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="estado" 
                type="text" 
                placeholder="Estado" 
                name="estado" 
                value={formData.estado || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroDictamen">
                Número Dictamen
              </label>
              <input 
                className="w-full px-3 py-2 border rounded"
                id="numeroDictamen" 
                type="text" 
                placeholder="Número Dictamen" 
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
                className="w-full px-3 py-2 border rounded"
                id="subirPDF" 
                name="subirPDF" 
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <ConfirmationModal 
              isOpen={showConfirmationModal} 
              onClose={() => hideModalForConfirmation()} 
              onConfirm={(e) => {hideModalForConfirmation(); handleSubmit(e);}}
              title="¿Estás seguro de querer continuar?" 
              message="Esta acción no se puede deshacer. ¿Deseas continuar?" 
            />
            <div className="mt-4">
              <Button variant="gradient" fullWidth onClick={handleSubmit}>Enviar</Button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex items-center justify-between p-4 border-t border-gray-200">
          <Button variant="text" color="gray" onClick={onClose}>Cancelar</Button>
        </DialogFooter>
      </Dialog>
      <div className="fixed bottom-4 right-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={showModalForConfirmation} 
        >
          {formData.id ? "Actualizar Contrato" : "Agregar Contrato"}
        </button>
      </div>
    </>
  );
};

export default ModalForm;
