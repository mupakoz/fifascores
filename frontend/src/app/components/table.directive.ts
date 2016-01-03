export class PaginationLabel {
    text: string;
}

export interface IMyScope extends ng.IScope
{
    name: string;
    query: any;
    selectedRow: any;
    paginationLabel: PaginationLabel;
}

export function TableDirective():ng.IDirective {
    return {
        templateUrl: '/app/components/table.directive.html',
        scope: {
            tableData: '='
        },
        link: (scope:IMyScope) => {
            scope.name = 'Aaron';

            scope.query = {
                filter: '',
                order: '-pointsPerGame',
                limit: 10,
                page: 1
            };

            scope.selectedRow = [];

            scope.paginationLabel = { text: 'Wierszy na stron?:' };
        }
    };
}