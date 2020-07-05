"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ComponentName = function (props) {
    var page = props.page, limit = props.limit, total = props.total;
    var currentPageIndex = (page - 1) * limit === 0 ? 1 : (page - 1) * limit;
    var currentPageLimit = page * limit;
    var currentPageItemCount = currentPageLimit > total ? (currentPageIndex - 1) + (total - (page * limit)) + limit : currentPageLimit;
    var isFirstPage = page === 1;
    var isLastPage = currentPageLimit >= total;
    var totalPage = Math.ceil(total / limit);
    var prevCSS = isFirstPage ? props.previousButtonDisableCSS : props.previousButtonActiveCSS;
    var nextCSS = isLastPage ? props.nextButtonDisableCSS : props.nextButtonActiveCSS;
    var renderNextPrevButton = function () {
        var renderPaging = function () {
            return (React.createElement(React.Fragment, null,
                React.createElement("button", { disabled: isFirstPage, className: prevCSS, onClick: function () { return isFirstPage ? undefined : props.onPageChange(page - 1); } }, props.previousButtonText ? props.previousButtonText : 'Previous'),
                React.createElement("button", { disabled: isLastPage, className: nextCSS, onClick: function () { return isLastPage ? undefined : props.onPageChange(page + 1); } }, props.nextButtonText ? props.nextButtonText : 'Next')));
        };
        if (page === 1 && isLastPage) {
            return null;
        }
        else {
            return renderPaging();
        }
    };
    var renderSummary = function () {
        var renderSummaryNested = function () {
            if (props.renderSummary) {
                props.renderSummary(currentPageIndex, currentPageItemCount, total);
            }
            else {
                return currentPageIndex + " to " + currentPageItemCount + " of " + total;
            }
        };
        return renderSummaryNested();
    };
    return (React.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement("div", null, props.showSummary && renderSummary()),
        React.createElement("div", null, props.showNextPrevButtons && renderNextPrevButton())));
};
exports.default = ComponentName;
