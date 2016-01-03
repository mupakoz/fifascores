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
        })
        .state('table', {
            url: '/table',
            templateUrl: 'app/table/table.html',
            controller: 'TableController'
        })
        .state('profile', {
            url: '/profile/:playerName',
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController'
        });;

    $urlRouterProvider.otherwise('/scores');
}
