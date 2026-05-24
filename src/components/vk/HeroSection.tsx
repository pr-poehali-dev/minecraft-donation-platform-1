import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onShopClick: () => void;
}

export default function HeroSection({ onShopClick }: HeroSectionProps) {
  return (
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
  );
}
