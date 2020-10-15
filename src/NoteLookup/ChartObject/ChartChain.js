import React from "react";
import StrikeBox from "./CallOrPut/StrikeBox";

class ChartChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null,
      all: []
    };
    this.go = React.createRef();
  }

  check = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
  };
  componentWillUnmount = () => {
    this.state.ws && this.state.ws.close();
  };
  connect = async (symbol) => {
    await fetch(`https://sandbox.tradier.com/v1/markets/events/session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.props.bearer}`,
        Accept: "application/json",
        "Content-length": "0"
      }
    })
      .then(async (result) => await result.text())
      .then((response) => {
        console.log(response);
        var ws = new WebSocket("wss://ws.tradier.com/v1/markets/events");
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
          console.log("connected to main websocket");

          ws.send(
            `{"symbol": "${symbol}","expiration":"${this.props.chosenExpiration}","greeks":"true","sessionid":"${response.stream.sessionid}"}`
          );

          this.setState({ ws: ws });

          that.timeout = 250; // reset timer to 250 on open of websocket connection
          clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = (e) => {
          console.log(
            `Socket is closed. Reconnect will be attempted in ${Math.min(
              10000 / 1000,
              (that.timeout + that.timeout) / 1000
            )} second.`,
            e.reason
          );

          that.timeout = that.timeout + that.timeout; //increment retry interval
          connectInterval = setTimeout(
            this.check,
            Math.min(10000, that.timeout)
          ); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = (err) => {
          console.error(err);

          ws.close();
        };
        ws.onmessage = (pass) => {
          console.log(pass);
        };
      })
      .catch((response) => {
        console.log(response.message);
      });
  };
  componentDidUpdate = (prevProps) => {
    if (
      this.props.rollChained !== prevProps.rollChained ||
      this.props.highlight !== prevProps.highlight ||
      this.props.options !== prevProps.options ||
      this.props.useFilter !== prevProps.useFilter ||
      this.props.chosenExpiration !== prevProps.chosenExpiration
    ) {
      setTimeout(
        () =>
          this.go.current.scrollIntoView({
            behavior: "smooth"
          }),
        200
      );
    }
  };
  render() {
    const { options } = this.props;
    return (
      <div
        onClick={() => this.go.current.scrollIntoView()}
        style={{
          boxShadow: "inset 0px 10px 5px 1px rgb(70,70,120)",
          display: "flex",
          position: "relative",
          height: this.props.rollChained ? "calc(100vh - 120px)" : "calc(60vh)",
          bottom: "0px",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        <div
          style={{
            boxShadow:
              this.props.highlight === ""
                ? "inset 0px -150px 40vh 20vh rgb(200,200,200)"
                : "inset 0px -100px 20vh 10vh rgb(200,200,200)",
            zIndex: "-1",
            flexDirection: "column",
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "min-content",
            transform: "rotate(180deg)"
          }}
        >
          <div style={{ width: "100vw" }} ref={this.go} />
          <div
            style={{
              position: "relative",
              top: "-15px",
              paddingTop: "20px",
              display: "flex"
            }}
          >
            <StrikeBox
              useFilter={this.props.useFilter}
              highlight={this.props.highlight}
              bought={this.state.putWinners}
              optionType="call"
              price={this.props.price}
              openOptionBook={this.props.openOptionBook}
              send={this.props.send}
              options={options}
              token={this.props.token}
              i={this.props.i}
              chosenExpiration={this.props.chosenExpiration}
              chosenExchange={this.props.chosenExchange}
            />
            <StrikeBox
              useFilter={this.props.useFilter}
              highlight={this.props.highlight}
              bought={this.state.callWinners}
              optionType="put"
              price={this.props.price}
              openOptionBook={this.props.openOptionBook}
              send={this.props.send}
              options={options}
              token={this.props.token}
              i={this.props.i}
              chosenExpiration={this.props.chosenExpiration}
              chosenExchange={this.props.chosenExchange}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ChartChain;
