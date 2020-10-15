import React from "react";
import { Line } from "react-svg-curve";

class ChartTitle extends React.Component {
  state = {};
  componentDidMount = () => {
    let data = [];
    let date = [];
    let price = [];
    this.props.thisonehistory.historicalPrices.map((x) => {
      date.push(new Date(x.date).getTime());
      var pricer = x.close ? x.close : x.last;
      if (x.open < pricer) {
        price.push(x.high);
        return data.push([new Date(x.date).getTime(), x.high]);
      } else if (x.open > pricer) {
        price.push(x.low);
        return data.push([new Date(x.date).getTime(), x.low]);
      } else return null;
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
    //
    this.loadData();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data && this.props.data !== {}) {
      this.loadData();
    }
  };
  loadData = () => {
    let data1 = [];
    let date1 = [];
    let price1 = [];
    let data2 = [];
    let date2 = [];
    let price2 = [];
    let data3 = [];
    let date3 = [];
    let price3 = [];
    let data4 = [];
    let date4 = [];
    let price4 = [];
    this.props.expirations.map((x) => {
      if (this.props.data[x]) {
        price1.push(this.props.data[x].putTrades);
        data1.push([new Date(x).getTime(), this.props.data[x].putTrades]);
        date1.push(new Date(x).getTime());

        price2.push(this.props.data[x].callTrades);
        data2.push([new Date(x).getTime(), this.props.data[x].callTrades]);
        date2.push(new Date(x).getTime());

        price3.push(0);
        data3.push([new Date(x).getTime(), 0]);
        date3.push(new Date(x).getTime());
        price3.push(0);
        data3.push([new Date().getTime(), 0]);
        date3.push(new Date().getTime());

        price4.push(0);
        data4.push([new Date(x).getTime(), 0]);
        date4.push(new Date(x).getTime());
        price4.push(0);
        data4.push([new Date().getTime(), 0]);
        return date4.push(new Date().getTime());
      } else {
        price1.push(0);
        data1.push([new Date(x).getTime(), 0]);
        date1.push(new Date(x).getTime());

        price2.push(0);
        data2.push([new Date(x).getTime(), 0]);
        date2.push(new Date(x).getTime());

        price3.push(0);
        data3.push([new Date(x).getTime(), 0]);
        date3.push(new Date(x).getTime());
        price3.push(0);
        data3.push([new Date().getTime(), 0]);
        date3.push(new Date().getTime());

        price4.push(0);
        data4.push([new Date(x).getTime(), 0]);
        date4.push(new Date(x).getTime());
        price4.push(0);
        data4.push([new Date().getTime(), 0]);
        return date4.push(new Date().getTime());
      }
    });

    var lowDate1 = Math.min(...date1);
    var highDate1 = Math.max(...date1);
    var lowPrice1 = Math.min(...price1);
    var highPrice1 = Math.max(...price1);
    var lowDate2 = Math.min(...date2);
    var highDate2 = Math.max(...date2);
    var lowPrice2 = Math.min(...price2);
    var highPrice2 = Math.max(...price2);
    var highestPrice1 = Math.max(highPrice1, highPrice2);
    var lowDate3 = Math.min(...date3);
    var highDate3 = Math.max(...date3);
    var lowPrice3 = Math.min(...price3);
    var highPrice3 = Math.max(...price3);
    var lowDate4 = Math.min(...date4);
    var highDate4 = Math.max(...date4);
    var lowPrice4 = Math.min(...price4);
    var highPrice4 = Math.max(...price4);
    data1.sort((a, b) => a[0] - b[0]);
    data2.sort((a, b) => a[0] - b[0]);
    data3.sort((a, b) => a[0] - b[0]);
    data4.sort((a, b) => a[0] - b[0]);

    this.setState({
      data3,
      yAxis3: highPrice3 - lowPrice3,
      xAxis3: highDate3 - lowDate3,
      lowDate3,
      lowPrice3,
      data4,
      yAxis4: highPrice4 - lowPrice4,
      xAxis4: highDate4 - lowDate4,
      lowDate4,
      lowPrice4,
      data1,
      yAxis1: highestPrice1 - lowPrice1,
      xAxis1: highDate1 - lowDate1,
      lowDate1,
      lowPrice1,
      data2,
      yAxis2: highestPrice1 - lowPrice2,
      xAxis2: highDate2 - lowDate2,
      lowDate2,
      lowPrice2
    });
  };
  percentToColor(weight) {
    var color1 = [100, 150, 250];
    var color2 = [250, 250, 250];
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ];
    return rgb;
  }
  render() {
    if (this.props.thisonehistory) {
      var gathered = [];
      this.state.data2 &&
        this.state.data2.map(([x, y], i) => {
          if (y !== 0) {
            return gathered.push(i);
          } else return null;
        });
      var gathered1 = [];
      this.state.data1 &&
        this.state.data1.map(([x, y], i) => {
          if (y !== 0) {
            return gathered1.push(i);
          } else return null;
        });
      return (
        <div
          style={{
            top: "10px",
            display: "flex",
            position: "relative",
            width: "100%",
            justifyContent: "flex-start",
            height: "150px",
            zIndex: "1"
          }}
        >
          <div
            onMouseEnter={() => this.setState({ hovered: this.props.thisone })}
            onMouseLeave={() => this.setState({ hovered: "" })}
            style={
              this.state.hovered === this.props.thisone
                ? {
                    right: "42%",
                    display: "flex",
                    width: "100%",
                    position: "absolute",
                    flexDirection: "column"
                  }
                : {
                    color: "rgb(200,200,200)",
                    right: "42%",
                    display: "flex",
                    width: "100%",
                    position: "absolute",
                    flexDirection: "column"
                  }
            }
          >
            <div style={{ padding: "1px", width: "100%" }}>
              {this.state.data &&
                this.state.data[this.state.data.length - 1][1]}
            </div>
            <div style={{ padding: "1px", width: "100%" }}>
              {this.state.data && this.state.data[0][1]}
            </div>
          </div>
          {this.state.data && (
            <svg
              style={{
                //main
                transform: "scale(1, -1)",
                alignItems: "center",
                bottom: "0px",
                display: "flex",
                position: "relative",
                width: "100vw",
                height: "140px"
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <Line
                pointElement={([x, y], i) => (
                  <circle
                    r=".9"
                    cx={x}
                    cy={y}
                    width="1"
                    height="1"
                    stroke="navy"
                    fill="navy"
                    strokeWidth="4"
                    key={i}
                  />
                )}
                data={this.state.data.map(([x, y]) => [
                  `calc(((${x} - ${this.state.lowDate}) / ${this.state.xAxis}) * 97vw - 7px)`,

                  `calc(((${y} - ${this.state.lowPrice}) / ${this.state.yAxis}) * 100%)`
                ])}
              />
            </svg>
          )}
          <div
            style={{
              zIndex: "9999",
              bottom: "10px",
              display: "flex",
              position: "absolute",
              width: "100vw",
              height: "140px"
            }}
          >
            {this.state.data1 && (
              <div style={{ display: "flex", width: "100%" }}>
                {this.state.data1.map(([x, y], i) => {
                  var diffDays = Math.round(
                    (x - new Date().getTime()) / 86400000
                  );
                  if (
                    i === 0 ||
                    i ===
                      this.state.data1.lastIndexOf(
                        this.state.data1[this.state.data1.length - 1]
                      )
                  ) {
                    return (
                      <div style={{ padding: "1px", width: "100%" }}>
                        {diffDays + 1} days
                      </div>
                    );
                  } else return null;
                })}
              </div>
            )}
            {this.state.data3 && (
              <svg
                style={{
                  transform: "scale(1,-1)",
                  alignItems: "center",
                  bottom: "0px",
                  display: "flex",
                  position: "absolute",
                  width: "100vw",
                  height: "70px"
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <Line
                  pointElement={([x, y], i) => (
                    <rect
                      x={x}
                      y={y}
                      width="1"
                      height="100%"
                      stroke="rgba(130,130,230,.6)"
                      fill="transparent"
                      strokeWidth="1"
                      key={i}
                    />
                  )}
                  data={this.state.data3.map(([x, y]) => [
                    `calc(((${x} - ${this.state.lowDate3}) / ${this.state.xAxis3}) * 97vw - 7px)`,

                    `calc(((${y} - ${this.state.lowPrice3}) / ${this.state.yAxis3}) * 100%)`
                  ])}
                />
              </svg>
            )}
            {this.state.data1 && (
              <svg
                style={{
                  //put
                  alignItems: "center",
                  bottom: "0px",
                  display: "flex",
                  position: "absolute",
                  width: "100vw",
                  height: "70px"
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <Line
                  pointElement={([x, y], i) => (
                    <rect
                      x={x}
                      y={y}
                      width="1"
                      height="1"
                      stroke={
                        !gathered1.includes(i)
                          ? "rgba(250,190,155,.0)"
                          : "rgb(250,190,155)"
                      }
                      fill="transparent"
                      strokeWidth="4"
                      key={i}
                    />
                  )}
                  data={this.state.data1.map(([x, y]) => [
                    `calc(((${x} - ${this.state.lowDate1}) / ${this.state.xAxis1}) *  - 7px)`,

                    `calc(((${y} - ${this.state.lowPrice1}) / ${this.state.yAxis1}) * 100%)`
                  ])}
                />
              </svg>
            )}
            {this.state.data4 && (
              <svg
                style={{
                  transform: "scale(1,-1)",
                  alignItems: "center",
                  bottom: "70px",
                  display: "flex",
                  position: "absolute",
                  width: "100vw",
                  height: "70px"
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <Line
                  pointElement={([x, y], i) => (
                    <rect
                      x={x}
                      y={y}
                      width="1"
                      height="100%"
                      stroke="rgba(230,130,230,.7)"
                      fill="transparent"
                      strokeWidth="1"
                      key={i}
                    />
                  )}
                  data={this.state.data4.map(([x, y]) => [
                    `calc(((${x} - ${this.state.lowDate4}) / ${this.state.xAxis4}) * 97vw - 7px)`,

                    `calc(((${y} - ${this.state.lowPrice4}) / ${this.state.yAxis4}) * 100%)`
                  ])}
                />
              </svg>
            )}
            {this.state.data2 && (
              <svg
                style={{
                  //call
                  transform: "scale(1,-1)",
                  alignItems: "center",
                  bottom: "70px",
                  display: "flex",
                  position: "absolute",
                  width: "100vw",
                  height: "70px"
                }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <Line
                  pointElement={([x, y], i) => (
                    <rect
                      x={x}
                      y={y}
                      width="1"
                      height="1"
                      stroke={
                        !gathered.includes(i)
                          ? "rgba(150,190,255,.0)"
                          : "rgb(150,190,255)"
                      }
                      fill="transparent"
                      strokeWidth="4"
                      key={i}
                    />
                  )}
                  data={this.state.data2.map(([x, y]) => [
                    `calc(((${x} - ${this.state.lowDate2}) / ${this.state.xAxis2}) * 97vw - 7px)`,

                    `calc(((${y} - ${this.state.lowPrice2}) / ${this.state.yAxis2}) * 100%)`
                  ])}
                />
              </svg>
            )}
          </div>
          <div
            style={{
              //transform: "scale(1,-1)",
              alignItems: "center",
              top: "56px",
              display: "flex",
              position: "absolute",
              right: "0px",
              width: "100vw",
              height: "1px",
              zIndex: "9999",
              backgroundColor: "rgba(20,20,40,.4)"
            }}
          />
        </div>
      );
    } else return null;
  }
}
export default ChartTitle;
