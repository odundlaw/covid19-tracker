import React, { useState, useEffect } from "react";
import Aux from "../../wrapper/wrapper";
import InfoBox from "../../components/InfoBox/InfoBox";
import Map from "../Map/Map";
import Table from "../Table/Table";
import { sortData } from "../../components/Utils/Utils";
import LineGraph from "../LineGraph/LineGraph";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

const FullPage = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountry, setMapCountry] = useState([]);
  const [caseType, setCaseType] = useState("cases");

  useEffect(() => {
    const url =
      country === "worldwide"
        ? "http://disease.sh/v3/covid-19/all"
        : `http://disease.sh/v3/covid-19/countries/${country}`;
    const fetchCountryInfo = async () => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
          if (country === "worldwide") {
            setMapCenter({ lat: 34.80746, lng: -40.4796 });
          } else {
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          }
          setMapZoom(4);
        });
    };
    fetchCountryInfo();
  }, [country]);

  const changeCountryHandler = async (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const newData = data.map(({ country, countryInfo }) => {
            return {
              name: country,
              value: countryInfo.iso2,
            };
          });
          console.log(data);
          setCountries(newData);
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountry(data);
        });
    };
    fetchData();
  }, []);

  console.log(countries);
  return (
    <Aux>
      <div className="app__left">
        <div className="app__header">
          <h1 className="app__title">COVID-19 TRACKER </h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={changeCountryHandler}
            >
              <MenuItem value={country}>Worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country.value} key={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* box for status */}

          <InfoBox
            active={caseType === "cases"}
            isRed
            clicked={(e) => setCaseType("cases")}
            title="Corona Virus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            active={caseType === "recovered"}
            clicked={(e) => setCaseType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            active={caseType === "deaths"}
            isRed
            clicked={(e) => setCaseType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map
          cases={caseType}
          countries={mapCountry}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h2 className="cases-by-country"> Live Cases by Country </h2>
            <Table countries={tableData} />
            <h3 className="world-wide-cases"> Worldwide New {caseType} </h3>
            <LineGraph caseType={caseType} />
          </CardContent>
        </Card>
      </div>
    </Aux>
  );
};

export default FullPage;
