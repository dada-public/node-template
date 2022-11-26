const github = require("@actions/github");
const semver = require("semver");
const core = require("@actions/core");

const getBranchName = (context) => {
  const {ref} = context;
  return ref.split("/").slice(-1);

}

core.startGroup("LOG")
console.log(github);
core.endGroup();

console.log(getBranchName(github.context))
