import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "./types";

interface InfoSectionsProps {
  onShopClick: () => void;
}

export default function InfoSections({ onShopClick }: InfoSectionsProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <>
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
              onClick={onShopClick}
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

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 bg-[#0a0e13]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/15 text-green-400 border-green-500/20 mb-4 font-semibold">О сервере</Badge>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4">Почему VaniilaKind?</h2>
          </div>

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
              href="https://discord.gg/d4Y3PH5TJG"
              target="_blank" rel="noopener noreferrer"
              className="bg-[#5865F2]/10 border border-[#5865F2]/25 rounded-3xl p-8 text-center hover-lift group block"
            >
              <div className="text-4xl mb-3">💬</div>
              <div className="font-montserrat font-bold text-white mb-1 group-hover:text-[#7c85f7] transition-colors">Discord</div>
              <div className="text-sm text-gray-500">Основной канал связи</div>
              <div className="text-[#7c85f7] font-semibold text-sm mt-3">discord.gg/d4Y3PH5TJG</div>
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
    </>
  );
}