## Example Usage

``` jsx
import DataTable, { Pagination } from 'ns-data-table';

this.state = {
    page:1, 
    limit:10
};

const columns = [{
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
/>

<Pagination
    page={page}
    limit={limit}
    total={products.length}
    onPageChange={this.onPageChange}

    showSummary={true}
    showNextPrevButtons={true}

    previousButtonActiveCSS="btn btn-primary btn-active"
    previousButtonDisableCSS="btn btn-primary disabled"
    previousButtonText="Previous"

    nextButtonActiveCSS="btn btn-primary btn-active"
    nextButtonDisableCSS="btn btn-primary disabled"
    nextButtonText="Next"
/>
```
