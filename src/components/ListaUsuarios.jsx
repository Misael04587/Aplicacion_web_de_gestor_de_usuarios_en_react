import Usuario from "./UsuarioCard";

function ListaUsuarios({ usuarios, editarUsuario, eliminarUsuario }) {
  if (!usuarios.length) {
    return (
      <div className="empty-state">
        <p className="panel-label">Sin resultados</p>
        <h3>No hay usuarios para mostrar.</h3>
        <p className="empty-copy">
          Cambia la busqueda o agrega un nuevo usuario.
        </p>
      </div>
    );
  }

  return (
    <div className="usuarios-grid">
      {usuarios.map((user) => (
        <Usuario
          key={`${user.id}-${user.name}-${user.email}-${user.phone}-${user.address?.city ?? ""}`}
          user={user}
          editarUsuario={editarUsuario}
          eliminarUsuario={eliminarUsuario}
        />
      ))}
    </div>
  );
}

export default ListaUsuarios;
