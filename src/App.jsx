import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import SignIn from "../src/pages/SignIn";
import SignUp from "../src/pages/SignUp";
import ResetPassword from "../src/pages/ResetPassword"

import AuthLayout from "../src/layouts/AuthLayout";
/*import Autenticar from "./paginas/Autenticar";
import Registrarse from "./paginas/Registrarse";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvideContraseña";
import NuevoPassword from "./paginas/NuevoPassword";*/
import FormularioContrato from "./components/formularioContrato";
import { AuthProvider } from "./context/AuthProvider";
import RutaProtegida from "./layouts/RutaProtegida";
function App() {/* <Route path="autenticar" element={<Autenticar />} />
  <Route path="registrarse" element={<Registrarse />} />
  <Route path="olvide-mi-password" element={<OlvidePassword />} />
  <Route path="confirmar/" element={<ConfirmarCuenta />} />*/
  return (
    <BrowserRouter>
      <AuthProvider>
      
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/principal/" element={<AuthLayout />}>
                  <Route path="/principal/signin" element={<SignIn />} />
                  <Route path="/principal/signup" element={<SignUp />} />
                  <Route path="/principal/reset-password" element={<ResetPassword />} />
                  <Route path="/principal/admin" element={<FormularioContrato/>}/>
                   
                  </Route>

                  <Route path="/usuario" element={<RutaProtegida />}>
              
                  </Route>

                </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
