import Banner from "@/components/home/Banner";
import FeaturedLawyers from "@/components/home/FeaturedLawyers";
import LegalCategories from "@/components/home/LegalCategories";
import TopLegalExperts from "@/components/home/TopLegalExperts";

export default function Home() {
  return (
    <>
      <Banner></Banner>
      <FeaturedLawyers></FeaturedLawyers>
      <TopLegalExperts></TopLegalExperts>
      <LegalCategories></LegalCategories>
    </>
  );
}
