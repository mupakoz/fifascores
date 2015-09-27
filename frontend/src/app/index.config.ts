/** @ngInject */
export function config($logProvider: ng.ILogProvider, toastrConfig: any, $mdThemingProvider: angular.material.IThemingProvider, $mdIconProvider: angular.material.IIconProvider) {
  // enable log
  $logProvider.debugEnabled(true);
  // set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

    $mdIconProvider
        .icon("menu"       , "./assets/svg/menu.svg"        , 24);

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
}
