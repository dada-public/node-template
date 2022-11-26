const github = require("@actions/github");
const semver = require("semver");
const core = require("@actions/core");

core.startGroup("LOG")
console.log(github);
core.endGroup();
