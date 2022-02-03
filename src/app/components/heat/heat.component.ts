import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-heat',
  templateUrl: './heat.component.html',
  styleUrls: ['./heat.component.scss']
})
export class HeatComponent implements OnInit {
  private svg;
  private margin = {top: 90, right: 0, bottom: 30, left: 90}
  private width = 1000 - this.margin.left - this.margin.right;
  private height =  250 - this.margin.top - this.margin.bottom;
  private tooltip;
  year = "2021"
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  weeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52"]
  days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]

  constructor() { }

  ngOnInit(): void {
    this.svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");

    d3.csv('/assets/callNotes.csv').then(
      (data) => {
        data.map(d => {
          const dateObj = new Date(d.date)
          //get day of the week
          let dayIndex = dateObj.getDay()
          d.day = this.days[dayIndex]

          //get year
          d.year = (new Date(dateObj).getFullYear()).toString()

          //get month
          d.month = (new Date(dateObj).getMonth()).toString()

          //get week of the year
          let oneJan = new Date(dateObj.getFullYear(), 0, 1);
          let week = Math.ceil((((dateObj.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay()) / 7);
          d.week = week.toString()

          
        })

    // Build X scales and axis:
    var x = d3.scaleBand()
    .range([ 0, this.width ])
    .domain(this.weeks)
    .padding(0.05);
    this.svg.append("g")
    // .style("font-size", 15)
    // // .attr("transform", "translate(0," + this.height + ")")
    // .call(d3.axisBottom(x).tickSize(0))
    // .select(".domain").remove()

    // Build X scales and axis:
    var y = d3.scaleBand()
    .range([ this.height, 0 ])
    .domain(this.days.reverse())
    .padding(0.05);
    this.svg.append("g")
    .style("font-size", 14)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

    // Build color scale
    var myColor = d3.scaleLinear<string, number>()
    .range(["white", "blue"])
    .domain([1,250])

      // create a tooltip
      this.tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("position", "absolute")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

      let mouseover = () => {
        this.tooltip.style("opacity", 1)
      }
      let mousemove = (event, d) => {
        this.tooltip
          .html(d.value + " Call Notes on " + d.date)
          .style("left", (event.x + 15) + "px")
          .style("top", (event.y - 15) + "px")
      }
      let mouseleave = () => {
        this.tooltip.style("opacity", 0)
      }

      this.svg.selectAll()
        .data(data, d => {return d.week+':'+d.day;})
        .enter()
        .append("rect")
          .attr("x", d => { return x(d.week) })
          .attr("y", d => { return y(d.day) })
          .attr("rx", 4)
      .attr("ry", 4)
          .attr("width", x.bandwidth() )
          .attr("height", y.bandwidth() )
          .style("fill", d => { return myColor(d.value)} )
          .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", (event, d) => {return mousemove(event, d)} )
        .on("mouseleave", mouseleave )
    })

    this.svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("Call Notes");

        this.svg.append("text")
        .attr("x", 0)
        .attr("y", -25)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", "1000px")
        .text("Organization's call notes in 2021");

        this.svg.append("text")
        .attr("x", 20)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("January");

        this.svg.append("text")
        .attr("x", 91)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("February");

        this.svg.append("text")
        .attr("x", 162)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("March");

        this.svg.append("text")
        .attr("x", 233)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("April");

        this.svg.append("text")
        .attr("x", 304)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("May");

        this.svg.append("text")
        .attr("x", 375)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("June");

        this.svg.append("text")
        .attr("x", 446)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("July");

        this.svg.append("text")
        .attr("x", 517)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("August");

        this.svg.append("text")
        .attr("x", 588)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("September");

        this.svg.append("text")
        .attr("x", 659)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("October");

        this.svg.append("text")
        .attr("x", 730)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("November");

        this.svg.append("text")
        .attr("x", 801)
        .attr("y", -5)
        .attr("text-anchor", "center")
        .style("font-size", "10px")
        .style("fill", "grey")
        .style("min-width", "1000px")
        .text("December");
  }
}
