import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { JSDOM, VirtualConsole } from "jsdom";

// Load the actual HTML and compiled script, without writing to the shared database.
for (const file of ["../index.html", "../dist/index.html"]) {
  const errors = [];
  const console = new VirtualConsole();
  console.on("jsdomError", (error) => errors.push(error.message));
  const dom = await JSDOM.fromFile(fileURLToPath(new URL(file, import.meta.url)), {
    runScripts: "dangerously",
    resources: "usable",
    virtualConsole: console,
    beforeParse(window) {
      window.fetch = async () => ({
        ok: true,
        json: async () => ({
          now: Date.now(),
          hubs: [1, 2, 3].map((hub) => ({ hub, count: 0, lastSeq: null, lastAt: null })),
        }),
      });
    },
  });
  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Page loading timed out")), 5000);
      dom.window.addEventListener("load", () => { clearTimeout(timeout); resolve(); }, { once: true });
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.deepEqual(errors, []);
    assert.equal(dom.window.document.querySelector("h1")?.textContent, "Une entrée. Un hub.");
    assert.equal(dom.window.document.querySelectorAll(".card").length, 3);
    assert.ok(dom.window.document.querySelector(".connection.ok"), "The snapshot must load");
  } finally {
    dom.window.close();
  }
}
console.log("Static pages OK: root and dist HTML load the compiled app and all three hubs.");
