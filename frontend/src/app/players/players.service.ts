import Model = require('./players.model')

export class PlayersService {
    static $inject = ['$resource', '$http', '$location'];

    constructor(
                public $resource:ng.IResourceService,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService) {
    }

    public addPlayer(dto:Model.NewPlayerDTO):ng.HttpPromise {
        var that = this;
        return this.$http({
            url: '/api/players',
            method: "POST",
            data: JSON.stringify(dto),
            headers: {'Content-Type': 'application/json'}
        });
    }

    public getAllPlayers() {
        return this.$http({
            url: '/api/players',
            method: "GET"
        });
    }

    public delete(id: string) {
        return this.$http({
            url: '/api/players/' + id,
            method: "DELETE"
        })
    }
}
