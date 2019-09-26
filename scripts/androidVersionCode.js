#!/usr/bin/env node

/* eslint no-console: 0 */

const run = () => {
  const semver = process.argv[2]

  if (!semver) {
    console.error('Usage example: androidVersionCode 1.2.3')
    process.exit(1)
  }

  const androidBuildVersion = generateAndroidVersionCode(semver)
  process.stdout.write(androidBuildVersion)
}

const generateAndroidVersionCode = (semver) => {
  const splittedVersion = semver.split('.')
  if (splittedVersion.length !== 3) {
    console.error(`Invalid semver ${semver}`)
    process.exit(1)
  }

  const [major, minor, patch] = splittedVersion

  const paddedMinor = padVersionPart(minor)
  const paddedPatch = padVersionPart(patch)

  return `${major}${paddedMinor}${paddedPatch}`
}

const padVersionPart = (versionPart) => {
  return `${versionPart}`.padStart(3, 0)
}

run()
