import React, { useState, useRef } from "react";
import {
  FiEdit2,
  FiCamera,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiUser,
  FiMail,
  FiBriefcase,
  FiPhone,
  FiShield,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useValidation from "../hooks/useValidation";
import clienteAxios from "../axios/axios";
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { perfil, obtenerPerfil, validarInput } = useValidation();
  const formData = new FormData();
  const [errorName, setErrorName] = useState("");
  const [errorCargo, setErrorCargo] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorPasswordActual, setErrorPasswordActual] = useState("");
  const [errorPasswordNew, setErrorPasswordNew] = useState("");
  const [errorConfirmPAss, setErrorConfirmPAss] = useState("");
  let rolname;
  if (perfil.tipo_usuario === "Admin_Gnl") {
    rolname = "Administrador del sistema";
  }
  if (perfil.tipo_usuario === "director") {
    rolname = "Director";
  }
  if (perfil.tipo_usuario === "especialista") {
    rolname = "Especialista";
  }
  if (perfil.tipo_usuario === "visitante") {
    rolname = "Visitante";
  }
  const [valorInicial, setValorInicia] = useState({
    nombre: perfil.nombre,
    cargo: perfil.cargo,
    telefono: perfil.telefono,
  });
  const [userDetails, setUserDetails] = useState({
    name: perfil.nombre,
    email: perfil.email,
    position: perfil.cargo,
    phone: perfil.telefono,
    role: rolname,
    profilePicture: perfil.foto_perfil,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!navigator.onLine) {
        toast.error(
          "No hay conexión a internet. No se puede actualizar la imagen de perfil.",
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
        setIsLoading(false);
        return;
      }
    if(passwords.newPassword!=='' || passwords.confirmPassword!==''){
        if(passwords.currentPassword===''){
        setIsLoading(false);
        toast.info('Por favor introdusca su contraseña actual')
        return;
        }
    }

    if( valorInicial.nombre !== userDetails.name &&
        valorInicial.cargo !== userDetails.position &&
        valorInicial.telefono !== userDetails.phone &&
        passwords.currentPassword===''
    ){

    }
    const errores = validarInput(userDetails.name, "text", "");
    const errores1 = validarInput(userDetails.position, "text", "");
    const errores2 = validarInput(userDetails.phone, "text", "");
    setErrorName(errores || "");
    setErrorCargo(errores1 || "");
    setErrorTelefono(errores2 || "");
    if (errores || errores1 || errores2) {
      setIsLoading(false);
      return;
    }
    if (passwords.currentPassword !== "") {
      const errores4 = validarInput(passwords.newPassword, "password", "");
      const errores5 = validarInput(
        passwords.confirmPassword,
        "repetirPassword",
        passwords.newPassword
      );
      setErrorPasswordNew(errores4 || "");
      setErrorConfirmPAss(errores5 || "");

      if (errores4 || errores5) {
        setIsLoading(false);
        return;
      }
    }

    // Agregar los valores al FormData
    formData.append("nombre", userDetails.name);
    formData.append("cargo", userDetails.position);
    formData.append("telefono", userDetails.phone);
    if (imageFile) {
      formData.append("foto_perfil", imageFile);
    }
    if (passwords.currentPassword === '') {
        // Si la contraseña actual está vacía, solo actualizar el perfil si hay cambios
        if (
          perfil.nombre !== userDetails.name ||
          perfil.cargo !== userDetails.position ||
          perfil.telefono !== userDetails.phone ||
          imageFile!==null
        ) {
          
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const url = `usuario/actualizar-perfil`;
            const response = await clienteAxios.put(url, formData, config);
            toast.success(response.data.msg);
          } catch (error) {
            toast.error(error.response.data.msg);
          }
        }
      } else {
        // Si la contraseña actual no está vacía, realizar todas las acciones
        // Actualizar el perfil si hay cambios
        if (
          perfil.nombre !== userDetails.name ||
          perfil.cargo !== userDetails.position ||
          perfil.telefono !== userDetails.phone ||
          imageFile!==null
        ) {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          };
          try {
            const url = `usuario/actualizar-perfil`;
            const response = await clienteAxios.put(url, formData, config);
            toast.success(response.data.msg);
          } catch (error) {
            toast.error(error.response.data.msg);
          }
        }
    
        // Cambiar la contraseña
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const url = `usuario/cambiar-password`;
          const response = await clienteAxios.post(
            url,
            {
              password: passwords.currentPassword,
              newpassword: passwords.newPassword,
            },
            config
          );
          toast.success(response.data.msg);
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      }
    
     
      setTimeout(() => {
        setIsLoading(false);
        setImageFile(null);
        setPasswords({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        obtenerPerfil();
        setPreviewImage(null);
        setIsEditing(false);
      }, 1500);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (!isEditing) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center mb-8">
                <img
                  src={`${userDetails.profilePicture}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = "/src/images/default-avatar-profile-icon.jpg";
                  }}
                />
                <h1 className="text-2xl font-bold text-gray-900 mt-4">
                  {perfil.nombre}
                </h1>
                <p className="text-gray-600">{userDetails.position}</p>
                <div className="mt-2 flex items-center bg-blue-100 px-3 py-1 rounded-full">
                  <FiShield className="text-blue-600 w-4 h-4 mr-2" />
                  <span className="text-blue-600 text-sm font-medium">
                    {rolname}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <FiMail className="text-gray-400 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Dirección de correo electrónico
                    </p>
                    <p className="text-gray-900">{userDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <FiBriefcase className="text-gray-400 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Cargo que ocupa</p>
                    <p className="text-gray-900">
                      {" "}
                      {perfil.cargo ? (
                        <span className="ml-2"> ({userDetails.position})</span>
                      ) : (
                        <span className="ml-2 text-gray-600 italic">
                          Sin cargo asignado
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <FiPhone className="text-gray-400 w-6 h-6" />
                  <div>
                    <p className="text-sm text-gray-500">Número de teléfono</p>
                    <p className="text-gray-900">
                      {}{" "}
                      {perfil.telefono ? (
                        <span className="ml-2"> ({userDetails.phone})</span>
                      ) : (
                        <span className="ml-2 text-gray-600 italic">
                          Sin telefono asignado
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  <FiEdit2 className="mr-2" />
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Ajustes del Perfil
            </h1>

            <div className="mb-8 flex flex-col items-center">
              <div className="relative">
                <img
                  src={previewImage || `${userDetails.profilePicture}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = "/src/images/default-avatar-profile-icon.jpg";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
                  aria-label="Change profile picture"
                >
                  <FiCamera className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  aria-label="Upload profile picture"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Completo
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <FiEdit2 className="absolute right-3 top-3.5 text-gray-400" />
                  {errorName && (
                    <span className="text-red-500">{errorName}</span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección de correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cargo que ocupa
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={userDetails.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errorCargo && (
                  <span className="text-red-500">{errorCargo}</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Número de teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errorTelefono && (
                  <span className="text-red-500">{errorTelefono}</span>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rol en el sistema
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={userDetails.role}
                  className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                  disabled
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Cambiar la contraseña
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña actual
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorPasswordActual && (
                      <span className="text-red-500">
                        {errorPasswordActual}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-3.5 text-gray-400"
                      aria-label="Toggle password visibility"
                    >
                      {showPasswords.current ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nueva contraseña
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorPasswordNew && (
                      <span className="text-red-500">{errorPasswordNew}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-3.5 text-gray-400"
                      aria-label="Toggle password visibility"
                    >
                      {showPasswords.new ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirmar nueva contraseña
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errorConfirmPAss && (
                      <span className="text-red-500">{errorConfirmPAss}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-3.5 text-gray-400"
                      aria-label="Toggle password visibility"
                    >
                      {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Actualizando...
                  </>
                ) : (
                  "Guardar cambios"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setErrorName("");
                  setErrorCargo("");
                  setErrorTelefono("");
                  setErrorPasswordActual("");
                  setErrorPasswordNew("");
                  setErrorConfirmPAss("");
                  setPasswords({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                  })
                  setPreviewImage(null);
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
