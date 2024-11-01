import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaFilter, FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContractManagement = () => {
  const [contracts, setContracts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    contractor: "",
    client: "",
    startDate: "",
    endDate: "",
    budget: "",
    category: "",
  });
  const [totalBudget, setTotalBudget] = useState(1000000);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [suggestions, setSuggestions] = useState({ contractors: [], clients: [] });

  useEffect(() => {
    // Simulating fetching data from an API
    const fetchContracts = () => {
      const dummyContracts = [
        {
          id: 1,
          title: "Website Redesign",
          contractor: "Tech Solutions Inc.",
          client: "ABC Corp",
          startDate: "2023-06-01",
          endDate: "2023-12-31",
          budget: 50000,
          category: "IT",
        },
        {
          id: 2,
          title: "Marketing Campaign",
          contractor: "Creative Minds Agency",
          client: "XYZ Ltd",
          startDate: "2023-07-15",
          endDate: "2023-10-15",
          budget: 30000,
          category: "Marketing",
        },
      ];
      setContracts(dummyContracts);
    };

    fetchContracts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "contractor" || name === "client") {
      // Simulating autocomplete suggestions
      const dummySuggestions = [
        "Tech Solutions Inc.",
        "Creative Minds Agency",
        "ABC Corp",
        "XYZ Ltd",
      ];
      setSuggestions({
        ...suggestions,
        [name + "s"]: dummySuggestions.filter((s) =>
          s.toLowerCase().includes(value.toLowerCase())
        ),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newContract = {
        ...formData,
        id: contracts.length + 1,
        budget: parseFloat(formData.budget),
      };
      setContracts([...contracts, newContract]);
      setFormData({
        title: "",
        contractor: "",
        client: "",
        startDate: "",
        endDate: "",
        budget: "",
        category: "",
      });
      toast.success("Contract created successfully!");
    }
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === "") {
        toast.error(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
        return false;
      }
    }
    if (isNaN(parseFloat(formData.budget))) {
      toast.error("Budget must be a valid number");
      return false;
    }
    return true;
  };

  const handleDelete = (id) => {
    setContracts(contracts.filter((contract) => contract.id !== id));
    toast.info("Contract deleted");
  };

  const handleEdit = (contract) => {
    setFormData(contract);
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const filteredContracts = contracts.filter((contract) => {
    return Object.keys(filterCriteria).every((key) => {
      if (!filterCriteria[key]) return true;
      return contract[key].toLowerCase().includes(filterCriteria[key].toLowerCase());
    });
  });

  const calculateRemainingBudget = () => {
    const usedBudget = contracts.reduce((sum, contract) => sum + contract.budget, 0);
    return totalBudget - usedBudget;
  };

  const handleBudgetChange = (e) => {
    setTotalBudget(parseFloat(e.target.value));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Contract Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create/Modify Contract</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="contractor" className="block text-sm font-medium text-gray-700">Contractor</label>
              <input
                type="text"
                id="contractor"
                name="contractor"
                value={formData.contractor}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
                list="contractorSuggestions"
              />
              <datalist id="contractorSuggestions">
                {suggestions.contractors.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            </div>
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
                list="clientSuggestions"
              />
              <datalist id="clientSuggestions">
                {suggestions.clients.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              {formData.id ? "Update Contract" : "Create Contract"}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Budget Management</h2>
          <div className="mb-4">
            <label htmlFor="totalBudget" className="block text-sm font-medium text-gray-700">Total Budget</label>
            <input
              type="number"
              id="totalBudget"
              value={totalBudget}
              onChange={handleBudgetChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Remaining Budget</h3>
            <p className="text-2xl font-bold text-green-600">${calculateRemainingBudget().toFixed(2)}</p>
          </div>
          {calculateRemainingBudget() < 100000 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              <p className="font-bold">Warning</p>
              <p>The remaining budget is low. Consider increasing the total budget or reducing contract expenses.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Contracts</h2>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="contractor"
            placeholder="Filter by Contractor"
            onChange={handleFilter}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <input
            type="text"
            name="client"
            placeholder="Filter by Client"
            onChange={handleFilter}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <input
            type="text"
            name="category"
            placeholder="Filter by Category"
            onChange={handleFilter}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <button
            onClick={() => setFilterCriteria({})}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
          >
            Clear Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contractor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                <tr key={contract.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{contract.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contract.contractor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contract.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contract.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contract.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${contract.budget.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contract.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(contract)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
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
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ContractManagement;
