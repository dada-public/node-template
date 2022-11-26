const github = require("@actions/github");
const semver = require("semver");

console.log(github.ref);

console.log(`semver MAJOR: ${semver.inc('1.2.3', 'major')}`);
console.log(`semver MINOR: ${semver.inc('1.2.3', 'minor')}`);
console.log(`semver PATCH: ${semver.inc('1.2.3', 'patch')}`);
