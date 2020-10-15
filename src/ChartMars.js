import React from "react";
import { Line } from "react-svg-curve";

class ChartMars extends React.Component {
  constructor(props) {
    super(props);

    let data = [];
    let date = [];
    var price = [...this.props.strongBuyValue];
    this.props.strongBuyValue.map(x => {
      date.push(new Date(x[0]).getTime());
      price.push(x[1]);
      return data.push([new Date(x[0]).getTime(), x[1]]);
    });
    var lowDate = Math.min(...date);
    var highDate = Math.max(...date);
    var lowPrice = Math.min(...price);
    var highPrice = Math.max(...price);
    this.state = {
      data,
      yAxis: highPrice - lowPrice,
      xAxis: highDate - lowDate,
      lowDate,
      lowPrice
    };
  }
  componentDidUpdate = prevProps => {
    if (prevProps.strongBuyValue !== this.props.strongBuyValue) {
      let data = [];
      let date = [];
      var price = [...this.props.strongBuyValue];
      this.props.strongBuyValue.map(x => {
        date.push(new Date(x[0]).getTime());
        price.push(x[1]);
        return data.push([new Date(x[0]).getTime(), x[1]]);
      });
      var lowDate = Math.min(...date);
      var highDate = Math.max(...date);
      var lowPrice = Math.min(...price);
      var highPrice = Math.max(...price);
      this.setState({
        data,
        yAxis: highPrice - lowPrice,
        xAxis: highDate - lowDate,
        lowDate,
        lowPrice
      });
    }
  };
  render() {
    if (this.props.strongBuyValue) {
      return (
        <svg
          style={{
            top: "150px",
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "150px"
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <Line
            data={this.state.data.map(([x, y]) => [
              `calc(((${x} - ${this.state.lowDate}) / ${
                this.state.xAxis
              }) * 90vw)`,

              `calc(((${y} - ${this.state.lowPrice}) / ${
                this.state.yAxis
              }) * 290px)`
            ])}
          />
        </svg>
      );
    } else return null;
  }
}
export default ChartMars;
