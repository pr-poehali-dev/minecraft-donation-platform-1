import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type BuyTarget, TITLES } from "./types";

interface ShopSectionProps {
  onBuy: (target: BuyTarget) => void;
}

export default function ShopSection({ onBuy }: ShopSectionProps) {
  const [titleMenuOpen, setTitleMenuOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<(typeof TITLES)[0] | null>(null);

  return (
    <>
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
                    onClick={() => onBuy({ type: "sponsor" })}
                  >
                    Оформить подписку
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ROLLBACK */}
          <div className="mb-16">
            <h3 className="font-montserrat font-bold text-2xl text-white mb-6 text-center">Разовые услуги</h3>
            <div className="max-w-lg mx-auto">
              <div className="relative bg-[#111820] rounded-3xl border border-orange-500/25 shadow-2xl overflow-hidden hover-lift">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">↩️</span>
                    <div>
                      <div className="font-montserrat font-black text-2xl text-white">Откат ресурсов</div>
                      <div className="text-gray-500 text-sm">Разовая услуга</div>
                    </div>
                  </div>
                  <div className="text-5xl font-montserrat font-black text-orange-400 mb-2">
                    299 <span className="text-2xl text-gray-500 font-normal">₽</span>
                  </div>
                  <div className="space-y-3 my-6">
                    {[
                      { icon: "RotateCcw", text: "Инвентарь или ресурсы вернут назад" },
                      { icon: "Clock", text: "Разовое использование" },
                      { icon: "MessageSquare", text: "Выполняется администратором вручную" },
                    ].map((f) => (
                      <div key={f.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon name={f.icon as "RotateCcw"} size={15} className="text-orange-400" />
                        </div>
                        <span className="text-gray-300 font-medium text-sm">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-400 text-black font-montserrat font-black py-4 rounded-2xl text-lg"
                    onClick={() => onBuy({ type: "rollback" })}
                  >
                    Купить откат
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
                  onBuy({ type: "title", name: selectedTitle.name, price: 30 });
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
    </>
  );
}
