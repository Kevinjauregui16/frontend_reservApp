import {
  HiOutlineBuildingStorefront,
  HiOutlineUserGroup,
  HiOutlineClipboard,
  HiOutlineCalendarDays,
  HiOutlineXCircle,
} from "react-icons/hi2";

export function getStatsSuperAdmin({
  stores_count,
  clients_count,
  users_count,
  plans_count,
}) {
  return [
    {
      label: "Tiendas registradas",
      value: stores_count,
      icon: <HiOutlineBuildingStorefront className="w-8 h-8 text-blue-500" />,
      textClass: "text-blue-500",
    },
    {
      label: "Clientes registrados",
      value: clients_count,
      icon: <HiOutlineUserGroup className="w-8 h-8 text-yellow-500" />,
      textClass: "text-yellow-500",
    },
    {
      label: "Usuarios registrados",
      value: users_count,
      icon: <HiOutlineUserGroup className="w-8 h-8 text-green-500" />,
      textClass: "text-green-500",
    },
    {
      label: "Planes",
      value: plans_count,
      icon: <HiOutlineCalendarDays className="w-8 h-8 text-pink-500" />,
      textClass: "text-pink-500",
    },
    {
      label: "Inactivas",
      value: 2,
      icon: <HiOutlineXCircle className="w-8 h-8 text-red-500" />,
      textClass: "text-red-500",
    },
    {
      label: "Reservaciones",
      value: 9,
      icon: <HiOutlineClipboard className="w-8 h-8 text-purple-500" />,
      textClass: "text-purple-500",
    },
  ];
}
