/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HomeController } from './home/home.controller';
import { PlayersController } from './players/players.controller';
import { ScoresController } from './scores/scores.controller';
import { AddScoreController } from './scores/add/addScore.controller';
import { ScoresService } from './scores/scores.service';

declare var moment:moment.MomentStatic;


'use strict';

export var frontend:ng.IModule = angular.module('frontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'toastr', 'ngTable'])
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController)
    .controller('HomeController', HomeController)
    .controller('ScoresController', ScoresController)
    .controller('PlayersController', PlayersController)
    .controller('AddScoreController', AddScoreController)
    .service('ScoresService', ScoresService);

