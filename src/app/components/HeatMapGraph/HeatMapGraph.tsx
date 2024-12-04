"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";

const HeatMapGraph = () => {
  useEffect(() => {
    chartHeatMap();
  });

  const chartHeatMap = async () => {
    // provided json data containing global land temperature since 1753
    const url: string =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

    interface dataInterface {
      baseTemperature: number;
      monthlyVariance: [{ year: number; month: number; variance: number }];
    }

    const data = (await d3.json(url)) as dataInterface;

    // console.log(data);

    // destructure data from json object
    const { baseTemperature, monthlyVariance } = data;

    console.log(baseTemperature);

    // 1.92 ratio
    const width = 1344;
    const height = 700;

    // margin
    const marginTop = 20;
    const marginRight = 40;
    const marginBottom = 30;
    const marginLeft = 80;

    // create and append svg canvas
    const svg = d3
      .select("#axes")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // x axis
    const x = d3
      .scaleBand<number>()
      .domain(monthlyVariance.map((el) => el.year))
      .range([marginLeft, width - marginRight]);

    const xAxis = d3
      .axisBottom(x)
      .tickValues(
        x.domain().filter((year) => {
          // set ticks to years divisible by 10
          return Number(year) % 10 === 0;
        }),
      )
      .tickFormat((year) => {
        const date = new Date(0);
        date.setUTCFullYear(Number(year));
        const format = d3.utcFormat("%Y");
        return format(date);
      })
      .tickSize(10);

    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    // y axis
    const y = d3
      .scaleBand<number>()
      // months
      .domain(d3.range(12))
      .rangeRound([height - marginBottom, marginTop]);

    const yAxis = d3
      .axisLeft(y)
      .tickValues(y.domain())
      .tickFormat((month) => {
        const date = new Date(0);
        date.setUTCMonth(Number(month));
        const format = d3.utcFormat("%B");
        return format(date);
      })
      .tickSize(10);

    svg
      .append("g")
      .classed("y-axis", true)
      .attr("id", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis);
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 id="title" className="text-center">
          Heat Map Showing Global Land Temperature Since 1753
        </h1>
        <div id="axes"></div>
      </div>
    </>
  );
};

export default HeatMapGraph;
