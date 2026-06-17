import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Usuario({ user, editarUsuario, eliminarUsuario }) {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(user.name ?? "");
  const [nuevoEmail, setNuevoEmail] = useState(user.email ?? "");
  const [nuevoPhone, setNuevoPhone] = useState(user.phone ?? "");
  const [nuevoCity, setNuevoCity] = useState(user.address?.city ?? "");

  const cancelarEdicion = () => {
    setNuevoNombre(user.name ?? "");
    setNuevoEmail(user.email ?? "");
    setNuevoPhone(user.phone ?? "");
    setNuevoCity(user.address?.city ?? "");
    setEditando(false);
  };

  const guardarCambios = async () => {
    const actualizado = await editarUsuario(
      user.id,
      nuevoNombre,
      nuevoEmail,
      nuevoPhone,
      nuevoCity
    );

    if (actualizado) {
      setEditando(false);
    }
  };

  const verDetalle = () => {
    navigate(`/usuarios/${user.id}`, { state: { user } });
  };

  return (
    <article className="user-card">
      <div className="user-card-header">
        

        <div className="user-card-heading">
          <p className="panel-label">ID: {user.id}</p>
          {editando ? (
            <input
              className="record-name-input"
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
          ) : (
            <h3 className="user-card-title">{user.name}</h3>
          )}
        </div>

        
      </div>

      {editando ? (
        <div className="field-grid">
          <label className="control-field">
            <span className="control-label">Correo</span>
            <input
              className="control-input"
              type="text"
              value={nuevoEmail}
              onChange={(e) => setNuevoEmail(e.target.value)}
            />
          </label>

          <label className="control-field">
            <span className="control-label">Telefono</span>
            <input
              className="control-input"
              type="text"
              value={nuevoPhone}
              onChange={(e) => setNuevoPhone(e.target.value)}
            />
          </label>

          <label className="control-field">
            <span className="control-label">Ciudad</span>
            <input
              className="control-input"
              type="text"
              value={nuevoCity}
              onChange={(e) => setNuevoCity(e.target.value)}
            />
          </label>
        </div>
      ) : (
        <div className="user-meta">
          <div className="meta-row">
            <span className="meta-label">Email</span>
            <span className="meta-value">{user.email}</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Telefono</span>
            <span className="meta-value">{user.phone}</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Ciudad</span>
            <span className="meta-value">{user.address?.city}</span>
          </div>
        </div>
      )}

      <div className="user-card-footer">
        {editando ? (
          <>
            <button
              className="action-button action-button-primary"
              type="button"
              onClick={guardarCambios}
            >
              Guardar cambios
            </button>

            <button
              className="action-button action-button-secondary"
              type="button"
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="action-button action-button-primary"
              type="button"
              onClick={verDetalle}
            >
              Ver detalle
            </button>

            <button
              className="action-button action-button-secondary"
              type="button"
              onClick={() => setEditando(true)}
            >
              Editar
            </button>

            <button
              className="action-button action-button-danger"
              type="button"
              onClick={() => eliminarUsuario(user.id)}
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export default Usuario;
