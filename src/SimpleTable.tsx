import * as React from 'react';

const CONST = {
    sortOrder: { ascending: 'asc', descending: 'desc' },
    control: { checkbox: 'checkbox', radio: 'radio' }
}

interface ITablePropType {
    tableCSS?: string,
    trHeadCSS?: string,
    tdHeadCSS?: string,
    trBodyCSS?: string,
    tdBodyCSS?: string,

    renderAscCaretIcon?(): any,
    renderDescCaretIcon?(): any,

    columns: [],
    data: [],

    sortBy?: string,
    sortOrder?: string,

    noDataMessage?: string,
    showLoader?: boolean,
    renderLoader?(): any,

    selected?: [],
    onSelection?(items: any): any
}

class ComponentName extends React.Component<ITablePropType, any> {
    constructor(props: any) {
        super(props);
        const { sortBy, sortOrder, columns } = props;
        this.state = {
            sortBy: sortBy,
            sortOrder: sortOrder,
            selectedArrKey: [],
            dataUpdatedFromProps: false,
            data: props.data,
            columns: columns
        }
    }

    static getDerivedStateFromProps(props: any, state: any) {
        if (JSON.stringify(props.data) !== JSON.stringify(state.data)) {
            return { data: props.data }
        }
        if (props.selected && props.selected.length > 0 && state.dataUpdatedFromProps === false) {
            const { selected } = props;
            const { columns } = state;
            const keyArr = columns.filter((i: any) => i.checkbox === true || i.radio === true);
            if (keyArr.length > 0) {
                const key = keyArr[0].name;
                const selectedArrKey = selected.map((i: any) => String(i[key]));
                return {
                    selectedArrKey,
                    dataUpdatedFromProps: true
                };
            } else {
                return null;
            }
        }

        return null;
    }

    render() {
        const { tableCSS, trHeadCSS, tdHeadCSS, trBodyCSS, tdBodyCSS } = this.props;
        const { noDataMessage, showLoader, renderLoader } = this.props;
        const { renderAscCaretIcon, renderDescCaretIcon } = this.props;
        const { sortBy, sortOrder, columns } = this.state;
        let processedData = this.processData();
        return (
            <table className={tableCSS}>
                <thead>
                    <tr className={trHeadCSS}>
                        {
                            columns.map((item: any, index: number) => {
                                return (
                                    <th key={index} onClick={item.sort ? this.sortData : undefined} data-name={item.name} className={tdHeadCSS ? tdHeadCSS : ""} style={item.sort ? { cursor: 'pointer' } : {}}>
                                        {
                                            item.checkbox ?
                                                <React.Fragment>
                                                    <input type="checkbox" data-key={item.name} onClick={this.onSelectAll} />
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    {item.label}
                                                    {
                                                        item.sort ?
                                                            item.name === sortBy ? (sortOrder === CONST.sortOrder.ascending ? renderAscCaretIcon ? renderAscCaretIcon() : <span style={{ marginLeft: '0.2rem' }}>&#8593;</span> : renderDescCaretIcon ? renderDescCaretIcon() : <span style={{ marginLeft: '0.2rem' }}>&#8595;</span>) : null
                                                            : null
                                                    }
                                                </React.Fragment>
                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        showLoader && renderLoader === undefined && <td colSpan={columns.length} style={{ textAlign: "center" }}>
                            Loading...
                        </td>
                    }
                    {
                        showLoader && renderLoader && renderLoader()
                    }
                    {
                        processedData.map((item: any, index: number) => {
                            return (
                                <tr key={index} className={trBodyCSS}>
                                    {this.renderChildTD(item, index)}
                                </tr>
                            )
                        })
                    }
                    {
                        (showLoader === false || showLoader === undefined)
                        && (processedData !== undefined || processedData !== null)
                        && processedData.length === 0
                        && <td colSpan={columns.length} style={{ textAlign: 'center' }}>{noDataMessage ? noDataMessage : 'No records found'}</td>
                    }
                </tbody>
            </table >
        )
    }

    renderChildTD = (item: any, pIndex: number) => {
        const { tdBodyCSS } = this.props;
        const { columns, selectedArrKey } = this.state;
        return columns.map((col: any, index: number) => {
            const checkbox = col.checkbox;
            const radio = col.radio;
            const data = item[col.name];
            const renderFunction = col.render;

            if (data && (checkbox === undefined || checkbox === false || checkbox === null) && (radio === undefined || radio === false || radio === null)) {
                if (renderFunction) {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>{renderFunction(item, pIndex)}</td>
                } else {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>{data}</td>
                }
            } else if (data && checkbox) {
                const checked = selectedArrKey.indexOf(String(data)) > -1;
                return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}><input onClick={this.onSelection} type="checkbox" value={data} data-key={col.name} checked={checked} /></td>
            } else if (data && radio) {
                const checked = selectedArrKey.indexOf(String(data)) > -1;
                return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}><input onClick={this.onSelection} type="radio" name="dt-radio" value={data} data-key={col.name} checked={checked} /></td>
            } else {
                // let the user handle the data of this column on his own
                if (renderFunction) {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>{renderFunction(item, pIndex)}</td>
                } else {
                    return <td className={tdBodyCSS ? tdBodyCSS : ""} key={index}>-</td>
                }
            }
        })
    }

    processData = () => {
        const { columns, noDataMessage, showLoader, renderLoader } = this.props;
        const { data, sortBy, sortOrder } = this.state;
        let processedData = data.sort(this.compareValues(sortBy, sortOrder));
        return processedData;
    }

    sortData = (e: any) => {
        const { sortBy, sortOrder } = this.state;
        const name = e.target.dataset.name;
        let orderBy = CONST.sortOrder.ascending;
        if (name === sortBy) {
            orderBy = sortOrder === CONST.sortOrder.ascending ? CONST.sortOrder.descending : CONST.sortOrder.ascending;
        }
        this.setState({ sortBy: name, sortOrder: orderBy });
    }

    compareValues = (key: any, order = CONST.sortOrder.ascending) => {
        return (a: any, b: any) => {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === CONST.sortOrder.descending) ? (comparison * -1) : comparison
            );
        };
    }

    onSelection = (e: any) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
        const checked = e.target.checked;
        const type = e.target.type;

        if (type === CONST.control.radio) {
            const selectedArrKey: any = [];
            selectedArrKey.push(value);
            this.setState({ selectedArrKey, dataUpdatedFromProps: true }, () => {
                this.exportSelection(key)
            });
        } else {
            const selectedArrKey = JSON.parse(JSON.stringify(this.state.selectedArrKey));
            if (checked) {
                selectedArrKey.push(value);
            } else {
                const index = selectedArrKey.indexOf(value);
                selectedArrKey.splice(index, 1);
            }
            this.setState({ selectedArrKey, dataUpdatedFromProps: true }, () => {
                this.exportSelection(key)
            });
        }
    }

    onSelectAll = (e: any) => {
        const checked = e.target.checked;
        const key = e.target.dataset.key;
        let selectedArrKey: any = [];
        if (checked) {
            selectedArrKey = this.processData().map((i: any) => String(i[key]));
        }
        this.setState({ selectedArrKey: selectedArrKey, dataUpdatedFromProps: true }, () => {
            this.exportSelection(key)
        });
    }

    exportSelection = (key: string) => {
        const { selectedArrKey } = this.state;
        const items = this.processData().filter((i: any) => {
            const index = selectedArrKey.indexOf(String(i[key]))
            return index > -1;
        })
        this.props.onSelection && this.props.onSelection(items);
    }
}

export default ComponentName;