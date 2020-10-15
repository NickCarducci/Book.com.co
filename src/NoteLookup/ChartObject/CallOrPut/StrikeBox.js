import React from "react";
import ExpStrikeChart from "./StrikeBox/ExpStrikeChart";

class StrikeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastChosenCode: "",
      allOptionsPrices: [],
      all: []
    };
    this.canvass = React.createRef();
  }
  percentToColor1(weight) {
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
  percentToColor2(weight) {
    var color1 = [100, 250, 150];
    var color2 = [250, 200, 150];
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ];
    return rgb;
  }
  percentToColor3(weight) {
    var color2 = [50, 100, 240];
    var color1 = [51, 51, 51];
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ];
    return rgb;
  }
  percentToColor4(weight) {
    var color1 = [50, 200, 100];
    var color2 = [30, 120, 60];
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [
      Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)
    ];
    return rgb;
  }
  /*componentWillUnmount = () => {
    window.cancelAnimationFrame(this.update);
  };
  componentDidUpdate = () => {
    this.ctx = this.canvass.current.getContext("2d");
    if (this.props.options) {
      this.props.options.map((b) => {
          var thisone = this.props.users.find((y) => y.id === v);
          if (thisone) {
            var width = this.canvass.current.offsetWidth;
            var height = this.canvass.current.offsetHeight;
            var gravity = 0.25;
            var friction = 0.98;
            var bounce = 0.9;
            var radius = this.props.width / 9;
            var velX = 7 * (Math.floor(Math.random() * 2) || -1);
            var velY = 0.25 * (Math.floor(Math.random() * 2) || -1);
            var x = 0;
            var y = 0;
            window.requestAnimationFrame(() =>
              this.update(
                thisone,
                {
                  width,
                  height,
                  gravity,
                  friction,
                  bounce,
                  radius,
                  velX,
                  velY,
                  x,
                  y
                },
                this.ctx
              )
            );
          }
      });
    }
  };

  update(thisone, m, ctx) {
    var {
      width,
      height,
      gravity,
      friction,
      bounce,
      radius,
      velX,
      velY,
      x,
      y
    } = m;
    // queue the next update,clear,update,draw
    ctx.clearRect(0, 0, width, height);

    // bottom bound / floor
    if (y + radius >= height) {
      velY *= -bounce;
      y = height - radius;
      velX *= friction;
    }
    // top bound / ceiling
    if (y - radius <= 0) {
      velY *= -bounce;
      y = radius;
      velX *= friction;
    }
    // left bound
    if (x - radius <= 0) {
      velX *= -bounce;
      x = radius;
    }
    // right bound
    if (x + radius >= width) {
      velX *= -bounce;
      x = width - radius;
    }
    // reset insignificant amounts to 0
    if (velX < 0.01 && velX > -0.01) {
      velX = 0;
    }
    if (velY < 0.01 && velY > -0.01) {
      velY = 0;
    }
    // update position
    velY += gravity;
    x += velX;
    y += velY;
    window.requestAnimationFrame(() =>
      this.update(
        thisone,
        {
          width,
          height,
          gravity,
          friction,
          bounce,
          radius,
          velX,
          velY,
          x,
          y
        },
        ctx
      )
    );

    var g = this.canvass.current;
    if (this.canvass.current && g.mouseX && g.mouseY) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(300, 150);
      ctx.stroke();
    }
  }

  componentDidMount = () => {
    this.canvass.current.width = this.props.width;
    this.canvass.current.height = this.props.height;
  };*/
  render() {
    let allOptionsPrices = [];
    let no = [];
    const { openOptionBook, options } = this.props;
    let optionsForStrike = [];
    if (options) {
      if (this.props.useFilter === "spent") {
        options.sort((a, b) => {
          var optionsPricea = a.close
            ? Math.round(a.volume * ((a.open + a.high + a.low + a.close) / 4))
            : Math.round(a.volume * ((a.last + a.open + a.high + a.low) / 4));
          var optionsPriceb = b.close
            ? Math.round(b.volume * ((b.open + b.high + b.low + b.close) / 4))
            : Math.round(b.volume * ((b.last + b.open + b.high + b.low) / 4));
          return optionsPriceb - optionsPricea;
        });
      } else if (this.props.useFilter === "sos") {
        options.sort((a, b) => {
          var optionsPricea = a.close
            ? Math.round(a.volume * ((a.open + a.high + a.low + a.close) / 4)) /
              Math.round(
                a.open_interest * ((a.open + a.high + a.low + a.close) / 4)
              )
            : Math.round(a.volume * ((a.last + a.open + a.high + a.low) / 4)) /
              Math.round(
                a.open_interest * ((a.last + a.open + a.high + a.low) / 4)
              );
          var optionsPriceb = b.close
            ? Math.round(b.volume * ((b.open + b.high + b.low + b.close) / 4)) /
              Math.round(
                b.open_interest * ((b.open + b.high + b.low + b.close) / 4)
              )
            : Math.round(b.volume * ((b.last + b.open + b.high + b.low) / 4)) /
              Math.round(
                b.open_interest * ((b.last + b.open + b.high + b.low) / 4)
              );
          return optionsPriceb - optionsPricea;
        });
      } else if (this.props.useFilter === "strike") {
        var optionsNew = [...options];
        let puts = [];
        let calls = [];
        optionsNew.map((x) => {
          x.option_type === "put" && puts.push(x);
          return x.option_type === "call" && calls.push(x);
        });
        puts.sort((a, b) => b.strike - a.strike);
        calls.sort((a, b) => a.strike - b.strike);
        optionsForStrike = puts.concat(calls);
      } else if (this.props.useFilter === "value") {
        options.sort((a, b) => {
          var pricea = a.close ? a.close : a.last;
          var priceb = b.close ? b.close : b.last;
          return (
            Math.abs(b.strike - this.props.price.last) -
            priceb -
            (Math.abs(a.strike - this.props.price.last) - pricea)
          );
        });
      } else if (this.props.useFilter === "percentage") {
        options.sort((a, b) => b.change_percentage - a.change_percentage);
      } else {
        //options.sort((a, b) => b.greeks.vega - a.greeks.vega);
      }
      options.length > 0 &&
        this.props.price &&
        options.map((x) => {
          var optionsPrice = x.close
            ? Math.round((x.open + x.high + x.low + x.close) / 4)
            : Math.round((x.last + x.open + x.high + x.low) / 4);
          no.push(
            x.option_type === "call"
              ? this.props.price.last - x.strike
              : x.strike - this.props.price.last
          );
          return allOptionsPrices.push(optionsPrice);
        });
    }
    var most = Math.max(...no);
    var least = Math.min(...no);

    /*console.log(
      ((optionsPrice / underlyingPrice) *
        Math.max(allOptionsPrices)) /
        Math.max(allOptionsPrices)
    );*/
    let strongBuyValue = [];
    var all = [];
    var all2 = [];
    var all3 = [];
    options &&
      options.length > 0 &&
      options.map((x) => {
        var optionsPrice = x.close
          ? (x.open + x.high + x.low + x.close) / 4
          : (x.last + x.open + x.high + x.low) / 4;
        var boughtToday = x.volume * optionsPrice;
        var boughtAlready = x.open_interest * optionsPrice;
        var solve = boughtToday / boughtAlready;
        var round = Math.ceil(solve * 100) / 100;
        var s = x.close ? x.close - x.open : x.last - x.open;
        all2.push(s);
        if (!isNaN(round) && isFinite(round)) {
          return all.push(round);
        } else return null;
      });
    var heighest = Math.max(...all);
    var heighest2 = Math.max(...all2);
    var all4 = [];
    var all5 = [];
    options &&
      options.length > 0 &&
      options.map((x) => {
        if (!isNaN(x.change_percentage) && isFinite(x.change_percentage)) {
          if (x.change_percentage > 0) {
            all4.push(x.change_percentage);
          } else if (x.change_percentage < 0) {
            all5.push(x.change_percentage);
          }
        }
        var optionsPrice = x.close
          ? (x.open + x.high + x.low + x.close) / 4
          : (x.last + x.open + x.high + x.low) / 4;
        var boughtToday = x.volume * optionsPrice;
        var boughtAlready = x.open_interest * optionsPrice;
        var solve = boughtToday / boughtAlready;
        var round = Math.ceil(solve * 100) / 100;
        var s = x.close ? x.close - x.open : x.last - x.open;

        if (!isNaN(round) && isFinite(round)) {
          return all3.push(((round / heighest) * (s / heighest2)) / 2);
        } else return null;
      });
    var heighest3 = Math.max(...all3);
    var heighest4 = Math.max(...all4);
    var lowest4 = Math.max(...all5);
    return (
      <div
        ref={this.canvass}
        style={{
          width: "100%",
          display: "flex",
          position: "relative",
          height: "min-content"
        }}
      >
        <div
          style={{
            display: "flex",
            position:
              this.props.highlight === this.props.optionType ||
              this.props.highlight === ""
                ? "relative"
                : "absolute",
            height: "min-content",
            flexWrap: "wrap",
            justifyContent: "center",
            width:
              this.props.highlight === this.props.optionType
                ? "100vw"
                : this.props.highlight === ""
                ? "100%"
                : "",
            transform:
              this.props.highlight === this.props.optionType ||
              this.props.highlight === ""
                ? "translateX(0%)"
                : this.props.optionType === "call"
                ? "translateX(-100%)"
                : "translateX(0%)",
            transition: ".3s ease-in"
          }}
        >
          {options &&
            options.length > 0 &&
            (this.props.useFilter === "strike"
              ? optionsForStrike
              : options
            ).map((x, i) => {
              var pin = x.close
                ? x.open
                  ? Math.round(
                      100 * x.volume * ((x.open + x.high + x.low + x.close) / 4)
                    ) / 100
                  : Math.round(
                      100 * x.volume * ((x.open + x.high + x.low + x.close) / 4)
                    ) / 100
                : x.open
                ? Math.round(
                    100 * x.volume * ((x.open + x.high + x.low + x.last) / 4)
                  ) / 100
                : Math.round(
                    x.volume * ((x.open + x.high + x.low + x.last) / 4)
                  );
              var price = x.close ? x.close : x.last;
              if (
                (openOptionBook === "" || openOptionBook.symbol === x.symbol) &&
                x.option_type === this.props.optionType &&
                x.bid !== 0 &&
                pin !== 0 &&
                price
              ) {
                var optionsPrice = x.close
                  ? (x.open + x.high + x.low + x.close) / 4
                  : (x.last + x.open + x.high + x.low) / 4;
                var boughtToday = x.volume * optionsPrice;
                var boughtAlready = x.open_interest * optionsPrice;
                var solve = boughtToday / boughtAlready;
                var round = Math.round(solve * 100) / 100;
                var s = x.close ? x.close - x.open : x.last - x.open;
                var color = isFinite(round)
                  ? round < 0.4
                    ? "grey"
                    : "rgb(50,50,50)"
                  : "pink";
                var backgroundColor = isFinite(round / heighest)
                  ? //round < 0.4
                    //? "#333"
                    `rgb(${this.percentToColor2(
                      ((round / heighest) * (s / heighest2)) / 2 / heighest3
                    )})`
                  : "#333";
                strongBuyValue.push([x.date, round]);
                if (x.isNow) {
                  return (
                    <div
                      style={{
                        backgroundColor: "orange",
                        height: "100%",
                        width: "10px"
                      }}
                    />
                  );
                } else
                  return (
                    <div
                      onMouseEnter={() =>
                        this.setState({ ["hover" + x.strike]: true })
                      }
                      onMouseLeave={() =>
                        this.setState({ ["hover" + x.strike]: false })
                      }
                      //onClick={() => this.props.send(x)}
                      style={
                        boughtToday > 10000
                          ? {
                              border: "3px solid black",
                              color: "rgb(40,20,20)",
                              margin: "3px",
                              backgroundColor: "rgb(220,220,220)",
                              transform: "rotate(180deg)"
                            }
                          : {
                              border: "0px solid black",
                              color: "rgb(40,20,20)",
                              margin: "3px",
                              transform: "rotate(180deg)"
                            }
                      }
                    >
                      <ExpStrikeChart
                        heighest4={heighest4}
                        lowest4={lowest4}
                        x={x}
                        close={x.close ? x.close : x.last}
                        open={x.open}
                        options={
                          !x.close
                            ? x.open > x.last
                              ? [
                                  { price: x.prevclose, order: 0 },
                                  { price: x.open, order: 1 },
                                  { price: x.high, order: 2 },
                                  { price: x.low, order: 2 },
                                  { price: x.last, order: 3 }
                                ]
                              : [
                                  { price: x.prevclose, order: 0 },
                                  { price: x.open, order: 1 },
                                  { price: x.high, order: 2 },
                                  { price: x.low, order: 2 },
                                  { price: x.last, order: 3 }
                                ]
                            : x.open > x.close
                            ? [
                                { price: x.prevclose, order: 0 },
                                { price: x.open, order: 1 },
                                { price: x.high, order: 2 },
                                { price: x.low, order: 2 },
                                { price: x.close, order: 3 }
                              ]
                            : [
                                { price: x.prevclose, order: 0 },
                                { price: x.open, order: 1 },
                                { price: x.high, order: 2 },
                                { price: x.low, order: 2 },
                                { price: x.close, order: 3 }
                              ]
                        }
                      />
                      <div
                        style={{
                          color: "grey",
                          fontSize: "12px",
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between"
                        }}
                      >
                        <div
                          style={
                            x.bidsize > x.asksize
                              ? { color: "rgb(20,20,20)" }
                              : { color: "grey" }
                          }
                        >
                          {x.bidsize}b{" "}
                        </div>
                        <div
                          style={
                            x.bidsize > x.asksize
                              ? { color: "grey" }
                              : { color: "rgb(20,20,20)" }
                          }
                        >
                          {x.asksize}a{" "}
                        </div>
                      </div>
                      <div
                        style={{
                          color: `rgb${this.percentToColor1(
                            x.last / this.props.bought
                          )}`
                        }}
                      >
                        ${x.last}
                      </div>

                      <div
                        style={{
                          color:
                            x.option_type === "put"
                              ? `rgb(${this.percentToColor4(
                                  (x.strike - this.props.price.last) / most
                                )})`
                              : `rgb(${this.percentToColor4(
                                  (this.props.price.last - x.strike) / least
                                )})`
                        }}
                      >
                        {x.option_type[0]}
                        {x.strike}
                      </div>
                      <div
                        style={
                          this.state["hover" + x.strike]
                            ? {
                                display: "flex",
                                height: "50px",
                                opacity: "1",
                                justifyContent: "center",
                                backgroundColor: backgroundColor,
                                color: color,
                                transition: ".3s ease-in"
                              }
                            : {
                                height: "0px",
                                opacity: "0",
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor: backgroundColor,
                                color: color,
                                transition: ".3s ease-out"
                              }
                        }
                      >
                        {round}
                        <div style={{ fontSize: "5px" }}>1</div>
                        <br />
                      </div>
                      <div
                        style={
                          this.state.hover
                            ? {
                                height: "min-content",
                                opacity: "1",
                                fontSize: "14px",
                                backgroundColor: "rgb(40,20,20)",
                                display: "flex",
                                justifyContent: "center",
                                color: "white",
                                transition: ".3s ease-in"
                              }
                            : {
                                height: "0px",
                                opacity: "0",
                                fontSize: "14px",
                                backgroundColor: "rgb(40,20,20)",
                                display: "flex",
                                justifyContent: "center",
                                color: "white",
                                transition: ".3s ease-out"
                              }
                        }
                      >
                        ${pin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        <div style={{ fontSize: "5px" }}>2</div>
                      </div>
                      <div
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                          color: "grey",
                          fontSize: "13px"
                        }}
                      >
                        <div>{x.last_volume}v</div>
                        <div>{x.open_interest}oi</div>
                      </div>
                    </div>
                  );
              } else return null;
            })}
        </div>
      </div>
    );
  }
}
export default StrikeBox;
