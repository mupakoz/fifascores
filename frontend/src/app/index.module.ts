/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HomeController } from './home/home.controller';
import { ScoresController } from './scores/scores.controller';

declare var moment: moment.MomentStatic;

module frontend {
  'use strict';

  angular.module('frontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'toastr'])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController)
    .controller('HomeController', HomeController)
    .controller('ScoresController', ScoresController);
}
