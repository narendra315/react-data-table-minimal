# react-data-table-minimal

A clean and minimal Data table for React. 

### Features

1. Set custom header names
2. Render the content in the cell the way you want
3. Sorting table data by sorting data in columns.
4. Override the default styling with your CSS.
5. Custom Pagination implementation.
6. Selection of row using checkbox and radio button.

### Live Demo

https://stackblitz.com/edit/react-fa4qtm

### Install

[![npm](https://img.shields.io/npm/dm/react-data-table-minimal.svg)](https://www.npmjs.com/package/react-data-table-minimal)

https://www.npmjs.com/package/react-data-table-minimal

Through npm
 `npm install react-data-table-minimal --save`

### Example Usage

``` jsx
import DataTable, { Summary, NextPrevPagination, NumberPagination } from 'react-data-table-minimal';

this.state = {
    page:1, 
    limit:10
};

const columns = [{
            name: 'id',
            label: '',
            checkbox: true
        },
        {
            name: 'id',
            label: 'Radio',
            radio: true
        },
        {
            name: 'id',
            label: 'Product ID',
            sort: true
        }, {
            name: 'name',
            label: 'Product Name',
            sort: true
        }, {
            name: 'price',
            label: 'Price',
            sort: true,
            render: function (item: any) {
                return ( `$${item}` )
            }
        }];

const products = [
            { id: 'P001', name: 'Company 1 Headphone', price: 3000 },
            { id: 'P002', name: 'Company 2 Headphone', price: 7000 },
            { id: 'P003', name: 'Company 3 Headphone', price: 6000 },
            { id: 'P004', name: 'Company 4 Headphone', price: 5000 },
            { id: 'P005', name: 'Company 5 Headphone', price: 4000 },
            { id: 'P006', name: 'Company 6 Headphone', price: 3000 },
            { id: 'P007', name: 'Company 7 Headphone', price: 1000 },
            { id: 'P008', name: 'Company 8 Headphone', price: 1000 },
            { id: 'P009', name: 'Company 9 Headphone', price: 1500 },
            { id: 'P0010', name: 'Company 10 Headphone', price: 3500 },
            { id: 'P0011', name: 'Company 11 Headphone', price: 7900 },
            { id: 'P0012', name: 'Company 12 Headphone', price: 8900 }         
];

<DataTable
    tableCSS="w-100 table"
    trHeadCSS="bg-primary"
    trBodyCSS="bg-light"
    renderAscCaretIcon={() => { return (<span>Up</span>) }}
    renderDescCaretIcon={() => { return (<span>Down</span>) }}
    data={products}
    columns={columns}
    sortBy="id"
    sortOrder="asc"
    page={page}
    limit={limit}
    showLoader={true}
    renderLoader={()=>{ return (<span>Loading...</span>) }}
/>

<Summary
    page={page}
    limit={limit}
    total={products.length}
    render={(start, end, total) => {
        return (
        <React.Fragment>
            { `Showing ${start} to ${end} records of ${total} records` }
        </React.Fragment>
        )
    }}
/>

<NextPrevPagination
    page={page}
    limit={limit}
    total={products.length}
    onPageChange={this.onPageChange}

    previousButtonActiveCSS="btn btn-primary btn-active"
    previousButtonDisableCSS="btn btn-primary disabled"
    previousButtonText="Previous"

    nextButtonActiveCSS="btn btn-primary btn-active"
    nextButtonDisableCSS="btn btn-primary disabled"
    nextButtonText="Next"
/>

<NumberPagination
    page={page}
    limit={limit}
    total={products.length}
    onPageChange={this.onPageChange}

    firstButtonActiveCSS="btn btn-primary btn-active"
    firstButtonDisableCSS="btn btn-primary disabled"
    firstButtonText="First"
    
    lastButtonActiveCSS="btn btn-primary btn-active"
    lastButtonDisableCSS="btn btn-primary disabled"
    lastButtonText="Last"

    pageButtonCSS="btn"
    activePageButtonCSS="btn btn-active"
/>
```

### Data Table Column Props

|   Name    |   Optional   |   Data type   |   Description |
|-----------|---------------|---------------|---------------|
| name      |   NO         | string    |name of the attribute from the data being binded|
| label      |   YES         | string    |label for the column header|
| sort      |   YES         | boolean    |allows you to implement the sorting on the column|
| checkbox      |   YES         | boolean    |allows you to add checkbox to the row|
| radio      |   YES         | boolean   |allows you to add radio button to the row|

### Data Table Props

|   Name    |   Optional   |   Data type   |   Description |
|-----------|---------------|---------------|---------------|
| data      |   No         | Array[obj]    |Array of object|
| columns   |   No         | Array[obj]    |Array of object which define the attributes of a table column|
| noDataMessage|   Yes         | string        |Message to be shown when no records are found|
| page      |   Yes         | number        |current page number|
| limit     |   Yes         | number        |Array of object|
| sortBy    |   Yes         | string        |key on which default sorting is to be applied|
| sortOrder |   Yes         | string        |sort order of default sorting "asc" or "desc"|
| renderAscCaretIcon() |   Yes         | method        |override the ascending icon used for sorting in header|
| renderDescCaretIcon() |   Yes         | method        |override the descending icon used for sorting in header|
| tableCSS |   Yes         | string        |override the styling of the table with this|
| trHeadCSS |   Yes         | string        |override the styling of the tr in thead with this|
| tdHeadCSS |   Yes         | string        |override the styling of the td in thead with this|
| trBodyCSS |   Yes         | string        |override the styling of the tr in tbody with this|
| tdBodyCSS |   Yes         | string        |override the styling of the td in tbody with this|
| showLoader |   Yes         | boolean        |setting it to true shows you the default loading message|
| renderLoader() |   Yes         | method        |override the default rendering of loader|
| onSelection() |   Yes         | method        |returns the selection item of the table|
| selected |   Yes         | Array[obj]        |Array of object for which you want to keep the checkbox checked.

### Summary Props

|   Name    |   Optional   |   Data type   |   Description |
|-----------|---------------|---------------|---------------|
| page      |   No         | number        |current page number. ex: 1|
| limit     |   No         | number        |limit or page size. ex: 10|
| total     |   No         | number        |total no of records found. ex:145|
| render   |   Yes         | method    | method to override the default rendering of summary. ex. render=(start, end, total)=>{return(...)}|

### NextPrevPagination Props

|   Name    |   Optional   |   Data type   |   Description |
|-----------|---------------|---------------|---------------|
| page      |   No         | number        |current page number. ex: 1|
| limit     |   No         | number        |limit or page size. ex: 10|
| total     |   No         | number        |total no of records found. ex:145|
| onPageChange   |   No         | method    | method to override when the page no gets changed. ex. onPageChange(pageNo)|
| previousButtonText |   Yes         | string        |Text to be used on the the previous button|
| previousButtonActiveCSS |   Yes         | string        |css to use when the button is active|
| previousButtonDisableCSS |   Yes         | string        |css to use when the button is disabled|
| nextButtonText |   Yes         | string        |Text to be used on the the next button|
| nextButtonActiveCSS |   Yes         | string        |css to use when the button is active|
| nextButtonDisableCSS |   Yes         | string        |css to use when the button is disabled|

### NumberPagination Props

|   Name    |   Optional   |   Data type   |   Description |
|-----------|---------------|---------------|---------------|
| page      |   No         | number        |current page number. ex: 1|
| limit     |   No         | number        |limit or page size. ex: 10|
| total     |   No         | number        |total no of records found. ex:145|
| onPageChange   |   No         | method    | method to override when the page no gets changed. ex. onPageChange(pageNo)|
| firstButtonText |   Yes         | string        |Text to be used on the the first button|
| firstButtonActiveCSS |   Yes         | string        |css to use when the button is active|
| firstButtonDisableCSS |   Yes         | string        |css to use when the button is disabled|
| lastButtonText |   Yes         | string        |Text to be used on the the last button|
| lastButtonActiveCSS |   Yes         | string        |css to use when the button is active|
| lastButtonDisableCSS |   Yes         | string        |css to use when the button is disabled|
| pageButtonCSS |   Yes         | string        |css to use on the number buttons|
| activePageButtonCSS |   Yes         | string        |css to use on the number button which is active|
