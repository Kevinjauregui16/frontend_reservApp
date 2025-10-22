import { useState } from "react";

export default function TitlePage({
  title,
  onSearch,
  onCreateNew,
  searchPlaceholder = "Buscar...",
  createButtonText = "Agregar nuevo",
  showSearch = true,
  showCreate = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Debounce opcional para no hacer muchas peticiones
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleCreateClick = () => {
    if (onCreateNew) {
      onCreateNew();
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Título */}
        <h2 className="text-5xl text-primary font-semibold">{title}</h2>

        {/* Controles */}
        <div className="flex gap-3">
          {/* Barra de búsqueda */}
          {showSearch && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              className="px-3 py-2 border border-gray-100 rounded-lg"
            />
          )}

          {/* Botón crear */}
          {showCreate && (
            <button
              onClick={handleCreateClick}
              className="text-white bg-gradient-to-r from-secondary to-primary px-3 py-1 rounded-xl hover:scale-105 transition-all duration-300"
            >
              + {createButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
