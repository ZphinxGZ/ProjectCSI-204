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
        name: "ใบขอซื้อ ( PR )",
        desc: "lorem ipsum dolor sit amet",
        icon: ShoppingBag,
        link: "/procurement/orders",
        onClick: (navigate) => navigate && navigate("/procurement/orders"), // Ensure navigate is defined
      },
      {
        name: "ใบคำสั่งซื้อ ( PO )",
        desc: "lorem ipsum dolor sit amet",
        icon: ShoppingBag,
        link: "/procurement/orders",
        onClick: (navigate) => navigate && navigate("/procurement/orders"), // Ensure navigate is defined
      },
      {
        name: "การชำระเงิน & บัญชี",
        desc: "lorem ipsum dolor sit amet",
        icon: MapPin,
        link: "/procurement/payments",
        onClick: (navigate) => navigate && navigate("/procurement/payments"), // Ensure navigate is defined
      },
      {
        name: "คลังสินค้า",
        desc: "lorem ipsum dolor sit amet",
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
        desc: "lorem ipsum dolor sit amet",
        icon: CircleHelp,
        link: "/user-management/accounts",
        onClick: (navigate) => navigate && navigate("/user-management/accounts"), // Ensure navigate is defined
      },
      {
        name: "กำหนดสิทธิ์การเข้าถึงและบทบาท",
        desc: "lorem ipsum dolor sit amet",
        icon: MessageCircle,
        link: "/user-management/roles",
        onClick: (navigate) => navigate && navigate("/user-management/roles"), // Ensure navigate is defined
      },
      {
        name: "Audit & Monitoring",
        desc: "lorem ipsum dolor sit amet",
        icon: TriangleAlert,
        link: "/user-management/audit",
        onClick: (navigate) => navigate && navigate("/user-management/audit"), // Ensure navigate is defined
      },
      {
        name: "Security & Access",
        desc: "lorem ipsum dolor sit amet",
        icon: TriangleAlert,
        link: "/user-management/security",
        onClick: (navigate) => navigate && navigate("/user-management/security"), // Ensure navigate is defined
      },
    ],
    gridCols: 1,
  },
];