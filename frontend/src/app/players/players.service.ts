import Model = require('./players.model')

export class PlayersService {
    static $inject = ['$resource', '$http', '$location'];

    constructor(
                public $resource:ng.IResourceService,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService) {
    }

    public addPlayer(dto:Model.NewPlayerDTO):void {
        var that = this;
        this.$http({
            url: '/api/players',
            method: "POST",
            data: JSON.stringify(dto),
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            console.log('Player added!');
            that.$location.path('/players');
        }).error(function (data, status, headers, config) {
            console.log('Error when adding player!');
        });
    }

    public getAllPlayers() {
        return this.$http({
            url: '/api/players',
            method: "GET"
        })
    }
}
