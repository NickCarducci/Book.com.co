import React from "react";
import { Line } from "react-svg-curve";

class ChartedCalls extends React.Component {
  constructor(props) {
    super(props);

    let data = [];
    let date = [];
    let price = [];
    props.companyData.map(x => {
      if (x.option_type === "call") {
        date.push(new Date(x.trade_date).getTime());
        price.push(x.last);
        data.push([new Date(x.trade_date).getTime(), x.last]);
      }
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
    if (prevProps.companyData !== this.props.companyData) {
      let data = [];
      let date = [];
      let price = [];
      this.props.companyData.map(x => {
        date.push(new Date(x.trade_date).getTime());
        price.push(x.last);
        data.push([new Date(x.trade_date).getTime(), x.last]);
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
    if (this.props.companyData) {
      return (
        <svg
          style={{
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
export default ChartedCalls;
