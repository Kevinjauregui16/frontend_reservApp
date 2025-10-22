export const store_columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "neighborhood",
    header: "Dirección",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "is_active",
    header: "Estado",
    cell: ({ getValue }) => {
      const value = getValue();
      const isActive = value === 1;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Fecha de registro",
    cell: ({ getValue }) => {
      const value = getValue();
      const date = new Date(value);
      return date.toLocaleDateString("es-ES");
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200">
          Editar
        </button>
        <button className="px-3 py-1 bg-red-100 text-red-700 rounded-xl hover:bg-red-200">
          Eliminar
        </button>
      </div>
    ),
  },
];
