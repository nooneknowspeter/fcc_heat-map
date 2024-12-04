"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";

const HeatMapGraph = () => {
  useEffect(() => {
    chartHeatMap();
  });

  const chartHeatMap = async () => {
    const url =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

    const data = await d3.json(url);

    console.log(data);

    const width = 1000;
    const height = 600;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 20;
    const marginLeft = 20;

    const svg = d3
      .select("#axes")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 id="title" className="text-center">
          title
        </h1>
        <div id="axes"></div>
      </div>
    </>
  );
};

export default HeatMapGraph;
