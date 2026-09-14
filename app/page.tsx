import Hero from "@/components/home/hero";
import WelcomeVideo from "@/components/home/welcome-video";
import HorizontalMinistries from "@/components/home/horizontal-ministries";
import ExpressionHubs from "@/components/home/expression-hubs";
import UpcomingEvents from "@/components/home/upcoming-events";
import SermonPreview from "@/components/home/sermon-preview";
import BlogPreview from "@/components/home/blog-preview";
import PhotoExperience from "@/components/home/photo-experience";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeVideo />
      <HorizontalMinistries />
      <ExpressionHubs />
      <UpcomingEvents />
      <SermonPreview />
      <BlogPreview />
      <PhotoExperience />

      <section className="section-space">
        <div className="page-container">
          <div className="cinematic-line mb-10" />

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="meta mb-5 text-white/40">YOUR NEXT CHAPTER</p>

              <h2 className="section-heading max-w-4xl">
                COME AS YOU ARE.
                <br />
                <span className="text-white/45">LEAVE READY.</span>
              </h2>
            </div>

            <a
              href="#visit"
              className="meta inline-flex items-center gap-3 self-start rounded-full border border-white/15 px-6 py-4 transition hover:border-white/30 hover:bg-white/5 md:self-auto"
            >
              JOIN US
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
