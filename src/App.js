import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Styles.css";
import { SystemOut, Admin, UserExt } from "./pages";
import { Error404 } from "./components/screens";
import { BackToTop, AutoScrollToTop } from "./components/minors";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const systemOutProps = [
  {
      path: "/",
      screen: "LandingPage"
  },
  {
      path: "/login",
      screen: "Login"
  },
  {
      path: "/register",
      screen: "Register"
  },
  {
      path: "/forgot-password",
      screen: "ForgotPassword"
  },
  {
      path: "/reset-password/:token",
      screen: "ResetPassword"
  },
]

const adminProps = [
  {
      path: "/admin/dashboard",
      screen: "Dashboard"
  },
  {
      path: "/admin/my-profile",
      screen: "Mi Perfil"
  },
  {
      path: "/admin/create-user",
      screen: "Crear Usuario"
  },
  {
      path: "/admin/manage-users",
      screen: "Gestionar Usuarios"
  },
  {
      path: "/admin/manage-users/edit/:nro_doc",
      screen: "Editar Usuario"
  },
  {
      path: "/admin/create-predio",
      screen: "Crear Predio"
  },
  {
      path: "/admin/manage-predios",
      screen: "Gestionar Predios"
  },
  {
      path: "/admin/manage-predios/edit/:codigo",
      screen: "Editar Predio"
  }
]

const userExtProps = [
  {
      path: "/user-ext/home",
      screen: "Home"
  },
  {
      path: "/user-ext/my-profile",
      screen: "Mi Perfil"
  },
  {
      path: "user-ext/asociar-predios",
      screen: "Asociar Predios"
  },
  {
      path: "/user-ext/pagar",
      screen: "Pagar Impuesto"
  },
]

function App() {
  return (
    <>
      <Router>
        <Routes>
          Fuera del Sistema
          {systemOutProps.map((item, index) => (
            <Route key={index} exact path={item.path} element={<SystemOut screen={item.screen} />} />
          ))}
          Administrador / Usuario Interno
          {adminProps.map((item, index) => (
            <Route key={index} path={item.path} element={<Admin screen={item.screen} />} />
          ))}
          Usuario Externo
          {userExtProps.map((item, index) => (
            <Route key={index} path={item.path} element={<UserExt screen={item.screen} />} />
          ))}
          <Route path="*" element={<Error404 />} />
        </Routes>
        <AutoScrollToTop />
      </Router>
      <BackToTop />
      <ToastContainer position="top-center" newestOnTop transition={Flip} />
    </>
  );
}

export default App;
