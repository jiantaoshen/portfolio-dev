import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://YOUR-VERCEL-DOMAIN.vercel.app";

const staticRoutes = [
  "/",
  "/about",
  "/projects",
  "/blog",
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function loadJson(relativePath) {
  const filePath = path.resolve(__dirname, "..", relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const projects = loadJson("src/data/projects.json");
const posts = loadJson("src/data/blog.json");

const projectRoutes = projects.map(
  (project) => `/projects/${project.slug ?? project.id}`
);

const blogRoutes = posts.map(
  (post) => `/blog/${post.slug ?? post.id}`
);

const routes = [
  ...staticRoutes,
  ...projectRoutes,
  ...blogRoutes,
];

const urls = routes
  .map(
    (route) => `  <url>
    <loc>${escapeXml(`${BASE_URL}${route}`)}</loc>
  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outputPath = path.resolve(
  __dirname,
  "..",
  "public",
  "sitemap.xml"
);

fs.writeFileSync(outputPath, sitemap, "utf8");

console.log(`Generated sitemap with ${routes.length} URLs.`);