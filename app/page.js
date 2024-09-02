import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Services from "./components/Services";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Features />
      <Footer />
    </div>
  );
}
