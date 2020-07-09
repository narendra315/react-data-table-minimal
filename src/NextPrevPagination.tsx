import * as React from 'react';

interface IPaginationPropType {
    page: number,
    limit: number,
    total: number,
    onPageChange(e: number): any,

    previousButtonActiveCSS?: string,
    previousButtonDisableCSS?: string,
    previousButtonText?: string,
    nextButtonActiveCSS?: string,
    nextButtonDisableCSS?: string,
    nextButtonText?: string,
}

const ComponentName = (props: IPaginationPropType) => {
    const { page, limit, total } = props;

    const currentPageLimit = page * limit;

    const isFirstPage = page === 1;
    const isLastPage = currentPageLimit >= total;

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

    return (
        <React.Fragment>
            {
                total !== 0 && renderNextPrevButton()
            }
        </React.Fragment>
    )
}

export default ComponentName;