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
}
declare class ComponentName extends React.Component<ITablePropType, any> {
    constructor(props: any);
    render(): JSX.Element;
    renderChildTD: (item: any, pIndex: number) => JSX.Element[];
    sortData: (e: any) => void;
    compareValues: (key: any, order?: string) => (a: any, b: any) => number;
}
interface IPaginationPropType {
    page: number;
    limit: number;
    total: number;
    onPageChange(e: number): any;
    renderSummary?(start: number, end: number, total: number): any;
    showSummary: boolean;
    showNextPrevButtons: boolean;
    previousButtonActiveCSS?: string;
    previousButtonDisableCSS?: string;
    previousButtonText?: string;
    nextButtonActiveCSS?: string;
    nextButtonDisableCSS?: string;
    nextButtonText?: string;
}
export declare const Pagination: (props: IPaginationPropType) => JSX.Element;
export default ComponentName;
