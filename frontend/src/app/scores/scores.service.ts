import Model = require('./scores.model')

export class ScoresService {
    static $inject = ['$resource', '$http', '$location', 'Notification'];

    constructor(// Add the parameter and type definition.
                public $resource:ng.IResourceService,
                public $http:ng.IHttpService,
                public $location:ng.ILocationService,
                public Notification:any) {
    }

    public addScore(dto:Model.AddScoreFormData):void {
        var that = this;
        this.$http({
            url: '/api/scores/add',
            method: "POST",
            data: JSON.stringify(dto),
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            console.log('Score added!');
            that.Notification.success('Wynik został dodany!');
            that.$location.path('/scores');
        }).error(function (data, status, headers, config) {
            console.log('Error when adding score!');
        });
    }

    public delete(id: string) {
        return this.$http({
            url: '/api/scores/' + id,
            method: "DELETE"
        })
    }

    public
    getAllScores() {
        return this.$http({
            url: '/api/scores',
            method: "GET"
        })
    }
}
