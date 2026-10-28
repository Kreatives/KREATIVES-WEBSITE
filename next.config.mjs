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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Voorkomt dat de browser het content-type gaat raden (XSS via
          // geüploade bestanden) en dat de site in een iframe verdwijnt.
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // (De oude /en -> / redirects zijn verwijderd: /en is nu de Engelse site.)
      // De blog 'drie-redenen' gaat op in de pillar (zelfde drie signalen).
      // 301 zodat de opgebouwde autoriteit meeverhuist i.p.v. te 404'en.
      {
        source: "/blog/drie-redenen-om-je-site-opnieuw-te-laten-bouwen",
        destination: "/blog/bedrijf-gegroeid-website-niet",
        permanent: true,
      },
      // Logische URL's die de site zelf suggereert maar niet bestonden (404).
      { source: "/cases", destination: "/projecten", permanent: true },
      { source: "/kennisbank", destination: "/blog", permanent: true },
      { source: "/diensten/redesign", destination: "/diensten/webdesign", permanent: true },
    ];
  },
};

export default nextConfig;
