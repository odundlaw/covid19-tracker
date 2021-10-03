import React from "react";
import { Popup, Circle } from "react-leaflet";
import numeral from "numeral";

const caseTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};
export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

  return sortedData;
};

export const showDataMap = (data, caseType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[caseType].hex}
      fillColor={caseTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            cases:{numeral(country.cases).format("0, 0")}
          </div>
          <div className="info-recovered">
            recovered:{numeral(country.recovered).format("0, 0")}
          </div>
          <div className="info-deaths">
            deaths:{numeral(country.deaths).format("0, 0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
