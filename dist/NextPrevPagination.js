"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ComponentName = function (props) {
    var page = props.page, limit = props.limit, total = props.total;
    var currentPageLimit = page * limit;
    var isFirstPage = page === 1;
    var isLastPage = currentPageLimit >= total;
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
    return (React.createElement(React.Fragment, null, total !== 0 && renderNextPrevButton()));
};
exports.default = ComponentName;
