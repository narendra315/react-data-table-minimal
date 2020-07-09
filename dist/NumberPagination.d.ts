/// <reference types="react" />
interface IPaginationPropType {
    page: number;
    limit: number;
    total: number;
    onPageChange(e: number): any;
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
