import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private svg;
  private margin = {top: 90, right: 0, bottom: 30, left: 90}
  private width = 1000 - this.margin.left - this.margin.right;
  private height =  250 - this.margin.top - this.margin.bottom;

  columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"]
  rows = ["1", "2", "3", "4", "5", "6", "7"]


  constructor() { }

  ngOnInit(): void {
    this.createSvg()

    d3.csv('/assets/name.csv').then(
      (data) => {
        this.drawMap(data)
      })
  }

  createSvg() {
    this.svg = d3.select("#name_map")
    .append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  drawMap(data) {
      // Build X scales and axis:
      var x = d3.scaleBand()
      .range([ 0, this.width ])
      .domain(this.columns)
      .padding(0.05);
  
      // Build X scales and axis:
      var y = d3.scaleBand()
      .range([ this.height, 0 ])
      .domain(this.rows.reverse())
      .padding(0.05);
  
      // Build color scale
      var myColor = d3.scaleLinear<string, number>()
      .range(["white", "red"])
      .domain([0,20])
  
  
        this.svg.selectAll()
          .data(data, d => {return d.column+':'+d.row;})
          .enter()
          .append("rect")
            .attr("x", d => { return x(d.column) })
            .attr("y", d => { return y(d.row) })
            .attr("rx", 4)
        .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", d => { return myColor(d.value)} )
            .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
  }

}
