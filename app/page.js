import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const BatteryExperience = dynamic(
  () => import("@/components/BatteryExperience")
);

const About = dynamic(() => import("@/components/About"));

const Products = dynamic(() => import("@/components/Products"));

const Technology = dynamic(() => import("@/components/Technology"));

const Charging = dynamic(() => import("@/components/Charging"));

const Impact = dynamic(() => import("@/components/Impact"));

const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <BatteryExperience />
      <About />
      <Products />
      <Technology />
      <Charging />
      <Impact />
      <Footer />
    </main>
  );
}