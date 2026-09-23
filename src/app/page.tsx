import { EmergencyStop } from "@/components/EmergencyStop";
import { Footer } from "@/components/Footer";
import { FactoryGame } from "@/components/game/FactoryGame";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkOrder } from "@/components/order/WorkOrder";
import { Plant } from "@/components/plant/Plant";
import { Toolroom } from "@/components/Toolroom";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Plant />
        <Toolroom />
        <FactoryGame />
        <WorkOrder />
      </main>
      <Footer />
      <EmergencyStop />
    </>
  );
}
