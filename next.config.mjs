/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vaafywjwzjsepzgrvuwf.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // Oude Engelstalige URL's bestaan niet meer; 301 naar de homepage zodat
      // eventueel geindexeerde /en-pagina's hun autoriteit doorgeven i.p.v. 404'en.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/", permanent: true },
      // De blog 'drie-redenen' gaat op in de pillar (zelfde drie signalen).
      // 301 zodat de opgebouwde autoriteit meeverhuist i.p.v. te 404'en.
      {
        source: "/blog/drie-redenen-om-je-site-opnieuw-te-laten-bouwen",
        destination: "/blog/bedrijf-gegroeid-website-niet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
