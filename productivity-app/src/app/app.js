require("babel-polyfill");



require('assets/less/main.less');

require('./pages/reports/index');
require('./pages/settings/index');
require('./pages/tasks-list/index');
require('./pages/timer/index');

require('./firebase')
require('./router');