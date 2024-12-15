'use strict';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import "./infotable.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const StateTable = ({ state }) => {
    const [rowData, setRowData] = useState([]);

    const sampleFunction = (value) => {
        console.log(`Notification sent! to ${value}`);
    };

    const NotificationButtonRenderer = ({ value }) => (
        <span>
            {value && (
                <button className="notifybtn" onClick={() => sampleFunction(value)}>
                    <span className="notifybtn-content">Notify</span>
                </button>
            )}
        </span>
    );

    const [columnDefs, setColumnDefs] = useState([
        { field: 'dwlr_id', filter: 'agNumberColumnFilter', sortable: true },
        // { field: 'state' },
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
        { field: 'anomaly' },
        { field: 'battery_result' },
        {
            field: 'notify',
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

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getStateDetails', {
                    params: { state },
                });

                if (isMounted) {
                    const rawData = response.data;
                    setRowData(rawData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup to avoid memory leaks
        };
    }, [state]); // Fetch data 

    return (
        <div className={"ag-theme-quartz"} style={{ height: 500 }}>
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

export default StateTable;
