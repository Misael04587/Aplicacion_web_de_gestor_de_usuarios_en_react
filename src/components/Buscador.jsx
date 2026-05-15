function Buscador({ searchTerm, setSearchTerm }) {
  return (
    <label className="control-field">
      <span className="control-label">Buscar usuario</span>
      <input
        className="control-input"
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </label>
  );
}

export default Buscador;
