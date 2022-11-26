const github = require("@actions/github");
const semver = require("semver");
const core = require("@actions/core");

const getBranchName = (context) => {
  const {ref} = context;
  return ref.split("/").slice(-1)[0];
}

const getCurrentRelease = async (toolkit, context) => {
  const response = await toolkit.rest.repos.getLatestRelease({
    ...context.repo
  });
  return response.data.length === 0 ? '0.0.0' : response.data.tag_name;
}

( async () => {
  const token = core.getInput("token");
  const toolkit = github.getOctokit(token);
  const { context } = github;

  const currentRelease = await getCurrentRelease(toolkit, context);

  core.startGroup("LOG")
  console.log(currentRelease);
  core.endGroup();

})()
