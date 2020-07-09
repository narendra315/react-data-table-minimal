"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ComponentName = function (props) {
    var page = props.page, limit = props.limit, total = props.total;
    var currentPageLimit = page * limit;
    var isFirstPage = page === 1;
    var isLastPage = currentPageLimit >= total;
    var totalPage = Math.ceil(total / limit);
    var firstCSS = isFirstPage ? props.firstButtonDisableCSS : props.firstButtonActiveCSS;
    var lastCSS = isLastPage ? props.lastButtonDisableCSS : props.lastButtonActiveCSS;
    var pageButtonCSS = props.pageButtonCSS ? props.pageButtonCSS : '';
    var activePageButtonCSS = props.activePageButtonCSS ? props.activePageButtonCSS : '';
    var renderNumbers = function () {
        var numberArr = [];
        var pageDiff = page - 3;
        var pageSum = page + (3 - 1);
        if (pageDiff <= 0) {
            for (var i = 1; i <= 5; i++) {
                numberArr.push(i);
            }
        }
        else if (pageDiff > 0 && pageSum < totalPage) {
            for (var i = 1; i <= 5; i++) {
                numberArr.push(i + pageDiff);
            }
        }
        else if (pageDiff > 0 && pageSum >= totalPage) {
            for (var i = (totalPage + 1 - 5); i <= totalPage; i++) {
                numberArr.push(i);
            }
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { className: firstCSS, disabled: isFirstPage, onClick: function () { return isFirstPage ? undefined : props.onPageChange(1); } }, "First"),
            numberArr.map(function (item, index) {
                var cssClass = item === page ? activePageButtonCSS : pageButtonCSS;
                return (React.createElement("button", { onClick: function () { return props.onPageChange(item); }, disabled: item === page, className: cssClass, key: index }, item));
            }),
            React.createElement("button", { className: lastCSS, disabled: isLastPage, onClick: function () { return isLastPage ? undefined : props.onPageChange(totalPage); } }, "Last")));
    };
    return (React.createElement(React.Fragment, null, total !== 0 && renderNumbers()));
};
exports.default = ComponentName;
