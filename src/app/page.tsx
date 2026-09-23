import { EmergencyStop } from "@/components/EmergencyStop";
import { Footer } from "@/components/Footer";
import { FactoryGame } from "@/components/game/FactoryGame";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Plant } from "@/components/plant/Plant";
import { RndLab } from "@/components/lab/RndLab";
import { Toolroom } from "@/components/Toolroom";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Plant />
        <RndLab />
        <Toolroom />
        <FactoryGame />
      </main>
      <Footer />
      <EmergencyStop />
    </>
  );
}
