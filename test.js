var angularJsdoc = require('./index.js');

angularJsdoc('sample-codes', {
  configure: 'common/test_conf.json',
  template: 'default',
  destination: 'default/docs',
  readme: "sample-codes/README.md"
});

