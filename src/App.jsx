import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Configuracion from "./pages/configuracion";
import Home from "./pages/home";
import UsuariosPage from "./pages/Usuarios";
import UsuarioDetalle from "./pages/UsuariosDetalle";

function App() {
  return (
    <div>
      <nav className="app-nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/usuarios" className="nav-link">
          Usuarios
        </Link>
        <Link to="/configuracion" className="nav-link">
          Configuracion
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/usuarios/:id" element={<UsuarioDetalle />} />
      </Routes>
    </div>
  );
}

export default App;
