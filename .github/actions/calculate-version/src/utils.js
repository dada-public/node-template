const core = require("@actions/core");
const github = require("@actions/github");
const semver = require("semver");

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
  const {major, minor, patch} = patterns;

  const action = branch.includes(major)
                  ? "major"
                  : branch.includes(minor)
                  ? "minor"
                  : "patch";

  return !current ? "0.0.0" : semver.inc(current, action);
}




const run = async () => {

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
  const nextVersion = calculateNextVersion(currentRelease, branchName, patterns);

  core.setOutput("semver", nextVersion);
}

module.exports = {
  getBranchName,
  getCurrentReleaseTag,
  calculateNextVersion,
  run
};
