import React from "react";
import * from "d3"

const HeatMapGraph = () => {
  const chartHeatMap = async () => {
    const data = await d3.json("example.json");
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 id="title" className="text-center">
          title
        </h1>
        <div id="axes"></div>
      </div>
    </>
  );
};

export default HeatMapGraph;
