import { Loading } from "@/components/layout/loading";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Specialties } from "@/components/sections/specialties";
import { Location } from "@/components/sections/location";
import { HeroSection } from "@/components/sections/hero";

export default function HomePage() {
  console.log("Resend API Key:", process.env.RESEND_API_KEY);

  return (
    <>
      <Loading />

      <div className="relative z-10 min-h-screen">
        <HeroSection />

        <Portfolio />

        <Specialties />

        <Testimonials />

        {/* Location Section */}
        <Location />
      </div>
    </>
  );
}
