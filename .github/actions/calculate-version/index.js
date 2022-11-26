const github = require("@actions/github");
const core   = require("@actions/core");
const {
  getBranchName,
  getCurrentReleaseTag,
  calculateNextVersion
} = require("./src/utils");

( async () => {

  const token = core.getInput("token");
  const toolkit = github.getOctokit(token);
  const { context } = github;

  const patterns = {
    major: core.getInput("major-pattern"),
    minor: core.getInput("minor-pattern"),
    patch: core.getInput("patch-pattern")
  }

  const branchName = await getBranchName(context);
  const currentRelease = await getCurrentReleaseTag(toolkit, context);

  core.startGroup("LOG")
  console.log(currentRelease);
  console.log(patterns);
  const nextVersion = calculateNextVersion(currentRelease, branchName, patterns);
  console.log(`Next Version: ${nextVersion}`);
  core.endGroup();

})()
