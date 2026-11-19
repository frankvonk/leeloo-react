import type { NextConfig } from "next";

// The webhost only serves static files + PHP, so we build a static export.
// `npm run build` writes the site to `out/`; upload its contents next to controller.php.
const nextConfig: NextConfig = {
  output: "export",
  // Production lives in a subfolder (https://www.frankvonk.be/l23/).
  // Dev keeps the root so localhost:3000 still works.
  basePath: process.env.NODE_ENV === "production" ? "/l23" : "",
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
