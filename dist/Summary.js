"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ComponentName = function (props) {
    var page = props.page, limit = props.limit, total = props.total;
    var currentPageIndex = (page - 1) * limit === 0 ? 1 : (page - 1) * limit;
    var currentPageLimit = page * limit;
    var currentPageItemCount = currentPageLimit > total ? (currentPageIndex - 1) + (total - (page * limit)) + limit : currentPageLimit;
    var renderSummary = function () {
        if (props.render) {
            return props.render(currentPageIndex, currentPageItemCount, total);
        }
        else {
            return currentPageIndex + " to " + currentPageItemCount + " of " + total;
        }
    };
    return (React.createElement(React.Fragment, null, total !== 0 && renderSummary()));
};
exports.default = ComponentName;
