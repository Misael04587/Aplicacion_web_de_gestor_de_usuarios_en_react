import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { obtenerusuarios } from "../services/api";

function UsuarioDetalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const usuarioNavegado = location.state?.user;

  const [usuario, setUsuario] = useState(usuarioNavegado ?? null);
  const [loading, setLoading] = useState(!usuarioNavegado);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (usuarioNavegado) {
      setUsuario(usuarioNavegado);
      setLoading(false);
      setError(null);
      return;
    }

    const cargarUsuario = async () => {
      try {
        const usuarios = await obtenerusuarios();
        const usuarioEncontrado = usuarios.find(
          (user) => String(user.id) === String(id)
        );

        if (!usuarioEncontrado) {
          setError("Usuario no encontrado");
          return;
        }

        setUsuario(usuarioEncontrado);
        setError(null);
      } catch (detalleError) {
        setError(detalleError.message);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuario();
  }, [id, usuarioNavegado]);

  if (loading) {
    return (
      <main className="loading-screen">
        <section className="loading-panel">
          <h1>Detalle Usuario</h1>
          <p className="loading-copy">Cargando usuario...</p>
        </section>
      </main>
    );
  }

  if (error || !usuario) {
    return (
      <main className="app-shell">
        <section className="loading-panel">
          <h1>Detalle Usuario</h1>
          <p className="alert-banner">{error ?? "Usuario no encontrado"}</p>
          <button
            className="action-button action-button-secondary"
            type="button"
            onClick={() => navigate("/usuarios")}
          >
            Volver a usuarios
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="loading-panel">
        <p className="panel-label">ID: {usuario.id}</p>
        <h1>Detalle Usuario</h1>

        <div className="user-meta">
          <div className="meta-row">
            <span className="meta-label">Nombre</span>
            <span className="meta-value">{usuario.name}</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Correo</span>
            <span className="meta-value">{usuario.email}</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Telefono</span>
            <span className="meta-value">{usuario.phone}</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Ciudad</span>
            <span className="meta-value">{usuario.address?.city}</span>
          </div>
        </div>

        <button
          className="action-button action-button-secondary"
          type="button"
          onClick={() => navigate("/usuarios")}
        >
          Volver a usuarios
        </button>
      </section>
    </main>
  );

}

export default UsuarioDetalle;
