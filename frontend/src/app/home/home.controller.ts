export interface IHomeScope extends ng.IScope {
  messageFromBackend: string;
}

export class HomeController {



  public static $inject = [
    '$scope',
    '$resource'
  ];

  constructor(
    private $scope: IHomeScope,
    private $resource: ng.resource.IResourceService
  ) {
    $resource('/api/hello').get(function(response){
      $scope.messageFromBackend = response.hello;
    });
  }

}
