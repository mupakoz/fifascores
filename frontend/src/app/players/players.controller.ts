import Model = require('./players.model')
import Services = require('./players.service')

export interface IPlayersScope extends ng.IScope {
    newPlayer: Model.NewPlayerDTO;
    players: Model.PlayerDTO[];
    vm: PlayersController;
}

export class PlayersController {
    public static $inject = [
        '$scope',
        'PlayersService'
    ];

    constructor(private $scope:IPlayersScope,
    private playersService: Services.PlayersService) {
        $scope.vm = this;
        var that: PlayersController = this;


        this.reloadPlayers(that);
    }

    private reloadPlayers(that) {
        that.playersService.getAllPlayers().success(function (data) {
            that.$scope.players = data;
        }).error(function () {
            console.log('Error when receiving data!');
        });
    }

    addPlayer() {
        var that = this;
        var addPlayerPromise = this.playersService.addPlayer(this.$scope.newPlayer);
        addPlayerPromise.success(function (data, status, headers, config) {
            console.log('Player added!');
            that.reloadPlayers(that);
            that.$scope.newPlayer = new Model.NewPlayerDTO();
        }).error(function (data, status, headers, config) {
            console.log('Error when adding player!');
        });
    }

    delete(id: string) {
        var that = this;
        var addPlayerPromise = this.playersService.delete(id);
        addPlayerPromise.success(function (data, status, headers, config) {
            console.log('Player deleted!');
            that.reloadPlayers(that);
        }).error(function (data, status, headers, config) {
            console.log('Error when deleting player!');
        });
    }
}
