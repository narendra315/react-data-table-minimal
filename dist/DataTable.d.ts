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
    page?: number;
    limit?: number;
    noDataMessage?: string;
    showLoader?: boolean;
    renderLoader?(): any;
}
declare class ComponentName extends React.Component<ITablePropType, any> {
    constructor(props: any);
    render(): JSX.Element;
    renderChildTD: (item: any, pIndex: number) => JSX.Element[];
    sortData: (e: any) => void;
    compareValues: (key: any, order?: string) => (a: any, b: any) => number;
}
export default ComponentName;
