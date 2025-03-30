import { ShoppingBag } from "lucide-react";
import { BellDot } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { MapPin } from "lucide-react";

export const Menus = [
  {
    name: "Dashboard",
    gridCols: 2,
    link: "/dashboard",
    onClick: (navigate) => navigate && navigate("/dashboard"), // Ensure navigate is defined
  },
  {
    name: "Procurement",
    subMenu: [
      {
        name: "ใบคำสั่งซื้อ",
        desc: "Browse templates",
        icon: ShoppingBag,
        link: "/procurement/orders",
        onClick: (navigate) => navigate && navigate("/procurement/orders"), // Ensure navigate is defined
      },
      {
        name: "การชำระเงิน & บัญชี",
        desc: "Upcoming events",
        icon: MapPin,
        link: "/procurement/payments",
        onClick: (navigate) => navigate && navigate("/procurement/payments"), // Ensure navigate is defined
      },
      {
        name: "คลังสินค้า",
        desc: "Changelog",
        icon: BellDot,
        link: "/procurement/warehouse",
        onClick: (navigate) => navigate && navigate("/procurement/warehouse"), // Ensure navigate is defined
      }
    ],
    gridCols: 1,
  },
  {
    name: "User Management",
    subMenu: [
      {
        name: "จัดการบัญชีผู้ใช้",
        desc: "Center",
        icon: CircleHelp,
        link: "/user-management/accounts",
        onClick: (navigate) => navigate && navigate("/user-management/accounts"), // Ensure navigate is defined
      },
      {
        name: "กำหนดสิทธิ์การเข้าถึงและบทบาท",
        desc: "Project help",
        icon: MessageCircle,
        link: "/user-management/roles",
        onClick: (navigate) => navigate && navigate("/user-management/roles"), // Ensure navigate is defined
      },
      {
        name: "Audit & Monitoring",
        desc: "Urgent issues",
        icon: TriangleAlert,
        link: "/user-management/audit",
        onClick: (navigate) => navigate && navigate("/user-management/audit"), // Ensure navigate is defined
      },
      {
        name: "Security & Access",
        desc: "Urgent issues",
        icon: TriangleAlert,
        link: "/user-management/security",
        onClick: (navigate) => navigate && navigate("/user-management/security"), // Ensure navigate is defined
      },
    ],
    gridCols: 1,
  },
];