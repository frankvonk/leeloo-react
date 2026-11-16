import type { NextConfig } from "next";

// The webhost only serves static files + PHP, so we build a static export.
// `npm run build` writes the site to `out/`; upload its contents next to controller.php.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
