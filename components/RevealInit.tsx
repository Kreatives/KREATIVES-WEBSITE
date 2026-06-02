"use client";

import { useEffect } from "react";

/**
 * Voegt .is-in toe aan elk [data-reveal] zodra het in beeld komt.
 * Gebruikt IntersectionObserver (geen GSAP-afhankelijkheid) zodat het
 * niet afhangt van de Lenis/ScrollTrigger-sync, en heeft een safety-net
 * timeout zodat content nooit onzichtbaar achterblijft als er iets misgaat.
 */
export default function RevealInit() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const all = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce || !("IntersectionObserver" in window)) {
      all().forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    all().forEach((el) => io.observe(el));

    // Safety net: forceer zichtbaarheid na 3.5s voor alles wat nog niet
    // getriggerd is. Voorkomt dat secties leeg blijven door scroll-issues.
    const safety = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
        .forEach((el) => el.classList.add("is-in"));
    }, 3500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return null;
}
