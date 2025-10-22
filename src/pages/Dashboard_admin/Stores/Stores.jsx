import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import MainLayout from "../../../layout/MainLayout";

import { useListStoresQuery } from "../../../services/stores";
import Table from "../../../components/table";
import { store_columns } from "../../../contentSections/columns_table/store";
import TitlePage from "../../../components/titles";

export default function StoresTable() {
  const [sorting, setSorting] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch } = useListStoresQuery({ search: searchQuery });

  const stores = Array.isArray(data) ? data : [];

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  const handleCreateNew = () => {
    console.log("Crear nueva tienda - llamar endpoint");
  };

  const table = useReactTable({
    data: stores,
    columns: store_columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <MainLayout>
      <TitlePage
        title="Tiendas"
        onSearch={handleSearch}
        onCreateNew={handleCreateNew}
        createButtonText="Nueva tienda"
      />
      <div className="overflow-x-auto">
        {!isLoading && <Table data={table} />}
      </div>
    </MainLayout>
  );
}
