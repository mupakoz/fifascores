import Model = require('./scores.model')
import Services = require('./scores.service')

export interface IScoresScope extends ng.IScope {
    data: Model.MatchScoreDTO[];
    fields: Model.TableField[];
    tableParams: any;
    firstNameTest: string;
    vm: ScoresController;
}

export class ScoresController {

    public tableParams:any;

    public static $inject = [
        '$scope',
        'ngTableParams',
        'ScoresService',
        '$location'
    ];

    constructor(private $scope:IScoresScope,
                private ngTableParams:any,
                private scoresService:Services.ScoresService,
                private $location:ng.ILocationService) {
        $scope.vm = this;
        var that = this;

        this.reloadScores(this);
    }

    public addScore():void {
        this.$location.path('/scores/add');
    }

    public reloadScores(that: ScoresController): void {
        that.scoresService.getAllScores().success(function (data) {
            that.$scope.data = data;

            that.tableParams = new that.ngTableParams({
                count: 50
            }, {
                data: that.$scope.data
            });
        }).error(function () {
            console.log('Error when receiving data!');
        });
    }

    public delete(id: string): void {
        var that = this;
        var deleteScorePromise = this.scoresService.delete(id);
        deleteScorePromise.success(function (data, status, headers, config) {
            console.log('Score deleted!');
            that.reloadScores(that);
        }).error(function (data, status, headers, config) {
            console.log('Error when deleting score!');
        });
    }
}
