/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { HomeController } from './home/home.controller';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { ScoresController } from './scores/scores.controller';
import { AddScoreController } from './scores/add/addScore.controller';
import { ScoresService } from './scores/scores.service';
import { TableController } from './table/table.controller';
import { TableService } from './table/table.service';
import { TableDirective } from './components/table.directive';

declare var moment:moment.MomentStatic;


'use strict';

export var frontend:ng.IModule = angular.module('frontend',
    ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages',
        'ngAria', 'ngResource', 'ui.router', 'ngMaterial', 'toastr', 'md.data.table', 'ui-notification', 'angular-chartist'])
    .constant('moment', moment)
    .constant('_', _)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('MainController', MainController)
    .controller('HomeController', HomeController)
    .controller('PlayersController', PlayersController)
    .service('PlayersService', PlayersService)
    .controller('ScoresController', ScoresController)
    .controller('AddScoreController', AddScoreController)
    .service('ScoresService', ScoresService)
    .controller('TableController', TableController)
    .service('TableService', TableService)
    .directive('tableDirective', TableDirective);

