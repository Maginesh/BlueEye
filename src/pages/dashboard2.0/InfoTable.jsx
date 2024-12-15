'use strict';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import React, { useMemo, useState } from 'react';
import "./infotable.css"
import axios from 'axios';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const InfoTable = ({ data }) => {

    const sampleFunction = async (pass) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/call', {pass});
            console.log('API response:', res.data.message);
          } catch (error) {
            console.error('Error calling Twilio API:', error);
          }
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
        if (params.getValue("aid") && params.getValue("bid")) {
            return `Anomaly detected in water level and Low battery for ${params.getValue("id")}`
        } 
        else if (params.getValue("aid")) {
            return `Anomaly detected in water level for ${params.getValue("id")}`
        } 
        else if (params.getValue("bid")) {
            return `Low battery level for ${params.getValue("id")}`
        } 
        return "";
    };

    const [columnDefs, setColumnDefs] = useState([
        { field: 'dwlr_id', colId: "id", filter: 'agNumberColumnFilter', sortable: true },
        { field: 'state' },
        { field: 'district' },
        { field: 'block_name' },
        { field: 'village_name' },
        { field: 'site_name' },
        { field: 'latitude' },
        { field: 'longitude' },
        { field: 'well_site_type' },
        { field: 'water_level', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'battery_level', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'timestamp' },
        { field: 'anomaly', colId: "aid"},
        { field: 'battery_result', colId: "bid" },
        {
            field: 'notify',
            valueGetter: idGetter,
            cellRenderer: NotificationButtonRenderer,
        },
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
            style={{ height: 500 }}
        >
            <AgGridReact
                rowData={data}
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