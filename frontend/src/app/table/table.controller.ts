import Model = require('./table.model')
import Services = require('./table.service')

export interface ITableScope extends ng.IScope {
    vm: TableController;
    tableData: Model.PlayerTableRowDTO[];
    pairsTableData: Model.PlayerTableRowDTO[];
    singlesMonthTableData: Model.PlayerTableRowDTO[];
}

export class TableController {
    public static $inject = [
        '$scope',
        'TableService'
    ];

    constructor(private $scope:ITableScope,
                private tableService:Services.TableService) {
        $scope.vm = this;

        tableService.getTableData().success(function (data) {
            $scope.tableData = data.playerRows;
        });

        tableService.getPairsTableData().success(function (data) {
            $scope.pairsTableData = data.playerRows;
        });

        tableService.getSinglesMonthTableData().success(function (data) {
            $scope.singlesMonthTableData = data.playerRows;
        });
    }
}
