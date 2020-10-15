import React from "react";
import { Line } from "react-svg-curve";

class StrikeChart extends React.Component {
  constructor(props) {
    super(props);

    let data2 = [];
    let date2 = [];
    let price2 = [];
    props.options.map((x) => {
      date2.push(x.order);
      price2.push(x.price);
      return data2.push([x.order, x.price]);
    });
    var lowDate2 = Math.min(...date2);
    var highDate2 = Math.max(...date2);
    var lowPrice2 = Math.min(...price2);
    var highPrice2 = Math.max(...price2);
    data2.sort((a, b) => a[0] - b[0]);

    this.state = {
      data2,
      yAxis2: highPrice2 - lowPrice2,
      xAxis2: highDate2 - lowDate2,
      lowDate2,
      lowPrice2
    };
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.options !== this.props.options) {
      let data2 = [];
      let date2 = [];
      let price2 = [];
      this.props.options.map((x) => {
        date2.push(x.order);
        price2.push(x.price);
        return data2.push([x.order, x.price]);
      });
      var lowDate2 = Math.min(...date2);
      var highDate2 = Math.max(...date2);
      var lowPrice2 = Math.min(...price2);
      var highPrice2 = Math.max(...price2);
      data2.sort((a, b) => a[0] - b[0]);

      this.setState({
        data2,
        yAxis2: highPrice2 - lowPrice2,
        xAxis2: highDate2 - lowDate2,
        lowDate2,
        lowPrice2
      });
    }
  };
  percentToColor(weight) {
    var color1 = [97, 5, 20];
    var color2 = [101, 5, 20];
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ];
    return rgb;
  }
  percentToColor1(weight) {
    var color1 = [5, 97, 20];
    var color2 = [5, 101, 20];
    var w = 1 - weight;
    var rgb = [
      Math.round(color1[0] * weight + color2[0] * w),
      Math.round(color1[1] * weight + color2[1] * w),
      Math.round(color1[2] * weight + color2[2] * w)
    ];
    return rgb;
  }
  render() {
    const { x } = this.props;
    if (this.props.options) {
      /*var higherlower = 1;
      if (this.props.close - this.props.open > 0) {
        var first = (this.props.close - this.props.open) / this.props.close;
        higherlower = Math.round(first,100)/100
      } else {
        var firts = (this.props.open - this.props.close) / this.props.open;
        higherlower =  Math.round(firts,100)/100
      }
      var change = x.close
        ? x.change_percentage < 0
          ? Math.round(x.close + Math.abs(x.change_percentage) * x.close)
          : Math.round(x.close - Math.abs(x.change_percentage) * x.close)
        : x.change_percentage < 0
        ? Math.round(x.last + Math.abs(x.change_percentage) * x.last)/100
        : Math.round(x.last - Math.abs(x.change_percentage) * x.last);
        console.log(x.last - Math.abs(x.change_percentage) * x.last)*/
      return (
        <div
          style={{
            color: "rgb(200,200,200)",
            flexDirection: "column",
            top: "0px",
            fontSize: "12px",
            display: "flex",
            position: "relative",
            width: "100%",
            height: "62px",
            alignItems: "center",
            justifyContent: "center",
            /*backgroundColor: !this.props.close
                    ? "rgb(100,100,250)"
                    : this.props.close > this.props.open
                    ? "rgb(100,200,100)"
                    : "rgb(250,100,100)",*/
            backgroundColor:
              x.change_percentage > 0
                ? `rgba(${this.percentToColor1(
                    x.change_percentage / this.props.heighest4
                  )},.7)`
                : `rgba(${this.percentToColor(
                    Math.abs(x.change_percentage) / Math.abs(this.props.lowest4)
                  )},.7)`
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "0px 6px",
              justifyContent: "space-around",
              padding: "0px 3px"
            }}
          >
            <div>${x.prevclose ? x.prevclose : "-"}</div>
            <div
              style={
                x.change_percentage < 0
                  ? {
                      color: "red"
                    }
                  : { color: "lightgreen" }
              }
            >
              {Math.round(x.change_percentage)}%
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "0px 3px"
              }}
            >
              <div>${x.open}</div>
            </div>{" "}
            <svg
              style={{
                transform: "scale(1, -1)",
                bottom: "0px",
                display: "flex",
                position: "relative",
                width: "70px",
                height: "30px"
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <Line
                pointElement={([x, y], i) => (
                  <circle
                    r="0.25"
                    cx={x}
                    cy={y}
                    width="1"
                    height="1"
                    stroke="white"
                    fill="white"
                    strokeWidth="4"
                    key={i}
                  />
                )}
                data={this.state.data2.map(([x, y]) => [
                  `calc(((${x} - ${this.state.lowDate2}) / ${this.state.xAxis2}) * 70px)`,

                  `calc(((${y} - ${this.state.lowPrice2}) / ${this.state.yAxis2}) * 80%)`
                ])}
              />
            </svg>
          </div>
        </div>
      );
    } else return null;
  }
}
export default StrikeChart;
