export interface IPlayersScope extends ng.IScope {

}

export class PlayersController {
  public static $inject = [
    '$scope'
  ];

  constructor(
    private $scope: IPlayersScope
  ) {
  }
}
