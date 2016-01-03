import Model = require('./profile.model')
import Services = require('./profile.service')

export interface IProfileScope extends ng.IScope {
    vm: ProfileController;
    playerName: string;
    barData: any;
    options: any;
    data: Model.ProfileDTO;
}

export class ProfileController {
    public static $inject = [
        '$scope',
        'ProfileService',
        '$stateParams'
    ];

    constructor(private $scope:IProfileScope,
                private profileService: Services.ProfileService,
                private $stateParams) {
        $scope.vm = this;
        var that: ProfileController = this;

        $scope.playerName = $stateParams.playerName;

        profileService.getProfile($scope.playerName).success(function (data: Model.ProfileDTO) {
            that.$scope.data = data;
            that.$scope.data.chartData = that.convertPointsToChart(data.pointsTable);
        });
    }

    public convertPointsToChart(pointsTable:Model.ProfileChartPointDTO[]): Model.ChartData {
        return {
            labels: _.map(pointsTable, function (p: Model.ProfileChartPointDTO) {
                var date = new Date(p.date);
                var day = date.getDate();
                var monthIndex = date.getMonth()+1;
                var year = date.getFullYear()-2000;
                return day+"-"+monthIndex+"-"+year;
            }),
            series: [
                _.map(pointsTable, function (p: Model.ProfileChartPointDTO) { return p.points})
            ]
        }
    }
}
