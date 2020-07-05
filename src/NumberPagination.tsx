import * as React from 'react';

interface IPaginationPropType {
    page: number,
    limit: number,
    total: number,
    onPageChange(e: number): any,
    renderSummary?(start: number, end: number, total: number): any,

    showSummary: boolean,
    showNumbers: boolean,

    firstButtonActiveCSS?: string,
    firstButtonDisableCSS?: string,
    firstButtonText?: string,
    lastButtonActiveCSS?: string,
    lastButtonDisableCSS?: string,
    lastButtonText?: string,

    pageButtonCSS?: string,
    activePageButtonCSS?: string,
}

const ComponentName = (props: IPaginationPropType) => {
    const { page, limit, total } = props;

    const currentPageIndex = (page - 1) * limit === 0 ? 1 : (page - 1) * limit;
    const currentPageLimit = page * limit;
    const currentPageItemCount = currentPageLimit > total ? (currentPageIndex - 1) + (total - (page * limit)) + limit : currentPageLimit;

    const isFirstPage = page === 1;
    const isLastPage = currentPageLimit >= total;
    const totalPage = Math.ceil(total / limit);

    const firstCSS = isFirstPage ? props.firstButtonDisableCSS : props.firstButtonActiveCSS;
    const lastCSS = isLastPage ? props.lastButtonDisableCSS : props.lastButtonActiveCSS;
    const pageButtonCSS = props.pageButtonCSS ? props.pageButtonCSS : ''
    const activePageButtonCSS = props.activePageButtonCSS ? props.activePageButtonCSS : ''

    const renderNumbers = () => {
        const numberArr = [];
        const pageDiff = page - 3;
        const pageSum = page + (3 - 1);
        if (pageDiff <= 0) {
            for (let i = 1; i <= 5; i++) {
                numberArr.push(i);
            }
        } else if (pageDiff > 0 && pageSum < totalPage) {
            for (let i = 1; i <= 5; i++) {
                numberArr.push(i + pageDiff);
            }
        } else if (pageDiff > 0 && pageSum >= totalPage) {
            for (let i = (totalPage + 1 - 5); i <= totalPage; i++) {
                numberArr.push(i);
            }
        }

        return (
            <React.Fragment>
                <button className={firstCSS} disabled={isFirstPage} onClick={() => isFirstPage ? undefined : props.onPageChange(1)}>First</button>
                {
                    numberArr.map((item: any, index: number) => {
                        const cssClass = item === page ? activePageButtonCSS : pageButtonCSS;
                        return (
                            <button onClick={() => props.onPageChange(item)} disabled={item === page} className={cssClass} key={index}>{item}</button>
                        )
                    })
                }
                <button className={lastCSS} disabled={isLastPage} onClick={() => isLastPage ? undefined : props.onPageChange(totalPage)}>Last</button>
            </React.Fragment>
        )
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
                    props.showNumbers && renderNumbers()
                }
            </div>
        </div >
    )
}

export default ComponentName;