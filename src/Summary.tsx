import * as React from 'react';

interface IPaginationPropType {
    page: number,
    limit: number,
    total: number,
    render?(start: number, end: number, total: number): any,
}

const ComponentName = (props: IPaginationPropType) => {
    const { page, limit, total } = props;

    const currentPageIndex = (page - 1) * limit === 0 ? 1 : (page - 1) * limit;
    const currentPageLimit = page * limit;
    const currentPageItemCount = currentPageLimit > total ? (currentPageIndex - 1) + (total - (page * limit)) + limit : currentPageLimit;

    const renderSummary = () => {
        if (props.render) {
            return props.render(currentPageIndex, currentPageItemCount, total);
        } else {
            return `${currentPageIndex} to ${currentPageItemCount} of ${total}`;
        }
    }

    return (
        <React.Fragment>
            {
                total !== 0 && renderSummary()
            }
        </React.Fragment>
    )
}

export default ComponentName;