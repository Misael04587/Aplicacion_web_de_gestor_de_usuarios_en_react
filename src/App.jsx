import { useEffect, useState } from "react";
import "./App.css";
import Buscador from "./components/Buscador";
import ListaUsuarios from "./components/ListaUsuarios";
import { crearUsuario, obtenerusuarios, actualizarUsuario, eliminarusuario } from "./services/api";

function App() {
  const [usuario, setusuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nuevoUsuario, setNuevoUsuario] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await obtenerusuarios();
        setusuario(usuarios);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const agregarUsuario = async () => {
    const nombre = nuevoUsuario.trim();

    if (!nombre) {
      return;
    }

    try {
      const nuevoUsuarioData = await crearUsuario({ name: nombre });

      setusuario((usuariosActuales) => [
        ...usuariosActuales,
        {
          ...nuevoUsuarioData,
          email: nuevoUsuarioData.email ?? "No disponible",
          phone: nuevoUsuarioData.phone ?? "No disponible",
          address: nuevoUsuarioData.address ?? { city: "No disponible" },
        },
      ]);

      setNuevoUsuario("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const usuariosFiltrados = usuario.filter((user) =>
    (user.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <main className="loading-screen">
        <section className="loading-panel">
          <h1>Usuarios</h1>
          <p className="loading-copy">Cargando usuarios...</p>
        </section>
      </main>
    );
  }

  const editarUsuario = async (id, nuevoNombre, nuevoEmail, nuevoPhone, nuevoCity) => {
    const nombreActualizado = (nuevoNombre ?? "").trim();
    const emailActualizado = (nuevoEmail ?? "").trim();
    const phoneActualizado = (nuevoPhone ?? "").trim();
    const cityActualizado = (nuevoCity ?? "").trim();

    if (!nombreActualizado) {
      return false;
    }

    if (!emailActualizado) {
      return false;
    }

    if (!phoneActualizado) {
      return false;
    }

    if (!cityActualizado) {
      return false;
    }

    try {
      const usuarioActualizado = await actualizarUsuario(id, {
        name: nombreActualizado,
        email: emailActualizado,
        phone: phoneActualizado,
        address: { city: cityActualizado },
      });

      setusuario((usuariosActuales) =>
        usuariosActuales.map((user) =>
          user.id === id
            ? { ...user, name: usuarioActualizado.name, email: usuarioActualizado.email, phone: usuarioActualizado.phone, address: usuarioActualizado.address }
            : user
        )
      );

      setError(null);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await eliminarusuario(id);

      setusuario((usuariosActuales) =>
        usuariosActuales.filter((user) => user.id !== id)
      );
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <h1>Usuarios</h1>
          <p className="app-subtitle">
            Administra nombre, correo, telefono y ciudad con un estilo simple.
          </p>
        </div>
        <p className="results-copy">{usuariosFiltrados.length} usuarios visibles</p>
      </section>

      

      <section className="toolbar">
        <div className="toolbar-group">
          <label className="control-field">
            <span className="control-label">Nuevo usuario</span>
            <input
              className="control-input"
              type="text"
              placeholder="Escribe un nombre"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
            />
          </label>

          <button
            className="action-button action-button-primary"
            type="button"
            onClick={agregarUsuario}
          >
            Agregar
          </button>
        </div>

        <div className="toolbar-group">
          <Buscador searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </section>

      <section className="list-shell">
        <ListaUsuarios
          usuarios={usuariosFiltrados}
          editarUsuario={editarUsuario}
          eliminarUsuario={eliminarUsuario}
        />
      </section>
    </main>
  );
}

export default App
