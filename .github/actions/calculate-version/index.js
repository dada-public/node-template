const github = require("@actions/github");
const semver = require("semver");
const core = require("@actions/core");

const getBranchName = (context) => {
  const {ref} = context;
  return ref.split("/").slice(-1)[0];
}

const { context } = github;
const toolkit = github.getOctokit(core.getInput("token"));


( async () => {

  const release = await toolkit.rest.repos.listReleases({
    ...context.repo
  });

  core.startGroup("LOG")
  console.log(release.data.tag_name);
  core.endGroup();


})()
