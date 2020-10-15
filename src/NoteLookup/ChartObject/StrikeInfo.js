import React from "react";
import ChartChain from "./ChartChain";

class StrikeInfo extends React.Component {
  state = {};
  componentDidUpdate = (prevProps) => {
    if (this.props.startTimer !== prevProps.startTimer) {
      this.setState({ new: true });
      setTimeout(() => this.setState({ new: false }), 600);
    }
  };
  render() {
    const { x, data, per, diffDays, renderDate, chosenExpiration } = this.props;
    return (
      <div
        style={
          data[chosenExpiration]
            ? {
                zIndex: "9999",
                backgroundColor: "white",
                top: this.state.rollChained ? "0px" : "",
                bottom: "0px",
                height: this.state.rollChained ? "100%" : "calc(60vh + 82px)",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                color: `rgb(${per})`,
                width: "100%"
              }
            : {
                position: "relative",
                height: "min-content",
                display: "flex",
                color: `rgb(${per})`
              }
        }
        key={chosenExpiration}
      >
        <div
          style={
            data[chosenExpiration]
              ? { zIndex: "9999", display: "flex", position: "relative" }
              : { display: "none" }
          }
        >
          <ChartChain
            options={this.props.options}
            useFilter={this.props.useFilter}
            highlight={this.props.highlight}
            user={this.props.user}
            bearer={this.props.bearer}
            price={this.props.price}
            openOptionBook={this.props.openOptionBook}
            send={this.props.send}
            token={this.props.token}
            i={this.props.symbol}
            chosenExpiration={this.props.chosenExpiration}
            chosenExchange={this.props.chosenExchange}
            rollChained={this.state.rollChained}
          />
        </div>
        <div
          style={
            data[chosenExpiration]
              ? {
                  width: "100%",
                  zIndex: "9999",
                  display: "flex",
                  position: "relative",
                  height: "42px",
                  top: "0px"
                }
              : { display: "none" }
          }
        >
          <div
            style={
              this.props.useFilter === "percentage"
                ? {
                    height: "min-content",
                    display: "flex",
                    padding: "5px",
                    margin: "5px",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "10px",
                    backgroundColor: "navy",
                    transition: ".3s ease-in"
                  }
                : {
                    border: "1px dotted grey",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    color: "rgb(20,20,20)",
                    transition: ".3s ease-out"
                  }
            }
            onClick={() => this.props.chooseFilter("percentage")}
          >
            %
          </div>
          <div
            style={
              this.props.useFilter === "spent"
                ? {
                    height: "min-content",
                    display: "flex",
                    padding: "5px",
                    margin: "5px",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "10px",
                    backgroundColor: "navy",
                    transition: ".3s ease-in"
                  }
                : {
                    border: "1px dotted grey",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    color: "rgb(20,20,20)",
                    transition: ".3s ease-out"
                  }
            }
            onClick={() => this.props.chooseFilter("spent")}
          >
            OHL
            <br />
            *Volume
            <strong
              style={
                this.props.useFilter === "spent"
                  ? { fontSize: "18px", transition: ".3s ease-in" }
                  : { fontSize: "8px", transition: ".3s ease-out" }
              }
            >
              2
            </strong>
            {
              //volume * ((last + open + high + low + close) / 5)
            }
          </div>
          <div
            style={
              this.props.useFilter === "sos"
                ? {
                    height: "min-content",
                    display: "flex",
                    padding: "5px",
                    margin: "5px",
                    justifyContent: "center",
                    color: "white",
                    borderRadius: "10px",
                    backgroundColor: "navy",
                    transition: ".3s ease-in"
                  }
                : {
                    border: "1px dotted grey",
                    padding: "5px",
                    display: "flex",
                    justifyContent: "center",
                    color: "rgb(20,20,20)",
                    transition: ".3s ease-out"
                  }
            }
            onClick={() => this.props.chooseFilter("sos")}
          >
            " ":OHL*OI<div style={{ fontSize: "5px" }}>1</div>
            {
              //volume * ((last + open + high + low + close) / 5)
            }
          </div>
          <div>
            <div
              style={
                this.props.useFilter === "strike"
                  ? {
                      height: "min-content",
                      display: "flex",
                      padding: "5px",
                      margin: "5px",
                      justifyContent: "center",
                      color: "white",
                      borderRadius: "10px",
                      backgroundColor: "navy",
                      transition: ".3s ease-in"
                    }
                  : {
                      border: "1px dotted grey",
                      display: "flex",
                      padding: "5px",
                      color: "rgb(20,20,20)",
                      transition: ".3s ease-out"
                    }
              }
              onClick={() => this.props.chooseFilter("strike")}
            >
              byStrike
            </div>
          </div>
          {this.props.user !== undefined && this.props.user.paidSub && (
            <div
              onClick={this.props.pause}
              style={
                this.state.new
                  ? {
                      color: "navy",
                      fontSize: "20px",
                      opacity: "1",
                      transition: ".5s ease-in"
                    }
                  : {
                      color: "navy",
                      fontSize: "20px",
                      opacity: ".3",
                      transition: ".5s ease-out"
                    }
              }
            >
              &nbsp;{this.props.startTimer}&nbsp;{this.props.play ? "| |" : ">"}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            bottom: "0px",
            marginBottom: "5px",
            justifyContent: "center",
            alignItems: "center",
            color: `rgb(${per})`,
            width: "100%"
          }}
          key={chosenExpiration}
        >
          <div
            onClick={
              this.state.rollChained
                ? () => this.setState({ rollChained: false })
                : () => this.setState({ rollChained: true })
            }
            style={
              //333
              data[chosenExpiration]
                ? this.state.rollChained
                  ? {
                      padding: "5px",
                      margin: "5px",
                      borderRadius: "10px",
                      backgroundColor: "navy",
                      color: "white",
                      position: "fixed",
                      zIndex: "9999",
                      left: "20px",
                      transition: ".3s ease-in",
                      transform: "rotate(180deg)"
                    }
                  : {
                      color: "navy",
                      position: "fixed",
                      zIndex: "9999",
                      left: "20px"
                    }
                : { display: "none" }
            }
          >
            &#8593;
          </div>
          <div
            style={
              data[x]
                ? {
                    left: "50%",
                    paddingRight: "10px",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }
                : {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }
            }
          >
            <div
              onClick={() => this.props.chooseExpiration(chosenExpiration)}
              style={
                data[chosenExpiration]
                  ? {
                      padding: "0px 20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px white solid",
                      opacity: per,
                      width: "100%"
                    }
                  : {
                      padding: "0px 20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px white solid",
                      opacity: per,
                      width: "max-content"
                    }
              }
            >
              in {diffDays + 1} days
              <br />
              {renderDate(x)}
            </div>
            &nbsp;
            <div
              onClick={this.props.togglePut}
              style={
                this.props.highlight === "put"
                  ? {
                      borderRadius: "20px",
                      backgroundColor: "white",
                      display: "flex",
                      color: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: ".3s ease-in"
                    }
                  : {
                      borderRadius: "20px",
                      backgroundColor: "white",
                      display: "flex",
                      color: "grey",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: ".3s ease-out"
                    }
              }
            >
              {data[chosenExpiration] && "Puts"}
              <br />
              {data[chosenExpiration] &&
                ` $${data[chosenExpiration].putTrades
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </div>
            &nbsp;
            <div
              onClick={this.props.toggleCall}
              style={
                this.props.highlight === "call"
                  ? {
                      borderRadius: "20px",
                      backgroundColor: "white",
                      display: "flex",
                      color: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: ".3s ease-in"
                    }
                  : {
                      borderRadius: "20px",
                      backgroundColor: "white",
                      display: "flex",
                      color: "grey",
                      justifyContent: "center",
                      alignItems: "center",
                      transition: ".3s ease-out"
                    }
              }
            >
              {data[chosenExpiration] && "Calls"}
              <br />
              {data[chosenExpiration] &&
                ` $${data[chosenExpiration].callTrades
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StrikeInfo;
