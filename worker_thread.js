const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    const worker = new Worker(__filename);
    worker.on("message", () => {
      res.send("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast");
  });

  app.listen(3000);
} else {
  // Worker thread
  const start = Date.now();
  while (Date.now() - start < 5000) {} // Simulate CPU work
  parentPort.postMessage("done");
}
