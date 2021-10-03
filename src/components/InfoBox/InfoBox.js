import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from 'react-countup';
import numeral from 'numeral';
import './InfoBox.css';

const InfoBox = ({ title, cases, total, active, isRed, ...props}) => {
  const cssClass = ["infoBox"];
  active && cssClass.push("infoBox-selected");
  active & isRed && cssClass.push("infoBox-isRed");

  return (
    <div>
      <Card className={cssClass.join(" ")} onClick={props.clicked} style={{flex: 1}}>
        <CardContent>
          <Typography className="infoBox__title" color="textPrimary">
            {title}
          </Typography>
          <h2 className={`"infoBox__cases" ${!isRed && "title-notRed"}`}>
            <CountUp end={cases ? cases : 0} />
          </h2>
          <Typography color="textSecondary" className="infoBox__total">
            Total <CountUp end={total ? total : 0} />
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;