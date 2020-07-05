import * as React from 'react';

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

const ComponentName = (props: IPaginationPropType) => {
    const { page, limit, total } = props;

    const currentPageIndex = (page - 1) * limit === 0 ? 1 : (page - 1) * limit;
    const currentPageLimit = page * limit;
    const currentPageItemCount = currentPageLimit > total ? (currentPageIndex - 1) + (total - (page * limit)) + limit : currentPageLimit;

    const isFirstPage = page === 1;
    const isLastPage = currentPageLimit >= total;
    const totalPage = Math.ceil(total / limit);

    const prevCSS = isFirstPage ? props.previousButtonDisableCSS : props.previousButtonActiveCSS;
    const nextCSS = isLastPage ? props.nextButtonDisableCSS : props.nextButtonActiveCSS;

    const renderNextPrevButton = () => {
        const renderPaging = () => {
            return (
                <React.Fragment>
                    <button disabled={isFirstPage} className={prevCSS} onClick={() => isFirstPage ? undefined : props.onPageChange(page - 1)}>{props.previousButtonText ? props.previousButtonText : 'Previous'}</button>
                    <button disabled={isLastPage} className={nextCSS} onClick={() => isLastPage ? undefined : props.onPageChange(page + 1)}>{props.nextButtonText ? props.nextButtonText : 'Next'}</button>
                </React.Fragment>
            )
        }

        // if we are on first page and total items in list are less than limit then dont render pagination
        // else render the usual
        if (page === 1 && isLastPage) {
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

        return renderSummaryNested();
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