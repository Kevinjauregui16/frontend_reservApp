import {
  HiOutlineBuildingStorefront,
  HiOutlineUserGroup,
  HiOutlineClipboard,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

export const superAdminActions = [
  {
    icon: () => <HiOutlineBuildingStorefront className="w-8 h-8" />,
    text: "Crear Tienda",
    color: "blue",
    bgClass: "bg-blue-100 hover:bg-blue-200",
    textClass: "text-blue-700",
    borderClass: "border-blue-300",
    action: () => setIsStoreModalOpen(true),
  },
  {
    icon: () => <HiOutlineUserGroup className="w-8 h-8" />,
    text: "Registrar Cliente",
    color: "green",
    bgClass: "bg-green-100 hover:bg-green-200",
    textClass: "text-green-700",
    borderClass: "border-green-300",
    action: () => setIsClientModalOpen(true),
  },
  {
    icon: () => <HiOutlineClipboard className="w-8 h-8" />,
    text: "Nueva Categoría",
    color: "yellow",
    bgClass: "bg-yellow-100 hover:bg-yellow-200",
    textClass: "text-yellow-700",
    borderClass: "border-yellow-300",
    action: () => setIsCategoryModalOpen(true),
  },
  {
    icon: () => <HiOutlineCurrencyDollar className="w-8 h-8" />,
    text: "Nuevo Plan",
    color: "purple",
    bgClass: "bg-purple-100 hover:bg-purple-200",
    textClass: "text-purple-700",
    borderClass: "border-purple-300",
    action: () => setIsPlanModalOpen(true),
  },
];
