# npm
# History of package-lock.json
```
Kat Marchán
twitter
githubSep 3 '19
Hi! I wrote npm ci and I'm also the one who added package-lock.json to NPM back in the day.

The story about package.json vs package-lock.json is tricky: npm install does not ignore package.json versions, nor does it ignore the package-lock.json. What it does is verify that the package.json and package-lock.json correspond to each other. That is, if the semver versions described in package.json fit with the locked versions in package-lock.json, npm install will use the latter completely, just like npm ci would.

Now, ff you change package.json such that the versions in package-lock.json are no longer valid, your npm install will be treated as if you'd done npm install some-pkg@x.y.z, where x.y.z is the new version in the package.json for some-package.

This was done intentionally because, after early feedback in npm@5, we realized that one of the ways people edited their dependencies was by editing package.json directly, and it became a bit of a usability nightmare to treat package-lock.json as canonical in those cases. It was a trade-off between two competing worlds, and the current behavior won out.

This is why npm ci was born: because the behavior for npm install was actually what people wanted, in practice (when they actually ran into the behavior), and npm ci had a nice ring to it anyway (it was eventually backronymed to clean-install for this reason).

Hope this helps! Nice article! 👍🏼
```

## Semantic version
https://docs.npmjs.com/cli/v6/configuring-npm/package-json

```
version Must match version exactly
>version Must be greater than version
>=version etc
<version
<=version
~version "Approximately equivalent to version" See semver
^version "Compatible with version" See semver
1.2.x 1.2.0, 1.2.1, etc., but not 1.3.0
http://... See 'URLs as Dependencies' below
* Matches any version
"" (just an empty string) Same as *
version1 - version2 Same as >=version1 <=version2.
range1 || range2 Passes if either range1 or range2 are satisfied.
git... See 'Git URLs as Dependencies' below
user/repo See 'GitHub URLs' below
tag A specific version tagged and published as tag See npm dist-tag
path/path/path See Local Paths below
```
## Audit
### npm audit
> npm audit fix --force

### npm-check-updates
-u updates package.json
> npx npm-check-updates -u

### Update package to latest
> npm update ini --depth 6

> npm install webpack-cli@latest

### Discover outdated packages
> npm outdated

# Yarn
Yarn does not have a function like “npm audit --fix”.

## npx yarn-audit-fix
Automates the process under.
> npm i --package-lock-only

This creates a temp package-lock.json you can perform fix operation on.
```
rm yarn.lock
yarn import
rm package-lock.json
```

