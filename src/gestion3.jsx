import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus  } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContractManager = () => {
  const [monto1, setMonto1] = useState("");
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

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing contract
      setContracts(
        contracts.map((contract) =>
          contract.id === formData.id ? { ...formData } : contract
        )
      );
      toast.success("Contract updated successfully!");
    } else {
      // Add new contract
      const newContract = { ...formData, id: Date.now() };
      setContracts([...contracts, newContract]);
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
    setShowForm(false);
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

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Contract Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractor">
              Contractor
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contractor"
              type="text"
              placeholder="Contractor"
              name="contractor"
              value={formData.contractor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
              Client
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="client"
              type="text"
              placeholder="Client"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="affiliate">
              Affiliate
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="affiliate"
              type="text"
              placeholder="Affiliate"
              name="affiliate"
              value={formData.affiliate}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
              Budget
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="budget"
              type="number"
              placeholder="Budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {formData.id ? "Update Contract" : "Add Contract"}
            </button>
          </div>
        </form>
      )}

      <div className="mb-4">
      <div className="mb-4">
                    
                    <label
                      htmlFor="monto"
                      className="block text-gray-700 text-sm font-semibold mb-1"
                    >
                      Monto
                    </label>
                    <input
                      type="text"
                      placeholder="Monto"
                      value={monto1}
                      onChange={(e) => setMonto1(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
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
