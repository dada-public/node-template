const github = require("@actions/github");
const { run } = require("./src/utils");

(async () => {
  await run();
})()
