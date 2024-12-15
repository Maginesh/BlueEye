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
    console.log(data)
    const [msg, setMsg] = useState('');
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
        let result = `Anomaly Detected in ${params.getValue("id")} are `
        let p = 0
        if (params.getValue("aid")) {
            result += "Water Level Anomaly"
            p++;
        } 
        if (params.getValue("bid")) {
            result += "Battery Level Anomaly"
            p++;
        } 
        if (params.getValue("did")) {
            result += "DWLR Depth Anomaly"
            p++;
        } 
        if (params.getValue("wid")) {
            result += "Well Depth Anomaly"
            p++;
        } 
        if(p > 0)
            return result
        return ''
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
        { field: 'water_temperature' },
        { field: 'water_level', filter: 'agNumberColumnFilter', sortable: true },
        { field: 'dwlr_depth' },
        { field: 'well_depth' },
        { field: 'water_level_anomaly', colId: "aid"},
        { field: 'battery_level_anomaly', colId: "bid" },
        { field: 'dwlr_depth_anomaly', colId: "did" },
        { field: 'well_depth_anomaly', colId: "wid" },
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