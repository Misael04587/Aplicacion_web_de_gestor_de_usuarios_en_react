import { useEffect, useState } from "react";
import Buscador from "../components/Buscador";
import ListaUsuarios from "../components/ListaUsuarios";
import {
  actualizarUsuario,
  crearUsuario,
  eliminarusuario,
  obtenerusuarios,
} from "../services/api";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nuevoUsuario, setNuevoUsuario] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosData = await obtenerusuarios();
        setUsuarios(usuariosData);
        setError(null);
      } catch (fetchError) {
        setError(fetchError.message);
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

      setUsuarios((usuariosActuales) => [
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
    } catch (createError) {
      setError(createError.message);
    }
  };

  const editarUsuario = async (
    id,
    nuevoNombre,
    nuevoEmail,
    nuevoPhone,
    nuevoCity
  ) => {
    const nombreActualizado = (nuevoNombre ?? "").trim();
    const emailActualizado = (nuevoEmail ?? "").trim();
    const phoneActualizado = (nuevoPhone ?? "").trim();
    const cityActualizado = (nuevoCity ?? "").trim();

    if (
      !nombreActualizado ||
      !emailActualizado ||
      !phoneActualizado ||
      !cityActualizado
    ) {
      return false;
    }

    try {
      const usuarioActualizado = await actualizarUsuario(id, {
        name: nombreActualizado,
        email: emailActualizado,
        phone: phoneActualizado,
        address: { city: cityActualizado },
      });

      setUsuarios((usuariosActuales) =>
        usuariosActuales.map((user) =>
          user.id === id
            ? {
                ...user,
                name: usuarioActualizado.name,
                email: usuarioActualizado.email,
                phone: usuarioActualizado.phone,
                address: usuarioActualizado.address,
              }
            : user
        )
      );

      setError(null);
      return true;
    } catch (updateError) {
      setError(updateError.message);
      return false;
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await eliminarusuario(id);

      setUsuarios((usuariosActuales) =>
        usuariosActuales.filter((user) => user.id !== id)
      );
      setError(null);
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const usuariosFiltrados = usuarios.filter((user) =>
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

      {error ? <p className="alert-banner">{error}</p> : null}

      <section className="toolbar">
        <div className="toolbar-group">
          <label className="control-field">
            <span className="control-label">Nuevo usuario</span>
            <input
              className="control-input"
              type="text"
              placeholder="Escribe un nombre"
              value={nuevoUsuario}
              onChange={(event) => setNuevoUsuario(event.target.value)}
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

export default UsuariosPage;
