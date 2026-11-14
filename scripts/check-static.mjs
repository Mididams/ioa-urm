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
      window.fetch = async (url) => String(url).includes("/hub_events?") ? {
        ok: true, headers: { get: () => "*/0" }, json: async () => [],
      } : ({
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
    // React effects may run after load; wait for the mocked snapshot and hourly read.
    const deadline = Date.now() + 5000;
    while (Date.now() < deadline) {
      const hourly = [...dom.window.document.querySelectorAll(".hourly strong")];
      if (dom.window.document.querySelector(".connection.ok") &&
          hourly.length === 3 && hourly.every(e => e.textContent === "0")) break;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    assert.deepEqual(errors, []);
    assert.equal(dom.window.document.querySelector("h1")?.textContent, "Une entrée. Un hub.");
    assert.equal(dom.window.document.querySelectorAll(".card").length, 3);
    assert.equal(dom.window.document.querySelectorAll(".reset-one").length, 0);
    assert.equal(dom.window.document.querySelectorAll(".reset-all").length, 1);
    assert.ok(dom.window.document.querySelector(".connection.ok"), "The snapshot must load");
    assert.deepEqual([...dom.window.document.querySelectorAll(".hourly strong")].map(e => e.textContent), ["0", "0", "0"]);
  } finally {
    dom.window.close();
  }
}
console.log("Static pages OK: root and dist HTML load the compiled app and all three hubs.");
