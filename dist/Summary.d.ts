/// <reference types="react" />
interface IPaginationPropType {
    page: number;
    limit: number;
    total: number;
    render?(start: number, end: number, total: number): any;
}
declare const ComponentName: (props: IPaginationPropType) => JSX.Element;
export default ComponentName;
