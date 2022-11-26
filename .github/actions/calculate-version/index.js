const github = require("@actions/github");
const semver = require("semver");
const core = require("@actions/core");

const getBranchName = (context) => {
  const {ref} = context;
  return ref.split("/").slice(-1)[0];
}

const getCurrentReleaseTag = async (toolkit, context) => {
  try {
    const response = await toolkit.rest.repos.getLatestRelease({
      ...context.repo
    });
    return response.data.tag_name;
  } catch (err) {
    return null;
  }
}

const calculateNextVersion = (current, branch, patterns) => {

}

( async () => {

  const token = core.getInput("token");
  const toolkit = github.getOctokit(token);
  const { context } = github;

  const patterns = {
    major: core.getInput("major-pattern"),
    minor: core.getInput("minor-pattern"),
    patch: core.getInput("patch-pattern");
  }

  const currentRelease = await getCurrentReleaseTag(toolkit, context);

  core.startGroup("LOG")
  console.log(currentRelease);
  console.log(patterns);
  core.endGroup();

})()
