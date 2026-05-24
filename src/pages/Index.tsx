import { useState } from "react";
import NavBar from "@/components/vk/NavBar";
import InfoSections from "@/components/vk/InfoSections";
import ShopSection from "@/components/vk/ShopSection";
import BuyModal from "@/components/vk/BuyModal";
import { type BuyTarget } from "@/components/vk/types";

export type { Order } from "@/components/vk/types";
export { getOrders, saveOrders } from "@/components/vk/types";

export default function Index() {
  const [buyModal, setBuyModal] = useState<BuyTarget | null>(null);

  const openBuy = (target: BuyTarget) => setBuyModal(target);
  const closeBuy = () => setBuyModal(null);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <NavBar />
      <InfoSections onShopClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} />
      <ShopSection onBuy={openBuy} />
      <BuyModal buyModal={buyModal} onClose={closeBuy} />
    </div>
  );
}
