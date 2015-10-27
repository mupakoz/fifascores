/** @ngInject */
export function routerConfig($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('scores', {
            url: '/scores',
            templateUrl: 'app/scores/scores.html',
            controller: 'ScoresController',
            controllerAs: 'scores'
        })
        .state('players', {
            url: '/players',
            templateUrl: 'app/players/players.html',
            controller: 'PlayersController'
        })
        .state('addScore', {
            url: '/scores/add',
            templateUrl: 'app/scores/add/addScore.html',
            controller: 'AddScoreController'
        });

    $urlRouterProvider.otherwise('/');
}
