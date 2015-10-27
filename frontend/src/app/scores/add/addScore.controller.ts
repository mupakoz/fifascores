import Model = require('./../scores.model')
import Services = require('./../scores.service')

export interface IAddScoreScope extends ng.IScope {
    vm: AddScoreController;
    formData: Model.AddScoreFormData;
}

export class AddScoreController {

    public tableParams:any;

    public static $inject = [
        '$scope',
        'ScoresService',
        '$location'
    ];

    constructor(private $scope:IAddScoreScope,
                private scoresService:Services.ScoresService,
                private $location:ng.ILocationService) {
        $scope.vm = this;
        $scope.formData = {
            date: new Date()
        };
    }

    addScore():void {
        this.scoresService.addScore(this.$scope.formData);
    }
}
