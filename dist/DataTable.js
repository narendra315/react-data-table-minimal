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
    sortOrder: { ascending: 'asc', descending: 'desc' },
    control: { checkbox: 'checkbox', radio: 'radio' }
};
var ComponentName = (function (_super) {
    __extends(ComponentName, _super);
    function ComponentName(props) {
        var _this = _super.call(this, props) || this;
        _this.renderChildTD = function (item, pIndex) {
            var _a = _this.props, columns = _a.columns, tdBodyCSS = _a.tdBodyCSS;
            var selectedArrKey = _this.state.selectedArrKey;
            return columns.map(function (col, index) {
                var checkbox = col.checkbox;
                var radio = col.radio;
                var data = item[col.name];
                var renderFunction = col.render;
                if (data && (checkbox === undefined || checkbox === false || checkbox === null) && (radio === undefined || radio === false || radio === null)) {
                    if (renderFunction) {
                        return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index }, renderFunction(item, pIndex));
                    }
                    else {
                        return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index }, data);
                    }
                }
                else if (data && checkbox) {
                    var checked = selectedArrKey.indexOf(String(data)) > -1;
                    return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index },
                        React.createElement("input", { onClick: _this.onSelection, type: "checkbox", value: data, "data-key": col.name, checked: checked }));
                }
                else if (data && radio) {
                    var checked = selectedArrKey.indexOf(String(data)) > -1;
                    return React.createElement("td", { className: tdBodyCSS ? tdBodyCSS : "", key: index },
                        React.createElement("input", { onClick: _this.onSelection, type: "radio", name: "dt-radio", value: data, "data-key": col.name, checked: checked }));
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
        _this.processData = function () {
            var _a = _this.props, columns = _a.columns, data = _a.data, page = _a.page, limit = _a.limit, noDataMessage = _a.noDataMessage, showLoader = _a.showLoader, renderLoader = _a.renderLoader;
            var _b = _this.state, sortBy = _b.sortBy, sortOrder = _b.sortOrder;
            var processedData = [];
            var sortedData = data.sort(_this.compareValues(sortBy, sortOrder));
            if (page && limit) {
                var from = (page - 1) * limit;
                var till = page * limit;
                processedData = sortedData.slice(from, till);
            }
            else {
                processedData = sortedData;
            }
            return processedData;
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
        _this.onSelection = function (e) {
            var key = e.target.dataset.key;
            var value = e.target.value;
            var checked = e.target.checked;
            var type = e.target.type;
            if (type === CONST.control.radio) {
                var selectedArrKey = [];
                selectedArrKey.push(value);
                _this.setState({ selectedArrKey: selectedArrKey }, function () {
                    _this.exportSelection(key);
                });
            }
            else {
                var selectedArrKey = JSON.parse(JSON.stringify(_this.state.selectedArrKey));
                if (checked) {
                    selectedArrKey.push(value);
                }
                else {
                    var index = selectedArrKey.indexOf(value);
                    selectedArrKey.splice(index, 1);
                }
                _this.setState({ selectedArrKey: selectedArrKey }, function () {
                    _this.exportSelection(key);
                });
            }
        };
        _this.onSelectAll = function (e) {
            var checked = e.target.checked;
            var key = e.target.dataset.key;
            var selectedArrKey = [];
            if (checked) {
                selectedArrKey = _this.processData().map(function (i) { return String(i[key]); });
            }
            _this.setState({ selectedArrKey: selectedArrKey }, function () {
                _this.exportSelection(key);
            });
        };
        _this.exportSelection = function (key) {
            var selectedArrKey = _this.state.selectedArrKey;
            var items = _this.processData().filter(function (i) {
                var index = selectedArrKey.indexOf(String(i[key]));
                return index > -1;
            });
            _this.props.onSelection && _this.props.onSelection(items);
        };
        var sortBy = props.sortBy, sortOrder = props.sortOrder;
        _this.state = {
            sortBy: sortBy,
            sortOrder: sortOrder,
            selectedArrKey: [],
        };
        return _this;
    }
    ComponentName.prototype.render = function () {
        var _this = this;
        var _a = this.props, tableCSS = _a.tableCSS, trHeadCSS = _a.trHeadCSS, tdHeadCSS = _a.tdHeadCSS, trBodyCSS = _a.trBodyCSS, tdBodyCSS = _a.tdBodyCSS;
        var _b = this.props, columns = _b.columns, data = _b.data, page = _b.page, limit = _b.limit, noDataMessage = _b.noDataMessage, showLoader = _b.showLoader, renderLoader = _b.renderLoader;
        var _c = this.props, renderAscCaretIcon = _c.renderAscCaretIcon, renderDescCaretIcon = _c.renderDescCaretIcon;
        var _d = this.state, sortBy = _d.sortBy, sortOrder = _d.sortOrder;
        var processedData = this.processData();
        return (React.createElement("table", { className: tableCSS },
            React.createElement("thead", null,
                React.createElement("tr", { className: trHeadCSS }, columns.map(function (item, index) {
                    return (React.createElement("th", { key: index, onClick: item.sort ? _this.sortData : undefined, "data-name": item.name, className: tdHeadCSS ? tdHeadCSS : "", style: item.sort ? { cursor: 'pointer' } : {} }, item.checkbox ?
                        React.createElement(React.Fragment, null,
                            React.createElement("input", { type: "checkbox", "data-key": item.name, onClick: _this.onSelectAll }))
                        :
                            React.createElement(React.Fragment, null,
                                item.label,
                                item.sort ?
                                    item.name === sortBy ? (sortOrder === CONST.sortOrder.ascending ? renderAscCaretIcon ? renderAscCaretIcon() : React.createElement("span", { style: { marginLeft: '0.2rem' } }, "\u2191") : renderDescCaretIcon ? renderDescCaretIcon() : React.createElement("span", { style: { marginLeft: '0.2rem' } }, "\u2193")) : null
                                    : null)));
                }))),
            React.createElement("tbody", null,
                showLoader && renderLoader === undefined && React.createElement("td", { colSpan: columns.length, style: { textAlign: "center" } }, "Loading..."),
                showLoader && renderLoader && renderLoader(),
                processedData.map(function (item, index) {
                    return (React.createElement("tr", { key: index, className: trBodyCSS }, _this.renderChildTD(item, index)));
                }),
                (showLoader === false || showLoader === undefined)
                    && (processedData !== undefined || processedData !== null)
                    && processedData.length === 0
                    && React.createElement("td", { colSpan: columns.length, style: { textAlign: 'center' } }, noDataMessage ? noDataMessage : 'No records found'))));
    };
    return ComponentName;
}(React.Component));
exports.default = ComponentName;
