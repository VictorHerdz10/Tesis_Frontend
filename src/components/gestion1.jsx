import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaBell, FaExclamationTriangle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

const ContractManagement = () => {
  const [contracts, setContracts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    contractor: "",
    client: "",
    category: "",
    budget: "",
  });
  const [budget, setBudget] = useState(0);
  const [filter, setFilter] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulating fetching contracts from an API
    const fetchedContracts = [
      { id: 1, title: "Web Development", contractor: "John Doe", client: "ABC Corp", category: "IT", budget: 10000, startDate: "2023-06-01", endDate: "2023-12-31" },
      { id: 2, title: "Marketing Campaign", contractor: "Jane Smith", client: "XYZ Inc", category: "Marketing", budget: 5000, startDate: "2023-07-01", endDate: "2023-09-30" },
    ];
    setContracts(fetchedContracts);

    // Check for notifications
    checkNotifications(fetchedContracts);
  }, []);

  const checkNotifications = (contracts) => {
    const today = new Date();
    const newNotifications = contracts.filter(contract => {
      const endDate = new Date(contract.endDate);
      const daysUntilExpiration = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
    }).map(contract => ({
      id: contract.id,
      message: `Contract "${contract.title}" expires in ${Math.ceil((new Date(contract.endDate) - today) / (1000 * 60 * 60 * 24))} days`,
    }));

    setNotifications(newNotifications);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContract = { ...formData, id: contracts.length + 1 };
    setContracts([...contracts, newContract]);
    setFormData({ title: "", startDate: "", endDate: "", contractor: "", client: "", category: "", budget: "" });
    checkNotifications([...contracts, newContract]);
  };

  const handleDelete = (id) => {
    const updatedContracts = contracts.filter(contract => contract.id !== id);
    setContracts(updatedContracts);
    checkNotifications(updatedContracts);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredContracts = contracts.filter(contract => {
    return Object.entries(filter).every(([key, value]) => {
      if (!value) return true;
      return contract[key].toLowerCase().includes(value.toLowerCase());
    });
  });

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Contract Management</h1>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <FaBell className="mr-2 text-yellow-500" /> Notifications
          </h2>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="text-sm text-gray-700">{notification.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Contract Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Contract Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              aria-label="Contract Title"
            />
          </div>
          <div className="w-full md:w-1/4 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
              aria-label="Start Date"
            />
          </div>
          <div className="w-full md:w-1/4 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
              aria-label="End Date"
            />
          </div>
        </div>
        <div className="mb-4 flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractor">
              Contractor
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contractor"
              type="text"
              name="contractor"
              value={formData.contractor}
              onChange={handleInputChange}
              required
              aria-label="Contractor"
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
              Client
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="client"
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              required
              aria-label="Client"
            />
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              aria-label="Category"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">
            Budget
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="budget"
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            required
            aria-label="Budget"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center transition duration-300 ease-in-out transform hover:scale-105"
            type="submit"
          >
            <IoMdAddCircle className="mr-2" />
            Add Contract
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="contractor"
              placeholder="Filter by Contractor"
              onChange={handleFilterChange}
              aria-label="Filter by Contractor"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="client"
              placeholder="Filter by Client"
              onChange={handleFilterChange}
              aria-label="Filter by Client"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="category"
              placeholder="Filter by Category"
              onChange={handleFilterChange}
              aria-label="Filter by Category"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              name="budget"
              placeholder="Filter by Budget"
              onChange={handleFilterChange}
              aria-label="Filter by Budget"
            />
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Existing Contracts</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Title</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Contractor</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Client</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Category</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Budget</th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-4 px-6 border-b border-grey-light">{contract.title}</td>
                <td className="py-4 px-6 border-b border-grey-light">{contract.contractor}</td>
                <td className="py-4 px-6 border-b border-grey-light">{contract.client}</td>
                <td className="py-4 px-6 border-b border-grey-light">{contract.category}</td>
                <td className="py-4 px-6 border-b border-grey-light">${contract.budget}</td>
                <td className="py-4 px-6 border-b border-grey-light">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700" aria-label="View contract">
                      <FaEye />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700" aria-label="Edit contract">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(contract.id)}
                      aria-label="Delete contract"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Budget Status */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Budget Status</h2>
        <div className="flex items-center justify-between">
          <p className="text-lg">Current Budget: ${budget}</p>
          <div className="flex items-center">
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              aria-label="Modify budget"
            />
            <button
              onClick={() => setBudget(budget)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              aria-label="Update budget"
            >
              Update
            </button>
          </div>
        </div>
        {budget < 1000 && (
          <div className="mt-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold flex items-center">
              <FaExclamationTriangle className="mr-2" /> Warning
            </p>
            <p>The current budget is critically low. Please consider increasing the budget.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractManagement;
