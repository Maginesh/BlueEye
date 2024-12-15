import React from "react";

function Card({ telemetry_uid, water_level, DWLR_depth, well_depth, Notify }) {
  return (
    <div className="w-full px-6 py-6 mt-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-center w-16 h-16 mx-auto text-white bg-gray-600 rounded-full shadow-md">
          <svg
            width="24"
            height="24"
            fill="currentColor"
            className="w-8 h-8"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white sm:text-lg">
        Telemetry ID: {telemetry_uid}
      </h3>
      <div className="space-y-2 mt-4">
        <p className="text-white text-md">Water Level: <span className="font-bold">{water_level}m</span></p>
        <p className="text-white text-md">DWLR Depth: <span className="font-bold">{DWLR_depth}m</span></p>
        <p className="text-white text-md">Well Depth: <span className="font-bold">{well_depth}m</span></p>
        <p
          className={`text-md font-semibold ${
            Notify === "TRUE" ? "text-green-400" : "text-red-400"
          }`}
        >
          Notify: <span className="capitalize">{Notify}</span>
        </p>
      </div>
    </div>
  );
}

function Alerts() {
  const telemetryData = [
    {
      telemetry_uid: "CGWNAG2174",
      water_level: "-8.23",
      DWLR_depth: "13.23",
      well_depth: "28.23",
      Notify: "FALSE",
    },
    {
      telemetry_uid: "CGWNAG2174",
      water_level: "-8.16",
      DWLR_depth: "13.16",
      well_depth: "28.16",
      Notify: "FALSE",
    },
    {
      telemetry_uid: "CGWNAG2174",
      water_level: "-8.32",
      DWLR_depth: "13.32",
      well_depth: "28.32",
      Notify: "FALSE",
    },
    {
      telemetry_uid: "CGWNAG2174",
      water_level: "-8.43",
      DWLR_depth: "13.43",
      well_depth: "28.43",
      Notify: "FALSE",
    },
    {
      telemetry_uid: "CGWNAG2174",
      water_level: "-8.13",
      DWLR_depth: "13.13",
      well_depth: "28.13",
      Notify: "FALSE",
    },
    {
      telemetry_uid: "CGWNAG2174",
      water_level: "-8.08",
      DWLR_depth: "13.08",
      well_depth: "28.08",
      Notify: "FALSE",
    },
  ];

  return (
    <div className="flex-wrap items-center justify-center gap-4 text-center sm:flex">
      {telemetryData.map((item, index) => (
        <Card
          key={index}
          telemetry_uid={item.telemetry_uid}
          water_level={item.water_level}
          DWLR_depth={item.DWLR_depth}
          well_depth={item.well_depth}
          Notify={item.Notify}
        />
      ))}
    </div>
  );
}

export default Alerts;
