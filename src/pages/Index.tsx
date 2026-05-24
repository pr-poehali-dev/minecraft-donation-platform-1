import { useState } from "react";
import NavBar from "@/components/vk/NavBar";
import HeroSection from "@/components/vk/HeroSection";
import ShopSection from "@/components/vk/ShopSection";
import InfoSections from "@/components/vk/InfoSections";
import BuyModal from "@/components/vk/BuyModal";
import { type BuyTarget } from "@/components/vk/types";

export type { Order } from "@/components/vk/types";
export { getOrders, saveOrders } from "@/components/vk/types";

export default function Index() {
  const [buyModal, setBuyModal] = useState<BuyTarget | null>(null);

  const openBuy = (target: BuyTarget) => setBuyModal(target);
  const closeBuy = () => setBuyModal(null);

  const scrollToShop = () => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <NavBar />
      <HeroSection onShopClick={scrollToShop} />
      <ShopSection onBuy={openBuy} />
      <InfoSections />
      <BuyModal buyModal={buyModal} onClose={closeBuy} />
    </div>
  );
}
