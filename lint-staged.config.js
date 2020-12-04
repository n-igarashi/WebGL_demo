module.exports = {
  '**/*.{js,vue}': (filenames) => {
    const escapedFileNames = filenames
      .map((name) => name.replace(/\\/g, '\\/'))
      .join(' ')
    return [`eslint --fix ${escapedFileNames}`, `git add ${escapedFileNames}`]
  },
  '**/*.{scss,vue}': (filenames) => {
    const escapedFileNames = filenames
      .map((name) => name.replace(/\\/g, '/'))
      .join(' ')
    return [
      `prettier --write ${escapedFileNames}`,
      `stylelint --fix ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ]
  },
  '**/*.json': (filenames) => {
    const escapedFileNames = filenames
      .map((name) => name.replace(/\\/g, '/'))
      .join(' ')
    return [
      `prettier --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ]
  },
}
