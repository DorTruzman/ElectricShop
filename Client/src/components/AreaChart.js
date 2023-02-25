import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getEntityById } from "../services/fetchService";

function AreaChart() {
  const [queryData, setQueryData] = useState({});

  useEffect(() => {
    getEntityById({ name: "user", id: "groupByArea" }).then((queryResult) => {
      setQueryData(
        queryResult.reduce((obj, item) => {
          return {
            ...obj,
            [item.area]: item.count,
          };
        }, {})
      );
    });
  }, []);

  let categoriesObj = Object.keys(queryData);
  let seriesDataObj = Object.values(queryData);

  const options = {
    title: {
      text: "מספר לקוחות בחלוקה לאזור בארץ",
    },
    chart: { type: "column" },
    xAxis: {
      categories: categoriesObj,
    },
    series: [
      {
        name: "מספר לקוחות",
        colorByPoint: true,
        data: seriesDataObj,
      },
    ],
    legend: false,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default AreaChart;
