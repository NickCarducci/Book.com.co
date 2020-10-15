import React from "react";

class StrikeCallExp extends React.Component {
  state = { openOptionBook: "", lastChosenCode: "" };
  percentToColor(weight) {
    var color1 = [100, 250, 150];
    var color2 = [0, 150, 50];
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
    var color2 = [250, 250, 250];
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
  render() {
    const { options, openOptionBook } = this.props;
    if (options) {
      if (this.state.useFiter !== "vega") {
        options.sort(
          (a, b) =>
            b.volume * (b.last + b.open + b.high + b.low + b.close / 5) -
            a.volume * (a.last + a.open + a.high + a.low + a.close / 5)
        );
      } else {
        options.sort((a, b) => b.greeks.vega - a.greeks.vega);
      }
    }

    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "50%",
          height: "min-content",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <div onClick={() => this.setState({ useFiter: "spent" })}>
          volume * ((last + open + high + low + close) / 5)
        </div>
        <div style={{ width: "100%" }} />
        <div onClick={() => this.setState({ useFiter: "vega" })}>vega</div>
        <div style={{ width: "100%" }} />
        {options &&
          options.length > 0 &&
          options.map((x, index) => {
            var b = this.props.price;
            if (b) {
              if (
                (openOptionBook === "" || openOptionBook.symbol === x.symbol) &&
                x.option_type === this.props.optionType &&
                x.bid !== 0 &&
                Math.round(
                  x.volume * (x.last + x.open + x.high + x.low + x.close / 5)
                ) !== 0 &&
                x.last
              ) {
                var optionsPrice =
                  (x.last + x.open + x.high + x.low + x.close) / 5;
                var underlyingPrice =
                  (b.last + b.open + b.high + b.low + b.close) / 5;
                var spentToday = x.volume * optionsPrice;
                var spentAlready = x.open_interest * optionsPrice;
                var solve = spentToday / spentAlready;
                var round = Math.ceil(solve * 100) / 100;
                var color = isFinite(round)
                  ? round < 0.4
                    ? "white"
                    : "black"
                  : "pink";
                var backgroundColor = isFinite(round)
                  ? `rgb(${this.percentToColor2(1 - round)})`
                  : "#333";

                return (
                  <div
                    onClick={() => this.props.send(x)}
                    style={{
                      border: "3px solid black",
                      backgroundColor: "#333",
                      margin: "3px"
                    }}
                  >
                    <div>
                      $
                      {Math.round(
                        x.volume *
                          (x.last + x.open + x.high + x.low + x.close / 5)
                      )}
                    </div>

                    <div
                      style={{
                        color: `rgb(${this.percentToColor(
                          optionsPrice / underlyingPrice
                        )})`
                      }}
                    >
                      {x.option_type}&nbsp;{x.strike}
                    </div>
                    <div
                      style={{
                        color: `rgb${this.percentToColor1(
                          x.last / this.props.winners
                        )}`
                      }}
                    >
                      ${x.last}
                    </div>
                    <div
                      style={{
                        backgroundColor: backgroundColor,
                        color: color
                      }}
                    >
                      {x.volume}
                      <br />
                      {Math.ceil(
                        ((x.volume * optionsPrice) /
                          (x.open_interest * optionsPrice)) *
                          100
                      ) / 100}
                    </div>
                  </div>
                );
              } else return null;
            } else return null;
          })}
      </div>
    );
  }
}
export default StrikeCallExp;
