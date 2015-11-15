import Model = require('./table.model')
import Services = require('./table.service')

export interface ITableScope extends ng.IScope {
    vm: TableController;
    query: any;
    selectedRow: any;
    paginationLabel: string;
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

        $scope.tableData = tableService.getTableData().playerRows;

        $scope.query = {
            filter: '',
            order: '-points',
            limit: 10,
            page: 1
        };

        $scope.selectedRow = [];

        $scope.paginationLabel = { text: 'Wierszy na stronę:' };
    }
}
