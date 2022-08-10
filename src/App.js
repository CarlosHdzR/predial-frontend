import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./Styles.css";
import { useAuthContext } from "./context/AuthContext";
import { Container, Footer, Navbar, Sidebar } from "./components/structure";
import { systemOutRoutes, adminRoutes, userExtRoutes } from "./routes";
import { Error404 } from "./pages";
import { BackToTop } from "./components/minors";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [hideMenu, setHideMenu] = useState(false); // Toggle-Sidebar
  const { payload, auth } = useAuthContext();
  const rol = payload?.rol
  const path = (rol === 1 || rol === 2) ? "/admin/dashboard" : "/user-ext/home";

  return (
    <>
      <main className={hideMenu ? "toggle-sidebar" : ""}>
        <Navbar
          hideMenu={hideMenu}
          setHideMenu={setHideMenu}
        />
        <Sidebar />
        <Container>
          <Routes>
            {systemOutRoutes.map((item, index) => (
              <Route
                key={index}
                exact path={item.path}
                element={!auth ? item.element : <Navigate to={path} />} />
            ))}
            {adminRoutes.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={auth && (rol === 1 || rol === 2) ? item.element : <Navigate to="/login" />} />
            ))}
            {userExtRoutes.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={auth && rol === 3 ? item.element : <Navigate to="/login" />} />
            ))}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Container>
        <Footer />
      </main>
      <BackToTop />
      <ToastContainer position="top-center" newestOnTop transition={Flip} />
    </>
  );
}

export default App;
