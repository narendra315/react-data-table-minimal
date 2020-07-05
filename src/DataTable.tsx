import * as React from 'react';

const CONST = {
    sortOrder: { ascending: 'asc', descending: 'desc' }
}

interface ITablePropType {
    tableCSS?: string,
    trHeadCSS?: string,
    tdHeadCSS?: string,
    trBodyCSS?: string,
    tdBodyCSS?: string,

    renderAscCaretIcon?(): any,
    renderDescCaretIcon?(): any,

    columns: [],
    data: [],

    sortBy?: string,
    sortOrder?: string,

    page?: number,
    limit?: number,

    noDataMessage?: string
}
class ComponentName extends React.Component<ITablePropType, any> {
    constructor(props: any) {
        super(props);
        const { sortBy, sortOrder } = props;
        this.state = {
            sortBy: sortBy,
            sortOrder: sortOrder
        }
    }

    render() {
        const { tableCSS, trHeadCSS, tdHeadCSS, trBodyCSS, tdBodyCSS } = this.props;
        const { columns, data, page, limit, noDataMessage } = this.props;
        const { renderAscCaretIcon, renderDescCaretIcon } = this.props;
        const { sortBy, sortOrder } = this.state;

        let processedData = [];
        const sortedData = data.sort(this.compareValues(sortBy, sortOrder));
        if (page && limit) {
            const from = (page - 1) * limit;
            const till = page * limit;
            processedData = sortedData.slice(from, till);
        } else {
            processedData = sortedData;
        }

        return (
            <table className={tableCSS}>
                <thead>
                    <tr className={trHeadCSS}>
                        {
                            columns.map((item: any, index: number) => {
                                return (
                                    <th key={index} onClick={item.sort ? this.sortData : undefined} data-name={item.name} className={tdHeadCSS ? tdHeadCSS : ""} style={item.sort ? { cursor: 'pointer' } : {}}>
                                        {item.label}
                                        {
                                            item.sort ?
                                                item.name === sortBy ? (sortOrder === CONST.sortOrder.ascending ? renderAscCaretIcon ? renderAscCaretIcon() : <span style={{ marginLeft: '0.2rem' }}>&#8593;</span> : renderDescCaretIcon ? renderDescCaretIcon() : <span style={{ marginLeft: '0.2rem' }}>&#8595;</span>) : null
                                                : null
                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        processedData.map((item: any, index: number) => {
                            return (
                                <tr key={index} className={trBodyCSS}>
                                    {this.renderChildTD(item, index)}
                                </tr>
                            )
                        })
                    }
                    {
                        noDataMessage && (processedData !== undefined || processedData !== null) && processedData.length === 0 && <td colSpan={columns.length} style={{ textAlign: 'center' }}>{noDataMessage ? noDataMessage : ''}</td>
                    }
                </tbody>
            </table >
        )
    }

    renderChildTD = (item: any, pIndex: number) => {
        const { columns, tdBodyCSS } = this.props;
        return columns.map((col: any, index: number) => {
            const data = item[col.name];
            const renderFunction = col.render;
            if (data) {
                if (renderFunction) {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>{renderFunction(item, pIndex)}</td>
                } else {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>{data}</td>
                }
            } else {
                // let the user handle the data of this column on his own
                if (renderFunction) {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>{renderFunction(item, pIndex)}</td>
                } else {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>-</td>
                }
            }
        })
    }

    sortData = (e: any) => {
        const { sortBy, sortOrder } = this.state;
        const name = e.target.dataset.name;
        let orderBy = CONST.sortOrder.ascending;
        if (name === sortBy) {
            orderBy = sortOrder === CONST.sortOrder.ascending ? CONST.sortOrder.descending : CONST.sortOrder.ascending;
        }
        this.setState({ sortBy: name, sortOrder: orderBy });
    }

    compareValues = (key: any, order = CONST.sortOrder.ascending) => {
        return (a: any, b: any) => {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === CONST.sortOrder.descending) ? (comparison * -1) : comparison
            );
        };
    }
}

interface IPaginationPropType {
    page: number,
    limit: number,
    total: number,
    onPageChange(e: number): any,
    renderSummary?(start: number, end: number, total: number): any,

    showSummary: boolean,
    showNextPrevButtons: boolean,

    previousButtonActiveCSS?: string,
    previousButtonDisableCSS?: string,
    previousButtonText?: string,
    nextButtonActiveCSS?: string,
    nextButtonDisableCSS?: string,
    nextButtonText?: string,
}
export const Pagination = (props: IPaginationPropType) => {
    const { page, limit, total } = props;

    const currentPageIndex = (page - 1) * limit === 0 ? 1 : (page - 1) * limit;
    const currentPageLimit = page * limit;
    const currentPageItemCount = currentPageLimit > total ? currentPageIndex + (total - (page * limit)) + limit : currentPageLimit;

    const isFirstPage = page === 1;
    const isLastPage = currentPageLimit >= total;

    const prevCSS = isFirstPage ? props.previousButtonDisableCSS : props.previousButtonActiveCSS;
    const nextCSS = isLastPage ? props.nextButtonDisableCSS : props.nextButtonActiveCSS;



    const renderNextPrevButton = () => {
        const renderPaging = () => {
            return (
                <React.Fragment>
                    <button className={prevCSS} onClick={() => isFirstPage ? undefined : props.onPageChange(page - 1)}>{props.previousButtonText}</button>
                    <button className={nextCSS} onClick={() => isLastPage ? undefined : props.onPageChange(page + 1)}>{props.nextButtonText}</button>
                </React.Fragment>
            )
        }

        // if we are on first page and total items in list are less than limit then dont render pagination
        // else render the usual
        if (page === 1 && currentPageItemCount <= limit) {
            return null;
        } else {
            return renderPaging();
        }

    }

    const renderSummary = () => {
        const renderSummaryNested = () => {
            if (props.renderSummary) {
                props.renderSummary(currentPageIndex, currentPageItemCount, total);
            } else {
                return `${currentPageIndex} to ${currentPageItemCount} of ${total}`;
            }
        }

        // if we are on first page and total items in list are less than limit then dont render summary
        // else render the usual
        if (page === 1 && currentPageItemCount <= limit) {
            return null;
        } else {
            return renderSummaryNested();
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                {
                    props.showSummary && renderSummary()
                }
            </div>
            <div>
                {
                    props.showNextPrevButtons && renderNextPrevButton()
                }
            </div>
        </div >
    )
}

export default ComponentName;