import {
  User,
  UserPlus,
  Video,
  MessageCircle,
  Settings,
  MessageCircleIcon,
  Mail,
  Heart,
  CircleOff,
  Delete,
  UserCheck,
  Gift,
} from "lucide-react";

export const Auth_Items = [
  {
    prop: "nike-name",
    icon: User,
    name: "دخول الزوار",
    placeholder: ["أكتب الاسم المستعار"],
  },
  {
    prop: "sign-in",
    icon: User,
    name: "دخول الاعضاء",
    placeholder: ["اكتب اسم العضو", "اكتب كلمه المرور"],
  },
  {
    prop: "sign-up",
    icon: UserPlus,
    name: "تسجيل عضويه",
    placeholder: ["اكتب اسم العضو", "اكتب كلمه المرور"],
  },
];

export const ControlBarItems = [
  {
    name: "",
    icon: User,
  },
  {
    name: "غرف",
    icon: Video,
  },
  {
    name: "خاص",
    icon: MessageCircle,
  },
  {
    name: "الضبط",
    icon: Settings,
  },
];

export let SIZE = 1;

export const Profile_Items = [
  {
    icon: MessageCircleIcon,
    text: "  محادثه خاصة",
  },
  {
    icon: Mail,
    text: "تنبيه",
  },
  {
    icon: Heart,
    text: "0",
  },
  {
    icon: CircleOff,
    text: "تجاهل",
  },
  {
    icon: CircleOff,
    text: "الباند",
  },
  {
    icon: CircleOff,
    text: "طرد",
  },
  {
    icon: Delete,
    text: "حذف الصورة",
  },
  {
    icon: UserCheck,
    text: "ترقيت المراقب",
  },
  {
    icon: Gift,
    text: "هدية",
  },
];
export const EMOJIS = [
  "✌",
  "😂",
  "😝",
  "😁",
  "😱",
  "👉",
  "🙌",
  "🍻",
  "🔥",
  "🌈",
  "☀",
  "🎈",
  "🌹",
  "💄",
  "🎀",
  "⚽",
  "🎾",
  "🏁",
  "😡",
  "👿",
  "🐻",
  "🐶",
  "🐬",
  "🐟",
  "🍀",
  "👀",
  "🚗",
  "🍎",
  "💝",
  "💙",
  "👌",
  "❤",
  "😍",
  "😉",
  "😓",
  "😳",
  "💪",
  "💩",
  "🍸",
  "🔑",
  "💖",
  "🌟",
  "🎉",
  "🌺",
  "🎶",
  "👠",
  "🏈",
  "⚾",
  "🏆",
  "👽",
  "💀",
  "🐵",
  "🐮",
  "🐩",
  "🐎",
  "💣",
  "👃",
  "👂",
  "🍓",
  "💘",
  "💜",
  "👊",
  "💋",
  "😘",
  "😜",
  "😵",
  "🙏",
  "👋",
  "🚽",
  "💃",
  "💎",
  "🚀",
  "🌙",
  "🎁",
  "⛄",
  "🌊",
  "⛵",
  "🏀",
  "🎱",
  "💰",
  "👶",
  "👸",
  "🐰",
  "🐷",
  "🐍",
  "🐫",
  "🔫",
  "👄",
  "🚲",
  "🍉",
  "💛",
  "💚",
];

export const ADMIN_SIDEBAR = [
  {
    text: "السجل",
    link: "/admin-view/record",
  },
  {
    text: "الحالات",
    link: "/admin-view/status",
  },
  {
    text: "الأعضاء",
    link: "/admin-view/users",
  },
  {
    text: "الحظر",
    link: "/admin-view/block",
  },
  // {
  //   text: "الصلاحيات",
  //   link: "/admin-view/permissions",
  // },
  {
    text: "فلتر",
    link: "/admin-view/filter",
  },
  {
    text: "غرف",
    link: "/admin-view/rooms",
  },
  {
    text: "الاختصارات",
    link: "/admin-view/abbreviations",
  },
  // {
  //   text: "الاشتراكات",
  //   link: "/admin-view/subscriptions",
  // },
  {
    text: "اداره الموقع",
    link: "/admin-view/control",
  },
  {
    text : "الرسائل",
    link : "/admin-view/messages"
  },
  {
    text : "الخروج",
    link : "/rommId"
  }
];



export const Browzer = [
  "Chrome",
  "Firefox",
  "Opera",
  "Safari",
]


export const System = [
  "Android",
  "iOS",
  "Windows",
  "linux",
  
]