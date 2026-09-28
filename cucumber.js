module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['step-definitions/**/*.ts', 'support/**/*.ts'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    publishQuiet: true,
  },
};