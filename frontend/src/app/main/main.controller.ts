export interface IMainScope extends ng.IScope {
  messageFromBackend: string;
}

export class MainController {

  public static $inject = [
    '$scope',
    '$resource'
  ];

  constructor(
    private $scope: IMainScope,
    private $resource: ng.resource.IResourceService
  ) {
    $resource('/api/hello').get(function(response){
      $scope.messageFromBackend = response.hello;
    });
  }

}
