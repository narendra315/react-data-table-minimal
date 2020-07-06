"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CONST = {
    sortOrder: { ascending: 'asc', descending: 'desc' }
};
var ComponentName = (function (_super) {
    __extends(ComponentName, _super);
    function ComponentName(props) {
        var _this = _super.call(this, props) || this;
        _this.renderChildTD = function (item, pIndex) {
            var _a = _this.props, columns = _a.columns, tdBodyCSS = _a.tdBodyCSS;
            return columns.map(function (col, index) {
                var data = item[col.name];
                var renderFunction = col.render;
                if (data) {
                    if (renderFunction) {
                        return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index }, renderFunction(item, pIndex));
                    }
                    else {
                        return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index }, data);
                    }
                }
                else {
                    if (renderFunction) {
                        return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index }, renderFunction(item, pIndex));
                    }
                    else {
                        return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index }, "-");
                    }
                }
            });
        };
        _this.sortData = function (e) {
            var _a = _this.state, sortBy = _a.sortBy, sortOrder = _a.sortOrder;
            var name = e.target.dataset.name;
            var orderBy = CONST.sortOrder.ascending;
            if (name === sortBy) {
                orderBy = sortOrder === CONST.sortOrder.ascending ? CONST.sortOrder.descending : CONST.sortOrder.ascending;
            }
            _this.setState({ sortBy: name, sortOrder: orderBy });
        };
        _this.compareValues = function (key, order) {
            if (order === void 0) { order = CONST.sortOrder.ascending; }
            return function (a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    return 0;
                }
                var varA = (typeof a[key] === 'string')
                    ? a[key].toUpperCase() : a[key];
                var varB = (typeof b[key] === 'string')
                    ? b[key].toUpperCase() : b[key];
                var comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                }
                else if (varA < varB) {
                    comparison = -1;
                }
                return ((order === CONST.sortOrder.descending) ? (comparison * -1) : comparison);
            };
        };
        var sortBy = props.sortBy, sortOrder = props.sortOrder;
        _this.state = {
            sortBy: sortBy,
            sortOrder: sortOrder
        };
        return _this;
    }
    ComponentName.prototype.render = function () {
        var _this = this;
        var _a = this.props, tableCSS = _a.tableCSS, trHeadCSS = _a.trHeadCSS, tdHeadCSS = _a.tdHeadCSS, trBodyCSS = _a.trBodyCSS, tdBodyCSS = _a.tdBodyCSS;
        var _b = this.props, columns = _b.columns, data = _b.data, page = _b.page, limit = _b.limit, noDataMessage = _b.noDataMessage;
        var _c = this.props, renderAscCaretIcon = _c.renderAscCaretIcon, renderDescCaretIcon = _c.renderDescCaretIcon;
        var _d = this.state, sortBy = _d.sortBy, sortOrder = _d.sortOrder;
        var processedData = [];
        var sortedData = data.sort(this.compareValues(sortBy, sortOrder));
        if (page && limit) {
            var from = (page - 1) * limit;
            var till = page * limit;
            processedData = sortedData.slice(from, till);
        }
        else {
            processedData = sortedData;
        }
        return (React.createElement("table", { className: tableCSS },
            React.createElement("thead", null,
                React.createElement("tr", { className: trHeadCSS }, columns.map(function (item, index) {
                    return (React.createElement("th", { key: index, onClick: item.sort ? _this.sortData : undefined, "data-name": item.name, className: tdHeadCSS ? tdHeadCSS : "", style: item.sort ? { cursor: 'pointer' } : {} },
                        item.label,
                        item.sort ?
                            item.name === sortBy ? (sortOrder === CONST.sortOrder.ascending ? renderAscCaretIcon ? renderAscCaretIcon() : React.createElement("span", { style: { marginLeft: '0.2rem' } }, "\u2191") : renderDescCaretIcon ? renderDescCaretIcon() : React.createElement("span", { style: { marginLeft: '0.2rem' } }, "\u2193")) : null
                            : null));
                }))),
            React.createElement("tbody", null,
                processedData.map(function (item, index) {
                    return (React.createElement("tr", { key: index, className: trBodyCSS }, _this.renderChildTD(item, index)));
                }),
                (processedData !== undefined || processedData !== null) && processedData.length === 0 && React.createElement("td", { colSpan: columns.length, style: { textAlign: 'center' } }, noDataMessage ? noDataMessage : 'No records found'))));
    };
    return ComponentName;
}(React.Component));
exports.default = ComponentName;
