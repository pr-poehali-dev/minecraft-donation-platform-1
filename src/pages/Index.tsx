import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const CARD_NUMBER = "2202 2081 3455 9450";
const CARD_HOLDER = "Кирилл К.";

type BuyTarget =
  | { type: "sponsor" }
  | { type: "title"; name: string; price: number };

export interface Order {
  id: string;
  type: "sponsor" | "title";
  titleName?: string;
  amount: number;
  nick: string;
  promo: string;
  receiptUrl: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const TITLES = [
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

const FAQ = [
  {
    q: "Как быстро выдают донат?",
    a: "После подтверждения чека администратором — в течение 1–24 часов. Обычно намного быстрее.",
  },
  {
    q: "Как получить донат в Minecraft?",
    a: "После покупки введите /донат на сервере. Привилегии будут добавлены к вашему нику автоматически.",
  },
  {
    q: "Работает ли промокод на скидку?",
    a: "Да, промокоды дают скидку или бонусные титулы. Следите за анонсами в нашем Discord.",
  },
  {
    q: "Что если чек не приняли?",
    a: "Напишите в Discord или на email — разберёмся в течение нескольких часов.",
  },
  {
    q: "Можно ли вернуть деньги?",
    a: "Донат — это поддержка проекта, возврат не предусмотрен, но мы всегда идём навстречу в спорных ситуациях.",
  },
  {
    q: "На какой версии Minecraft работает сервер?",
    a: "Сервер работает на актуальной версии Java Edition. IP адрес и версия в Discord-канале.",
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

export default function Index() {
  const [buyModal, setBuyModal] = useState<BuyTarget | null>(null);
  const [nick, setNick] = useState("");
  const [promo, setPromo] = useState("");
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const openBuy = (target: BuyTarget) => {
    setBuyModal(target);
    setNick("");
    setPromo("");
    setAgreed1(false);
    setAgreed2(false);
    setReceipt(null);
    setReceiptName("");
    setSubmitted(false);
  };

  const closeBuy = () => {
    setBuyModal(null);
    setSubmitted(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setReceipt(ev.target?.result as string);
      setReceiptName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!nick || !agreed1 || !agreed2 || !receipt) return;
    const amount = buyModal?.type === "sponsor" ? 299 : (buyModal as { type: "title"; price: number }).price;
    const titleName = buyModal?.type === "title" ? (buyModal as { type: "title"; name: string }).name : undefined;
    const order: Order = {
      id: Date.now().toString(),
      type: buyModal!.type,
      titleName,
      amount,
      nick,
      promo,
      receiptUrl: receipt,
      date: new Date().toISOString(),
      status: "pending",
    };
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
    setSubmitted(true);
  };

  const copyCard = () => {
    navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canSubmit = nick.trim() && agreed1 && agreed2 && receipt;
  const modalAmount = buyModal?.type === "sponsor" ? 299 : buyModal?.type === "title" ? buyModal.price : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-montserrat font-extrabold text-xl tracking-tight text-gray-900">
              VaniilaKind
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500 font-medium">
            <a href="#shop" className="hover:text-green-700 transition-colors">Магазин</a>
            <a href="#about" className="hover:text-green-700 transition-colors">О сервере</a>
            <a href="#contacts" className="hover:text-green-700 transition-colors">Контакты</a>
            <a href="#faq" className="hover:text-green-700 transition-colors">FAQ</a>
          </div>
          <a
            href="https://discord.gg/vaniilakind"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#5865F2] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#4752c4] transition-colors"
          >
            <Icon name="MessageCircle" size={16} />
            Discord
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 min-h-screen flex flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/ac93221a-f514-42a4-a556-6f03e2e726b8/files/88eb0ec9-8f86-4692-866e-800e5db1d410.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
          <div className="animate-float text-6xl mb-6">🌿</div>
          <h1 className="font-montserrat font-black text-5xl md:text-7xl text-gray-900 leading-tight mb-6 animate-fade-in">
            VaniilaKind
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-xl mb-4 animate-fade-in font-golos" style={{ animationDelay: "0.1s" }}>
            Уютный Minecraft сервер для тех, кто ценит ванильный геймплей и настоящее сообщество
          </p>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-5 py-2 mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-700 font-semibold text-sm">Сервер онлайн</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              size="lg"
              className="bg-green-700 hover:bg-green-800 text-white font-montserrat font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-green-200"
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            >
              Получить донат
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-200 text-gray-700 font-montserrat font-bold px-8 py-4 rounded-2xl text-base hover:border-green-300 hover:bg-green-50"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Об сервере
            </Button>
          </div>
        </div>

        <div className="relative grid grid-cols-3 max-w-3xl mx-auto w-full px-4 pb-16 gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { icon: "Users", label: "Игроки", value: "Дружное сообщество" },
            { icon: "Shield", label: "Ванилла", value: "Честный геймплей" },
            { icon: "Star", label: "Донат", value: "Только косметика" },
          ].map((s) => (
            <div key={s.label} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
              <Icon name={s.icon as "Users"} size={24} className="text-green-600 mx-auto mb-1" />
              <div className="text-xs text-gray-400 font-medium">{s.label}</div>
              <div className="text-sm font-bold text-gray-800 mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-24 px-4 texture-dots">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-0 mb-4 font-semibold">Магазин</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-4">
              Поддержи сервер
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Все доходы идут на развитие и улучшение VaniilaKind
            </p>
          </div>

          {/* SPONSOR */}
          <div className="mb-16">
            <h3 className="font-montserrat font-bold text-2xl text-gray-800 mb-6 text-center">Подписка Спонсор</h3>
            <div className="max-w-lg mx-auto">
              <div className="relative bg-white rounded-3xl border-2 border-green-200 shadow-xl shadow-green-100/50 overflow-hidden hover-lift">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-400 to-green-600" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-600 text-white border-0 font-bold">Популярно</Badge>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">👑</span>
                    <div>
                      <div className="font-montserrat font-black text-2xl text-gray-900">Спонсор</div>
                      <div className="text-gray-400 text-sm">Ежемесячная подписка</div>
                    </div>
                  </div>
                  <div className="text-5xl font-montserrat font-black text-green-700 mb-2">
                    299 <span className="text-2xl text-gray-400 font-normal">₽/мес</span>
                  </div>
                  <div className="space-y-3 my-6">
                    {[
                      { icon: "MessageSquare", text: "Выдача доната в Discord" },
                      { icon: "Sword", text: "Донат в Minecraft" },
                      { icon: "Lock", text: "Доступ к VIP чату" },
                      { icon: "Tag", text: "+2 бесплатных титула на выбор" },
                    ].map((f) => (
                      <div key={f.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name={f.icon as "MessageSquare"} size={16} className="text-green-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-montserrat font-bold py-4 rounded-2xl text-lg shadow-lg shadow-green-200"
                    onClick={() => openBuy({ type: "sponsor" })}
                  >
                    Оформить подписку
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* TITLES */}
          <div>
            <h3 className="font-montserrat font-bold text-2xl text-gray-800 mb-2 text-center">Титулы</h3>
            <p className="text-center text-gray-400 mb-8">30 ₽ за штуку • Отображаются над ником</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {TITLES.map((title) => (
                <div
                  key={title.name}
                  className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover-lift cursor-pointer group shadow-sm"
                  onClick={() => openBuy({ type: "title", name: title.name, price: 30 })}
                >
                  <div className="text-3xl mb-2">{title.name.split(" ")[0]}</div>
                  <div className="font-montserrat font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors">
                    {title.name.substring(title.name.indexOf(" ") + 1)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 mb-3">{title.desc}</div>
                  <div className="text-green-700 font-bold text-sm">30 ₽</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-0 mb-4 font-semibold">О сервере</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-4">
              Почему VaniilaKind?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "🌿",
                title: "Ванильный геймплей",
                desc: "Никаких pay-to-win. Чистый Minecraft с сохранением баланса для всех игроков.",
              },
              {
                emoji: "🤝",
                title: "Дружное сообщество",
                desc: "Активный Discord, помощь новичкам, совместные ивенты и стройки.",
              },
              {
                emoji: "🛡️",
                title: "Стабильная работа",
                desc: "Антигриф, защита участков, регулярные бэкапы и опытная администрация.",
              },
              {
                emoji: "🎮",
                title: "Регулярные ивенты",
                desc: "Турниры, конкурсы на лучшую постройку, совместные квесты.",
              },
              {
                emoji: "💬",
                title: "Живое общение",
                desc: "VIP чат для спонсоров, голосовые каналы, тематические чаты.",
              },
              {
                emoji: "✨",
                title: "Косметика без P2W",
                desc: "Титулы и теги — только визуально. Баланс игры не нарушается.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover-lift">
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-montserrat font-bold text-lg text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-0 mb-4 font-semibold">Контакты</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-4">
              Свяжись с нами
            </h2>
            <p className="text-gray-500 text-lg">Мы всегда на связи и готовы помочь</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <a
              href="https://discord.gg/vaniilakind"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865F2]/5 border-2 border-[#5865F2]/20 rounded-3xl p-8 text-center hover-lift group block"
            >
              <div className="text-4xl mb-3">💬</div>
              <div className="font-montserrat font-bold text-gray-800 mb-1 group-hover:text-[#5865F2] transition-colors">
                Discord
              </div>
              <div className="text-sm text-gray-400">Основной канал связи</div>
              <div className="text-[#5865F2] font-semibold text-sm mt-3">discord.gg/vaniilakind</div>
            </a>
            <a
              href="mailto:admin@vaniilakind.ru"
              className="bg-green-50 border-2 border-green-100 rounded-3xl p-8 text-center hover-lift group block"
            >
              <div className="text-4xl mb-3">📧</div>
              <div className="font-montserrat font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">
                Email
              </div>
              <div className="text-sm text-gray-400">Для официальных вопросов</div>
              <div className="text-green-700 font-semibold text-sm mt-3">admin@vaniilakind.ru</div>
            </a>
            <div className="bg-gray-50 border-2 border-gray-100 rounded-3xl p-8 text-center">
              <div className="text-4xl mb-3">⏰</div>
              <div className="font-montserrat font-bold text-gray-800 mb-1">Время ответа</div>
              <div className="text-sm text-gray-400">Обычно отвечаем в течение</div>
              <div className="text-gray-700 font-semibold text-sm mt-3">1–6 часов</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-700 border-0 mb-4 font-semibold">FAQ</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-4">
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-montserrat font-bold text-gray-800">{item.q}</span>
                  <Icon
                    name={faqOpen === i ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-gray-400 flex-shrink-0"
                  />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-6 text-gray-500 leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">🌿</span>
          <span className="font-montserrat font-black text-lg text-gray-800">VaniilaKind</span>
        </div>
        <p className="text-gray-400 text-sm">© 2024 VaniilaKind. Minecraft сервер для настоящих выживальщиков.</p>
        <p className="text-gray-300 text-xs mt-2">Не является официальным продуктом Mojang Studios</p>
      </footer>

      {/* BUY MODAL */}
      <Dialog open={!!buyModal} onOpenChange={(open) => !open && closeBuy()}>
        <DialogContent className="max-w-md rounded-3xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat font-black text-2xl text-gray-900">
              {submitted
                ? "Заявка отправлена! ✅"
                : buyModal?.type === "sponsor"
                ? "Оформление подписки Спонсор"
                : "Покупка титула"}
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-6">
              <div className="text-6xl mb-4 animate-float">🎉</div>
              <p className="text-gray-600 mb-2 font-medium">
                Твоя заявка принята и ожидает проверки администратором.
              </p>
              <p className="text-gray-400 text-sm">
                Обычно проверка занимает до 24 часов. Следи за статусом в Discord.
              </p>
              <Button
                className="mt-6 bg-green-700 hover:bg-green-800 text-white font-montserrat font-bold w-full rounded-2xl"
                onClick={closeBuy}
              >
                Отлично!
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {buyModal?.type === "title" && (
                <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-3xl">{buyModal.name.split(" ")[0]}</span>
                  <div>
                    <div className="font-bold text-gray-800">{buyModal.name}</div>
                    <div className="text-green-700 font-bold">30 ₽</div>
                  </div>
                </div>
              )}

              {buyModal?.type === "sponsor" && (
                <div className="bg-green-50 rounded-2xl p-4">
                  <div className="font-bold text-gray-800 mb-1">Подписка Спонсор</div>
                  <div className="text-green-700 font-black text-xl">299 ₽/месяц</div>
                </div>
              )}

              {/* CARD */}
              <div className="bg-gray-900 rounded-2xl p-5">
                <div className="text-xs text-gray-400 mb-2">Переведи на карту</div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-white font-montserrat font-bold text-lg tracking-widest">
                    {CARD_NUMBER}
                  </span>
                  <button
                    onClick={copyCard}
                    className="bg-white/10 hover:bg-white/20 rounded-xl px-3 py-1.5 text-white text-xs flex items-center gap-1 transition-colors"
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={14} />
                    {copied ? "Скопировано" : "Копировать"}
                  </button>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div className="text-green-400 font-black text-2xl">{modalAmount} ₽</div>
                  <div className="text-gray-400 text-sm">{CARD_HOLDER}</div>
                </div>
              </div>

              {/* NICK */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Ник в Minecraft <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Например: Steve123"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-green-400"
                />
              </div>

              {/* PROMO */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Промокод <span className="text-gray-400">(необязательно)</span>
                </label>
                <Input
                  placeholder="Введи промокод, если есть"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-green-400"
                />
              </div>

              {/* RECEIPT */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Фото чека <span className="text-red-500">*</span>
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-5 text-center hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  {receipt ? (
                    <div>
                      <img src={receipt} alt="чек" className="max-h-32 mx-auto rounded-xl mb-2 object-contain" />
                      <div className="text-xs text-green-600 font-semibold">{receiptName}</div>
                      <div className="text-xs text-gray-400 mt-1">Нажми чтобы изменить</div>
                    </div>
                  ) : (
                    <div>
                      <Icon name="Upload" size={28} className="text-gray-300 mx-auto mb-2" />
                      <div className="text-sm text-gray-500 font-medium">Прикрепи скриншот чека</div>
                      <div className="text-xs text-gray-300 mt-1">PNG, JPG до 10 МБ</div>
                    </div>
                  )}
                </button>
              </div>

              {/* CHECKBOXES */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <Checkbox
                    checked={agreed1}
                    onCheckedChange={(c) => setAgreed1(!!c)}
                    className="mt-0.5 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                    Я принимаю правила сервера и условия оказания услуг VaniilaKind
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <Checkbox
                    checked={agreed2}
                    onCheckedChange={(c) => setAgreed2(!!c)}
                    className="mt-0.5 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                    Я подтверждаю, что карта, с которой произведён платёж, принадлежит мне
                  </span>
                </label>
              </div>

              <Button
                className="w-full bg-green-700 hover:bg-green-800 text-white font-montserrat font-bold py-4 rounded-2xl text-base disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                Отправить заявку на проверку
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}