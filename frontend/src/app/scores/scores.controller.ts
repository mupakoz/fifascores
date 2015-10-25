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

        $scope.data = scoresService.getAllScores();

        this.tableParams = new ngTableParams({
            count: 50
        }, {
            data: $scope.data
        });
    }

    public addScore(): void {
        this.$location.path('/scores/add');
    }
}
