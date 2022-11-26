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

const run = async (context, toolkit, patterns) => {
  const branchName = await getBranchName(context);
  const currentRelease = await getCurrentReleaseTag(toolkit, context);
  return calculateNextVersion(currentRelease, branchName, patterns);
}

module.exports = {
  getBranchName,
  getCurrentReleaseTag,
  calculateNextVersion,
  run
};
