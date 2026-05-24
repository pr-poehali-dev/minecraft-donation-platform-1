import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type BuyTarget, type Order, getOrders, saveOrders } from "./types";

const CARD_NUMBER = "2202 2081 3455 9450";
const CARD_HOLDER = "Кирилл К.";

interface BuyModalProps {
  buyModal: BuyTarget | null;
  onClose: () => void;
}

export default function BuyModal({ buyModal, onClose }: BuyModalProps) {
  const [nick, setNick] = useState("");
  const [promo, setPromo] = useState("");
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [receiptName, setReceiptName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    onClose();
    setNick(""); setPromo("");
    setAgreed1(false); setAgreed2(false);
    setReceipt(null); setReceiptName("");
    setSubmitted(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setReceipt(ev.target?.result as string); setReceiptName(file.name); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!nick || !agreed1 || !agreed2 || !receipt || !buyModal) return;
    const amount = buyModal.type === "sponsor" ? 299 : buyModal.type === "rollback" ? 299 : (buyModal as { type: "title"; price: number }).price;
    const titleName = buyModal.type === "title" ? (buyModal as { type: "title"; name: string }).name : undefined;
    const order: Order = {
      id: Date.now().toString(), type: buyModal.type, titleName, amount,
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
  const modalAmount = buyModal?.type === "sponsor" ? 299 : buyModal?.type === "rollback" ? 299 : buyModal?.type === "title" ? buyModal.price : 0;

  return (
    <Dialog open={!!buyModal} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md rounded-3xl border border-white/10 bg-[#111820] shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-montserrat font-black text-2xl text-white">
            {submitted ? "Заявка отправлена! ✅"
              : buyModal?.type === "sponsor" ? "Оформление подписки Спонсор"
              : buyModal?.type === "rollback" ? "Покупка отката ресурсов"
              : "Покупка титула"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6">
            <div className="text-6xl mb-4 animate-float">🎉</div>
            <p className="text-gray-300 mb-2 font-medium">Твоя заявка принята и ожидает проверки администратором.</p>
            <p className="text-gray-500 text-sm">После одобрения привилегии выдадутся <span className="text-green-400">автоматически</span> — просто зайди на сервер.</p>
            <Button className="mt-6 bg-green-500 hover:bg-green-400 text-black font-montserrat font-black w-full rounded-2xl" onClick={handleClose}>
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
            {buyModal?.type === "rollback" && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4">
                <div className="font-bold text-white mb-1">↩️ Откат ресурсов</div>
                <div className="text-orange-400 font-black text-xl">299 ₽ · разово</div>
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
  );
}
