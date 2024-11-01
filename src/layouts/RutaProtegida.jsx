import { Outlet,Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
const{auth,cargando}= useAuth();


  if(cargando) return 'cargando...';
 
  return (
    <div>
      <>
        
       {auth?.id_usuario ? <Outlet/>:<Navigate to="/principal/autenticar"/>}
      
      </>
    </div>
  );
};

export default RutaProtegida;
