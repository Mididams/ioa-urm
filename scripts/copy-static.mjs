import { copyFile, cp } from "node:fs/promises";

// Keep the directly opened page and the deployable folder on the same build.
const root = new URL("../", import.meta.url);
await copyFile(new URL("dist/app.js", root), new URL("app.js", root));
for (const file of ["index.html", "style.css"]) {
  await copyFile(new URL(file, root), new URL(`dist/${file}`, root));
}
await cp(new URL("documents/", root), new URL("dist/documents/", root), { recursive: true });
