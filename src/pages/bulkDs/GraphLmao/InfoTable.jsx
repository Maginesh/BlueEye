'use strict';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import React, { useMemo, useState } from 'react';
import "./infotable.css"

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const InfoTable = ({ data }) => {
    const [rowData, setRowData] = useState(data);
    console.log(rowData)

    const sampleFunction = (value) => {
        console.log(`Notification sent! to ${value}`);
    };
    const NotificationButtonRenderer = ({ value }) => (
        <span>
            {value && ( <button class="notifybtn" onClick={() => sampleFunction(value)}>
                            <span class="notifybtn-content">Notify</span>
                        </button>
            )}
        </span>
    );
    const idGetter = ( params ) => {
        return params.getValue("id");
    };

    const [columnDefs, setColumnDefs] = useState([
        { field: 'telemetry_uid', colId: "id", filter: 'agNumberColumnFilter', sortable: true },
        { field: 'state' },
        { field: 'district' },
        { field: 'tahsil' },
        { field: 'block' },
        { field: 'village' },
        { field: 'latitude' },
        { field: 'longitude' },
        { field: 'timestamp' },
        { field: 'battery', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'water_temperature', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'water_level', filter: 'agNumberColumnFilter', sortable: true },
        // { field: 'anomaly' },
        // { field: 'battery_result' },
        // {
        //     field: 'notify',
        //     valueGetter: idGetter,
        //     cellRenderer: NotificationButtonRenderer,
        // },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',
            floatingFilter: true,
            sortable: true,
        };
    }, []);

    return (
        <div
            className={"ag-theme-quartz"}
            style={{ height: 500 , width: 1200}}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
            />
        </div>
    );
};

export default InfoTable;
