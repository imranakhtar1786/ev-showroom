"use client";

export default function HeroVideo() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <video
        className="block h-[505px] w-full object-cover md:h-[700px] lg:h-[800px]"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/banner-poster.webp"
      >
        <source
          src="/banner-mobile.mp4"
          media="(max-width: 767px)"
          type="video/mp4"
        />

        <source
          src="/banner.mp4"
          type="video/mp4"
        />
      </video>
    </section>
  );
}