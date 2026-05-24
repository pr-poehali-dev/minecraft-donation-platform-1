export type BuyTarget =
  | { type: "sponsor" }
  | { type: "rollback" }
  | { type: "title"; name: string; price: number };

export interface Order {
  id: string;
  type: "sponsor" | "rollback" | "title";
  titleName?: string;
  amount: number;
  nick: string;
  promo: string;
  receiptUrl: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export const TITLES = [
  { name: "⚔️ Воин", desc: "Бесстрашный защитник сервера" },
  { name: "🌿 Фермер", desc: "Мастер возделывания земли" },
  { name: "🔥 Дракон", desc: "Легенда подземных миров" },
  { name: "🌊 Мореплаватель", desc: "Покоритель морских просторов" },
  { name: "🏔️ Горец", desc: "Хозяин вершин и пещер" },
  { name: "✨ Волшебник", desc: "Мастер зачарований" },
  { name: "👑 Король", desc: "Правитель своих владений" },
  { name: "🦊 Лисёнок", desc: "Хитрый и ловкий выживальщик" },
  { name: "🌙 Ночной страж", desc: "Не спит, пока другие отдыхают" },
  { name: "🎯 Охотник", desc: "Меткий и быстрый следопыт" },
  { name: "🛡️ Паладин", desc: "Непоколебимый страж добра" },
  { name: "🌸 Садовник", desc: "Хранитель цветущих садов" },
];

export const FAQ = [
  {
    q: "Как быстро выдают донат?",
    a: "Донат выдаётся автоматически после подтверждения чека администратором — обычно в течение пары часов.",
  },
  {
    q: "Как получить привилегии на сервере?",
    a: "Донат выдаётся автоматически! После одобрения заявки тебе автоматически добавят привилегию на сервере. Ничего вводить не нужно — просто зайди под своим ником.",
  },
  {
    q: "Работает ли промокод на скидку?",
    a: "Да, промокоды дают скидку или бонусные титулы. Следите за анонсами в нашем Discord.",
  },
  {
    q: "На какой версии Minecraft работает сервер?",
    a: "Сервер работает на версии Java Edition 1.21.1. Убедись, что у тебя установлена именно эта версия.",
  },
  {
    q: "Что если чек не приняли?",
    a: "Напиши в Discord или на email — разберёмся в течение нескольких часов.",
  },
  {
    q: "Можно ли вернуть деньги?",
    a: "Донат — это поддержка проекта, возврат не предусмотрен, но мы всегда идём навстречу в спорных ситуациях.",
  },
];

export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem("vk_orders") || "[]");
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem("vk_orders", JSON.stringify(orders));
}
