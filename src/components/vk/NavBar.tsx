import Icon from "@/components/ui/icon";

export default function NavBar() {
  return (
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
  );
}
