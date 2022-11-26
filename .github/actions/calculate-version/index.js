const github = require("@actions/github");
const semver = require("semver");
const core = require("@actions/core");

const getBranchName = (context) => {
  const {ref} = context;
  return ref.split("/").slice(-1)[0];
}

const { context, repository } = github;
const toolkit = github.getOctokit(core.getInput("token"));



core.startGroup("LOG")

const test = toolkit.rest.repos.getLatestRelease({
  owner: context.actor,
  repo: context.payload.repository?.full_name
});

console.log(test);

core.endGroup();

console.log(getBranchName(context))
