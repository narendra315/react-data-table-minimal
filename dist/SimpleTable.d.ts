import * as React from 'react';
interface ITablePropType {
    tableCSS?: string;
    trHeadCSS?: string;
    tdHeadCSS?: string;
    trBodyCSS?: string;
    tdBodyCSS?: string;
    renderAscCaretIcon?(): any;
    renderDescCaretIcon?(): any;
    columns: [];
    data: [];
    sortBy?: string;
    sortOrder?: string;
    noDataMessage?: string;
    showLoader?: boolean;
    renderLoader?(): any;
    selected?: [];
    onSelection?(items: any): any;
}
declare class ComponentName extends React.Component<ITablePropType, any> {
    constructor(props: any);
    static getDerivedStateFromProps(props: any, state: any): {
        data: any;
        selectedArrKey?: undefined;
        dataUpdatedFromProps?: undefined;
    } | {
        selectedArrKey: any;
        dataUpdatedFromProps: boolean;
        data?: undefined;
    };
    render(): JSX.Element;
    renderChildTD: (item: any, pIndex: number) => any;
    processData: () => any;
    sortData: (e: any) => void;
    compareValues: (key: any, order?: string) => (a: any, b: any) => number;
    onSelection: (e: any) => void;
    onSelectAll: (e: any) => void;
    exportSelection: (key: string) => void;
}
export default ComponentName;
