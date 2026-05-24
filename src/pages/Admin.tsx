import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type Order, getOrders, saveOrders } from "./Index";

const ADMIN_LOGIN = "KayFaaaY";
const ADMIN_PASS = "2307Kirill";

type Tab = "pending" | "approved" | "rejected";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<Tab>("pending");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (authed) {
      setOrders(getOrders());
    }
  }, [authed]);

  const handleLogin = () => {
    if (login === ADMIN_LOGIN && pass === ADMIN_PASS) {
      setAuthed(true);
      setError("");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  const updateStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    saveOrders(updated);
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    saveOrders(updated);
    if (selectedOrder?.id === id) setSelectedOrder(null);
  };

  const filtered = orders.filter((o) => o.status === tab);

  const statusLabel: Record<Order["status"], string> = {
    pending: "Ожидает",
    approved: "Одобрено",
    rejected: "Отклонено",
  };

  const statusColor: Record<Order["status"], string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const tabCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    approved: orders.filter((o) => o.status === "approved").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-5xl">🛡️</span>
            <h1 className="font-montserrat font-black text-2xl text-gray-900 mt-3">Панель управления</h1>
            <p className="text-gray-400 text-sm mt-1">VaniilaKind Admin</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Логин</label>
              <Input
                placeholder="Введи логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="rounded-xl border-gray-200"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Пароль</label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Введи пароль"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="rounded-xl border-gray-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon name={showPass ? "EyeOff" : "Eye"} size={18} />
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 font-medium">
                {error}
              </div>
            )}
            <Button
              className="w-full bg-green-700 hover:bg-green-800 text-white font-montserrat font-bold py-3 rounded-2xl"
              onClick={handleLogin}
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <span className="font-montserrat font-black text-lg text-gray-900">VaniilaKind Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Всего заявок: {orders.length}</span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-gray-600"
              onClick={() => { setAuthed(false); setLogin(""); setPass(""); }}
            >
              <Icon name="LogOut" size={16} className="mr-1" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {(["pending", "approved", "rejected"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSelectedOrder(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                tab === t
                  ? "bg-gray-900 text-white shadow-md"
                  : "bg-white border border-gray-100 text-gray-500 hover:border-gray-200"
              }`}
            >
              {t === "pending" && "⏳"}
              {t === "approved" && "✅"}
              {t === "rejected" && "❌"}
              {t === "pending" ? "Ожидают" : t === "approved" ? "Одобренные" : "Отклонённые"}
              {tabCounts[t] > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  tab === t ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {tabCounts[t]}
                </span>
              )}
            </button>
          ))}
          <Button
            size="sm"
            variant="outline"
            className="ml-auto rounded-xl"
            onClick={() => setOrders(getOrders())}
          >
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Обновить
          </Button>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center">
            <div className="text-5xl mb-4">
              {tab === "pending" ? "📭" : tab === "approved" ? "🎉" : "🗑️"}
            </div>
            <div className="font-montserrat font-bold text-gray-400 text-lg">
              {tab === "pending" ? "Нет новых заявок" : tab === "approved" ? "Нет одобренных" : "Нет отклонённых"}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* LIST */}
            <div className="space-y-3">
              {filtered.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-md ${
                    selectedOrder?.id === order.id
                      ? "border-green-400 shadow-md"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-montserrat font-black text-gray-900 truncate">
                          {order.nick}
                        </span>
                        <Badge className={`text-xs border-0 flex-shrink-0 ${statusColor[order.status]}`}>
                          {statusLabel[order.status]}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.type === "sponsor" ? "👑 Подписка Спонсор" : `🏷️ Титул: ${order.titleName}`}
                      </div>
                      {order.promo && (
                        <div className="text-xs text-green-600 font-semibold mt-1">🎟️ Промокод: {order.promo}</div>
                      )}
                      <div className="text-xs text-gray-300 mt-1">
                        {new Date(order.date).toLocaleString("ru-RU")}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-montserrat font-black text-green-700 text-lg">{order.amount} ₽</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DETAIL */}
            {selectedOrder && (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24 self-start">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-montserrat font-black text-xl text-gray-900">Заявка #{selectedOrder.id.slice(-6)}</h3>
                  <Badge className={`border-0 ${statusColor[selectedOrder.status]}`}>
                    {statusLabel[selectedOrder.status]}
                  </Badge>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Ник</span>
                    <span className="font-bold text-gray-800">{selectedOrder.nick}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Тип</span>
                    <span className="font-bold text-gray-800">
                      {selectedOrder.type === "sponsor" ? "Подписка Спонсор" : `Титул: ${selectedOrder.titleName}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Сумма</span>
                    <span className="font-black text-green-700">{selectedOrder.amount} ₽</span>
                  </div>
                  {selectedOrder.promo && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Промокод</span>
                      <span className="font-bold text-green-600">{selectedOrder.promo}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Дата</span>
                    <span className="text-gray-600 text-sm">{new Date(selectedOrder.date).toLocaleString("ru-RU")}</span>
                  </div>
                </div>

                {/* RECEIPT */}
                <div className="mb-5">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Чек об оплате</div>
                  <img
                    src={selectedOrder.receiptUrl}
                    alt="чек"
                    className="w-full rounded-2xl border border-gray-100 object-contain max-h-56"
                  />
                </div>

                {/* ACTIONS */}
                <div className="space-y-2">
                  {selectedOrder.status !== "approved" && (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-montserrat font-bold rounded-2xl py-3"
                      onClick={() => updateStatus(selectedOrder.id, "approved")}
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Одобрить
                    </Button>
                  )}
                  {selectedOrder.status !== "rejected" && (
                    <Button
                      variant="outline"
                      className="w-full border-red-200 text-red-600 hover:bg-red-50 font-montserrat font-bold rounded-2xl py-3"
                      onClick={() => updateStatus(selectedOrder.id, "rejected")}
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Отклонить
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-red-500 font-bold rounded-2xl py-3"
                    onClick={() => deleteOrder(selectedOrder.id)}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Удалить заявку
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
