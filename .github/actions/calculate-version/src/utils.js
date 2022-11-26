const semver = require("semver");

module.exports.getBranchName = (context) => {
  const {ref} = context;
  return ref.split("/").slice(-1)[0];
}

module.exports.getCurrentReleaseTag = async (toolkit, context) => {
  try {
    const response = await toolkit.rest.repos.getLatestRelease({
      ...context.repo
    });
    return response.data.tag_name;
  } catch (err) {
    return null;
  }
}

module.exports.calculateNextVersion = (current, branch, patterns) => {
  const {major, minor, patch} = patterns;

  const action = branch.includes(major)
                  ? "major"
                  : branch.includes(minor)
                  ? "minor"
                  : "patch";

  return !current ? "0.0.0" : semver.inc(current, action);
}
