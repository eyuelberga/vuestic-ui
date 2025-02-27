module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'no-empty-source': null,
    'font-family-no-missing-generic-family-keyword': null,
    'block-no-empty': null,
    'no-descending-specificity': null,
    'color-hex-length': 'long',
    'color-hex-case': 'lower',
    'at-rule-no-unknown': null,
    'indentation': [ 2, { baseIndentLevel: 1 } ],
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["deep"]
    }]
  },
}
