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

export default function Index() {
  const [buyModal, setBuyModal] = useState<BuyTarget | null>(null);
  const [titleMenuOpen, setTitleMenuOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<(typeof TITLES)[0] | null>(null);
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
    setNick(""); setPromo("");
    setAgreed1(false); setAgreed2(false);
    setReceipt(null); setReceiptName("");
    setSubmitted(false);
  };

  const closeBuy = () => { setBuyModal(null); setSubmitted(false); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setReceipt(ev.target?.result as string); setReceiptName(file.name); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!nick || !agreed1 || !agreed2 || !receipt) return;
    const amount = buyModal?.type === "sponsor" ? 299 : (buyModal as { type: "title"; price: number }).price;
    const titleName = buyModal?.type === "title" ? (buyModal as { type: "title"; name: string }).name : undefined;
    const order: Order = {
      id: Date.now().toString(), type: buyModal!.type, titleName, amount,
      nick, promo, receiptUrl: receipt, date: new Date().toISOString(), status: "pending",
    };
    const orders = getOrders(); orders.push(order); saveOrders(orders);
    setSubmitted(true);
  };

  const copyCard = () => {
    navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ""));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const canSubmit = nick.trim() && agreed1 && agreed2 && receipt;
  const modalAmount = buyModal?.type === "sponsor" ? 299 : buyModal?.type === "title" ? buyModal.price : 0;

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/90 backdrop-blur-md border-b border-white/8">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-montserrat font-extrabold text-xl tracking-tight text-white">VaniilaKind</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400 font-medium">
            <a href="#shop" className="hover:text-green-400 transition-colors">Магазин</a>
            <a href="#about" className="hover:text-green-400 transition-colors">О сервере</a>
            <a href="#contacts" className="hover:text-green-400 transition-colors">Контакты</a>
            <a href="#faq" className="hover:text-green-400 transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://discord.gg/vaniilakind"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#5865F2] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#4752c4] transition-colors"
            >
              <Icon name="MessageCircle" size={16} />Discord
            </a>
            <a
              href="/admin"
              className="flex items-center gap-2 bg-white/8 border border-white/10 text-gray-400 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/12 transition-colors"
            >
              <Icon name="Shield" size={15} />
              <span className="hidden sm:inline">Админ</span>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 min-h-screen flex flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url('https://cdn.poehali.dev/projects/ac93221a-f514-42a4-a556-6f03e2e726b8/files/88eb0ec9-8f86-4692-866e-800e5db1d410.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/40 via-transparent to-[#0d1117]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
          <div className="animate-float text-6xl mb-6">🌿</div>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">Minecraft Java 1.21.1</span>
          </div>
          <h1 className="font-montserrat font-black text-6xl md:text-8xl text-white leading-tight mb-6 animate-fade-in">
            Vaniila<span className="text-green-400">Kind</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-4 animate-fade-in font-golos" style={{ animationDelay: "0.1s" }}>
            Уютный ванильный сервер с живым сообществом и честным геймплеем
          </p>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2 mb-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-semibold text-sm">Сервер онлайн</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-400 text-black font-montserrat font-black px-10 py-4 rounded-2xl text-base glow-green"
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            >
              Получить донат
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-white/15 bg-white/5 text-white font-montserrat font-bold px-8 py-4 rounded-2xl text-base hover:bg-white/10"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              О сервере
            </Button>
          </div>
        </div>

        <div className="relative grid grid-cols-3 max-w-2xl mx-auto w-full px-4 pb-16 gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {[
            { icon: "Users", label: "Сообщество", value: "Дружная атмосфера" },
            { icon: "Shield", label: "Версия", value: "Java 1.21.1" },
            { icon: "Zap", label: "Донат", value: "Автовыдача" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <Icon name={s.icon as "Users"} size={22} className="text-green-400 mx-auto mb-1" />
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
              <div className="text-sm font-bold text-white mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-24 px-4 texture-dots">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/15 text-green-400 border-green-500/20 mb-4 font-semibold">Магазин</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4">Поддержи сервер</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">Все доходы идут на развитие VaniilaKind</p>
          </div>

          {/* SPONSOR */}
          <div className="mb-16">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-6 text-center">Подписка Спонсор</h3>
            <div className="max-w-lg mx-auto">
              <div className="relative bg-[#111820] rounded-3xl border border-green-500/25 shadow-2xl overflow-hidden hover-lift glow-green">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-bold">Популярно</Badge>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">👑</span>
                    <div>
                      <div className="font-montserrat font-black text-2xl text-white">Спонсор</div>
                      <div className="text-gray-500 text-sm">Ежемесячная подписка</div>
                    </div>
                  </div>
                  <div className="text-5xl font-montserrat font-black text-green-400 mb-2">
                    299 <span className="text-2xl text-gray-500 font-normal">₽/мес</span>
                  </div>
                  <div className="space-y-3 my-6">
                    {[
                      { icon: "MessageSquare", text: "Роль Спонсора в Discord" },
                      { icon: "Sword", text: "Привилегия Спонсора в Minecraft" },
                      { icon: "Lock", text: "Доступ к VIP чату" },
                      { icon: "Tag", text: "+2 бесплатных титула на выбор" },
                      { icon: "RotateCcw", text: "Откат ресурсов (по запросу)" },
                    ].map((f) => (
                      <div key={f.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name={f.icon as "MessageSquare"} size={15} className="text-green-400" />
                        </div>
                        <span className="text-gray-300 font-medium text-sm">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-montserrat font-black py-4 rounded-2xl text-lg glow-green"
                    onClick={() => openBuy({ type: "sponsor" })}
                  >
                    Оформить подписку
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* TITLES */}
          <div className="text-center">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-2">Титулы</h3>
            <p className="text-gray-500 mb-8">30 ₽ за штуку • Отображаются над ником на сервере</p>
            <div className="max-w-sm mx-auto">
              <button
                onClick={() => setTitleMenuOpen(true)}
                className="w-full bg-[#111820] border-2 border-dashed border-white/15 hover:border-green-500/40 rounded-3xl p-8 transition-all group hover-lift"
              >
                <div className="text-5xl mb-4">🏷️</div>
                <div className="font-montserrat font-black text-xl text-white group-hover:text-green-400 transition-colors mb-2">
                  Выбрать титул
                </div>
                <div className="text-gray-500 text-sm mb-4">12 титулов на выбор • 30 ₽/шт</div>
                <div className="flex justify-center gap-1 flex-wrap">
                  {TITLES.slice(0, 6).map((t) => (
                    <span key={t.name} className="text-xl">{t.name.split(" ")[0]}</span>
                  ))}
                  <span className="text-gray-600 text-sm self-center ml-1">+6</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 bg-[#0a0e13]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/15 text-green-400 border-green-500/20 mb-4 font-semibold">О сервере</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4">Почему VaniilaKind?</h2>
          </div>

          {/* Auto-donate info block */}
          <div className="bg-green-500/8 border border-green-500/20 rounded-3xl p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl flex-shrink-0">⚡</div>
            <div>
              <div className="font-montserrat font-black text-xl text-white mb-2">Автоматическая выдача доната</div>
              <p className="text-gray-400 leading-relaxed">
                После одобрения заявки администратором привилегии выдаются <span className="text-green-400 font-semibold">автоматически</span> — не нужно вводить никаких команд.
                Просто зайди на сервер под своим ником и всё уже будет работать. Версия сервера: <span className="text-white font-bold">Java 1.21.1</span>.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🌿", title: "Ванильный геймплей", desc: "Никаких pay-to-win. Чистый Minecraft без изменений баланса." },
              { emoji: "🤝", title: "Дружное сообщество", desc: "Активный Discord, помощь новичкам, совместные ивенты и стройки." },
              { emoji: "🛡️", title: "Стабильная работа", desc: "Антигриф, защита участков, регулярные бэкапы." },
              { emoji: "🎮", title: "Регулярные ивенты", desc: "Турниры, конкурсы на лучшую постройку, совместные квесты." },
              { emoji: "💬", title: "VIP чат", desc: "Эксклюзивный канал общения для спонсоров сервера." },
              { emoji: "✨", title: "Косметика без P2W", desc: "Титулы и теги — только визуально, баланс не нарушается." },
            ].map((f) => (
              <div key={f.title} className="bg-[#111820] rounded-3xl p-7 border border-white/6 hover-lift">
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-montserrat font-bold text-lg text-white mb-2">{f.title}</h3>
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
            <Badge className="bg-green-500/15 text-green-400 border-green-500/20 mb-4 font-semibold">Контакты</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4">Свяжись с нами</h2>
            <p className="text-gray-500 text-lg">Мы всегда на связи и готовы помочь</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <a
              href="https://discord.gg/vaniilakind"
              target="_blank" rel="noopener noreferrer"
              className="bg-[#5865F2]/10 border border-[#5865F2]/25 rounded-3xl p-8 text-center hover-lift group block"
            >
              <div className="text-4xl mb-3">💬</div>
              <div className="font-montserrat font-bold text-white mb-1 group-hover:text-[#7c85f7] transition-colors">Discord</div>
              <div className="text-sm text-gray-500">Основной канал связи</div>
              <div className="text-[#7c85f7] font-semibold text-sm mt-3">discord.gg/vaniilakind</div>
            </a>
            <a
              href="mailto:admin@vaniilakind.ru"
              className="bg-green-500/8 border border-green-500/20 rounded-3xl p-8 text-center hover-lift group block"
            >
              <div className="text-4xl mb-3">📧</div>
              <div className="font-montserrat font-bold text-white mb-1 group-hover:text-green-400 transition-colors">Email</div>
              <div className="text-sm text-gray-500">Для официальных вопросов</div>
              <div className="text-green-400 font-semibold text-sm mt-3">admin@vaniilakind.ru</div>
            </a>
            <div className="bg-white/4 border border-white/8 rounded-3xl p-8 text-center">
              <div className="text-4xl mb-3">⏰</div>
              <div className="font-montserrat font-bold text-white mb-1">Время ответа</div>
              <div className="text-sm text-gray-500">Обычно отвечаем в течение</div>
              <div className="text-gray-300 font-semibold text-sm mt-3">1–6 часов</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 bg-[#0a0e13]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/15 text-green-400 border-green-500/20 mb-4 font-semibold">FAQ</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4">Частые вопросы</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-[#111820] rounded-2xl border border-white/6 overflow-hidden">
                <button
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/3 transition-colors"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="font-montserrat font-bold text-white">{item.q}</span>
                  <Icon name={faqOpen === i ? "ChevronUp" : "ChevronDown"} size={20} className="text-gray-500 flex-shrink-0" />
                </button>
                {faqOpen === i && (
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed animate-fade-in">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 border-t border-white/6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">🌿</span>
          <span className="font-montserrat font-black text-lg text-white">VaniilaKind</span>
        </div>
        <p className="text-gray-600 text-sm">© 2024 VaniilaKind. Minecraft сервер для настоящих выживальщиков.</p>
        <p className="text-gray-700 text-xs mt-1">Не является официальным продуктом Mojang Studios</p>
      </footer>

      {/* TITLE MENU MODAL */}
      <Dialog open={titleMenuOpen} onOpenChange={setTitleMenuOpen}>
        <DialogContent className="max-w-lg rounded-3xl border border-white/10 bg-[#111820] shadow-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat font-black text-2xl text-white">Выбери титул 🏷️</DialogTitle>
          </DialogHeader>
          {!selectedTitle ? (
            <div className="grid grid-cols-2 gap-3 mt-2">
              {TITLES.map((title) => (
                <button
                  key={title.name}
                  onClick={() => setSelectedTitle(title)}
                  className="bg-white/5 hover:bg-green-500/15 border border-white/8 hover:border-green-500/30 rounded-2xl p-4 text-left transition-all group"
                >
                  <div className="text-2xl mb-1">{title.name.split(" ")[0]}</div>
                  <div className="font-bold text-white text-sm group-hover:text-green-400 transition-colors">
                    {title.name.substring(title.name.indexOf(" ") + 1)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{title.desc}</div>
                  <div className="text-green-400 font-black text-sm mt-2">30 ₽</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-2">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedTitle.name.split(" ")[0]}</span>
                <div>
                  <div className="font-bold text-white">{selectedTitle.name}</div>
                  <div className="text-gray-400 text-sm">{selectedTitle.desc}</div>
                  <div className="text-green-400 font-black">30 ₽</div>
                </div>
                <button
                  onClick={() => setSelectedTitle(null)}
                  className="ml-auto text-gray-500 hover:text-white"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>
              <Button
                className="w-full bg-green-500 hover:bg-green-400 text-black font-montserrat font-black py-4 rounded-2xl text-base glow-green"
                onClick={() => {
                  openBuy({ type: "title", name: selectedTitle.name, price: 30 });
                  setTitleMenuOpen(false);
                  setSelectedTitle(null);
                }}
              >
                Купить этот титул
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* BUY MODAL */}
      <Dialog open={!!buyModal} onOpenChange={(open) => !open && closeBuy()}>
        <DialogContent className="max-w-md rounded-3xl border border-white/10 bg-[#111820] shadow-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat font-black text-2xl text-white">
              {submitted ? "Заявка отправлена! ✅"
                : buyModal?.type === "sponsor" ? "Оформление подписки Спонсор"
                : "Покупка титула"}
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-6">
              <div className="text-6xl mb-4 animate-float">🎉</div>
              <p className="text-gray-300 mb-2 font-medium">Твоя заявка принята и ожидает проверки администратором.</p>
              <p className="text-gray-500 text-sm">После одобрения привилегии выдадутся <span className="text-green-400">автоматически</span> — просто зайди на сервер.</p>
              <Button className="mt-6 bg-green-500 hover:bg-green-400 text-black font-montserrat font-black w-full rounded-2xl" onClick={closeBuy}>
                Отлично!
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {buyModal?.type === "title" && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-3xl">{buyModal.name.split(" ")[0]}</span>
                  <div>
                    <div className="font-bold text-white">{buyModal.name}</div>
                    <div className="text-green-400 font-bold">30 ₽</div>
                  </div>
                </div>
              )}
              {buyModal?.type === "sponsor" && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">
                  <div className="font-bold text-white mb-1">Подписка Спонсор</div>
                  <div className="text-green-400 font-black text-xl">299 ₽/месяц</div>
                </div>
              )}

              {/* CARD */}
              <div className="bg-[#0a0e13] border border-white/8 rounded-2xl p-5">
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Переведи на карту</div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-white font-montserrat font-bold text-lg tracking-widest">{CARD_NUMBER}</span>
                  <button
                    onClick={copyCard}
                    className="bg-white/8 hover:bg-white/14 rounded-xl px-3 py-1.5 text-gray-300 text-xs flex items-center gap-1 transition-colors"
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={13} />
                    {copied ? "Скопировано" : "Копировать"}
                  </button>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div className="text-green-400 font-black text-2xl">{modalAmount} ₽</div>
                  <div className="text-gray-500 text-sm">{CARD_HOLDER}</div>
                </div>
              </div>

              {/* NICK */}
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-1.5 block">
                  Ник в Minecraft <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="Например: Steve123"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500/50"
                />
              </div>

              {/* PROMO */}
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-1.5 block">
                  Промокод <span className="text-gray-600">(необязательно)</span>
                </label>
                <Input
                  placeholder="Введи промокод, если есть"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500/50"
                />
              </div>

              {/* RECEIPT */}
              <div>
                <label className="text-sm font-semibold text-gray-300 mb-1.5 block">
                  Фото чека <span className="text-red-400">*</span>
                </label>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/12 rounded-2xl p-5 text-center hover:border-green-500/30 hover:bg-green-500/5 transition-all"
                >
                  {receipt ? (
                    <div>
                      <img src={receipt} alt="чек" className="max-h-28 mx-auto rounded-xl mb-2 object-contain" />
                      <div className="text-xs text-green-400 font-semibold">{receiptName}</div>
                      <div className="text-xs text-gray-600 mt-1">Нажми чтобы изменить</div>
                    </div>
                  ) : (
                    <div>
                      <Icon name="Upload" size={28} className="text-gray-600 mx-auto mb-2" />
                      <div className="text-sm text-gray-400 font-medium">Прикрепи скриншот чека</div>
                      <div className="text-xs text-gray-600 mt-1">PNG, JPG до 10 МБ</div>
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
                    className="mt-0.5 border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <span className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                    Я принимаю правила сервера и условия оказания услуг VaniilaKind
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <Checkbox
                    checked={agreed2}
                    onCheckedChange={(c) => setAgreed2(!!c)}
                    className="mt-0.5 border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <span className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                    Я подтверждаю, что карта, с которой произведён платёж, принадлежит мне
                  </span>
                </label>
              </div>

              <Button
                className="w-full bg-green-500 hover:bg-green-400 text-black font-montserrat font-black py-4 rounded-2xl text-base disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={!canSubmit}
                onClick={handleSubmit}
              >
                Отправить заявку
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
