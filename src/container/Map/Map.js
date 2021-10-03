import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import { showDataMap } from "../../components/Utils/Utils";

const Map = ({ countries, center, zoom, cases }) => {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataMap(countries, cases)}
      </LeafletMap>
    </div>
  );
};

export default Map;
