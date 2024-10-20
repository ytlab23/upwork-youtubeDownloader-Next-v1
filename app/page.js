import React from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Services from "./components/Services";
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Features />
      <FAQ/>
      <Footer />
    </div>
  );
}
