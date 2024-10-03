import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ContestantsSection from "./components/ContestantsSection";
import Gallery from "./components/Gallery";
import useFetch from "@/utils/useFetch";

export default async function Home() {
  
  const session = await useFetch(`seasons/current`);
  console.log(session);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero session={session} />
      <ContestantsSection />
      <Gallery />
    </main>
  );
}