import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "./types";

export default function InfoSections() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <>
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
              href="mailto:acgrief@mail.ru"
              className="bg-green-500/8 border border-green-500/20 rounded-3xl p-8 text-center hover-lift group block"
            >
              <div className="text-4xl mb-3">📧</div>
              <div className="font-montserrat font-bold text-white mb-1 group-hover:text-green-400 transition-colors">Email</div>
              <div className="text-sm text-gray-500">Для официальных вопросов</div>
              <div className="text-green-400 font-semibold text-sm mt-3">acgrief@mail.ru</div>
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
        <p className="text-gray-600 text-sm">© 2026 VaniilaKind. Minecraft сервер для настоящих выживальщиков.</p>
        <p className="text-gray-700 text-xs mt-1">Не является официальным продуктом Mojang Studios</p>
        <div className="mt-5 pt-5 border-t border-white/4 flex flex-col items-center gap-1">
          <p className="text-gray-600 text-xs">Владелец проекта</p>
          <p className="text-gray-400 text-sm font-semibold">Кирилл К.</p>
          <p className="text-gray-600 text-xs mt-1">Основная карта для переводов</p>
          <p className="text-gray-400 font-montserrat font-bold text-sm tracking-widest">2202 2081 3455 9450</p>
        </div>
      </footer>
    </>
  );
}