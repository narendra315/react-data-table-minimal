/// <reference types="react" />
interface IPaginationPropType {
    page: number;
    limit: number;
    total: number;
    onPageChange(e: number): any;
    renderSummary?(start: number, end: number, total: number): any;
    showSummary: boolean;
    showNumbers: boolean;
    firstButtonActiveCSS?: string;
    firstButtonDisableCSS?: string;
    firstButtonText?: string;
    lastButtonActiveCSS?: string;
    lastButtonDisableCSS?: string;
    lastButtonText?: string;
    pageButtonCSS?: string;
    activePageButtonCSS?: string;
}
declare const ComponentName: (props: IPaginationPropType) => JSX.Element;
export default ComponentName;
