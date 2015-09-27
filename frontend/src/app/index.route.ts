/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
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
      });

  $urlRouterProvider.otherwise('/');
}
