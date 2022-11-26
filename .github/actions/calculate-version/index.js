const github = require("@actions/github");
const core   = require("@actions/core");
const { run } = require("./src/utils");

( async () => {

  const token = core.getInput("token");
  const toolkit = github.getOctokit(token);
  const { context } = github;

  const patterns = {
    major: core.getInput("major-pattern"),
    minor: core.getInput("minor-pattern"),
    patch: core.getInput("patch-pattern")
  }

  const nextVersion = await run(context, toolkit, patterns);

  core.setOutput(nextVersion);

  console.log(nextVersion);

})()
