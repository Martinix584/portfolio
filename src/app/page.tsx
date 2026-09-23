import { EmergencyStop } from "@/components/EmergencyStop";
import { Footer } from "@/components/Footer";
import { FactoryGame } from "@/components/game/FactoryGame";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkOrder } from "@/components/order/WorkOrder";
import { ProductionLine } from "@/components/ProductionLine";
import { Toolroom } from "@/components/Toolroom";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductionLine />
        <Toolroom />
        <FactoryGame />
        <WorkOrder />
      </main>
      <Footer />
      <EmergencyStop />
    </>
  );
}
