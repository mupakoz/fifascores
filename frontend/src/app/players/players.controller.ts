import Model = require('./players.model')
import Services = require('./players.service')

export interface IPlayersScope extends ng.IScope {
    newPlayer: Model.NewPlayerDTO;
    players: Model.PlayerDTO[];
}

export class PlayersController {
    public static $inject = [
        '$scope',
        'PlayersService'
    ];

    constructor(private $scope:IPlayersScope,
    private playersService: Services.PlayersService) {
        var that: PlayersController = this;

        playersService.getAllPlayers().success(function (data) {
            that.$scope.players = data;
        }).error(function () {
            console.log('Error when receiving data!');
        });
    }
}
