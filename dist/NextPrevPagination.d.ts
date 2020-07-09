/// <reference types="react" />
interface IPaginationPropType {
    page: number;
    limit: number;
    total: number;
    onPageChange(e: number): any;
    previousButtonActiveCSS?: string;
    previousButtonDisableCSS?: string;
    previousButtonText?: string;
    nextButtonActiveCSS?: string;
    nextButtonDisableCSS?: string;
    nextButtonText?: string;
}
declare const ComponentName: (props: IPaginationPropType) => JSX.Element;
export default ComponentName;
