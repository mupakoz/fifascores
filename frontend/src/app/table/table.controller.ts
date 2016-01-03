import Model = require('./table.model')
import Services = require('./table.service')

export interface ITableScope extends ng.IScope {
    vm: TableController;
    tableData: Model.PlayerTableRowDTO[];
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
    }
}
