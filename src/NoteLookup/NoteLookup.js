import React from "react";
import ChartObject from "./ChartObject";
//import ChartChain from "./ChartObject/ChartChain";
import NoteLookupHeader from "./NoteLoopupHeader";
//import BuyButton from "./BuyButton";
//import BottomChart from "./BottomChart";
//import { AddToCart, CartHasQty, CartQty } from "react-snipcart";

class NoteLookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //entry: "",
      //results: [],
      openOptionBook: "",
      options: [],
      data: {},
      shortenView: false,
      times: [],
      highlight: "",
      chosenExpiration: "",
      useFilter: "percentage",
      chosenExchange: true, //no livevol
      interval: "weekly",
      companyResults: [],
      companyQuery: "",
      exchanges: [],
      symbolsSeen: [],
      symbols: []
    };
    this.refs = [];
    this.top = React.createRef();
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  getOptions = async (x) => {
    var symbol = x;
    //&includeAllRoots=true&strikes=true
    symbol &&
      (await fetch(
        `https://sandbox.tradier.com/v1/markets/options/expirations?symbol=${symbol}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.props.bearer}`,
            Accept: "application/json"
          }
        }
      )
        .then(async (result) => await result.json())
        .then((response) => {
          var expirations = [];
          response.expirations.date.map((x) => {
            return expirations.push({ date: x });
          });
          var times = response.expirations.date;
          this.getHistory(symbol, times);
          this.setState({
            times,
            expirations
          });
        })
        .catch((response) => {
          console.log(response.message);
        }));
  };
  getHistory = async (x, times) => {
    this.initFetch(x, times);
  };
  //1&2
  initFetch = async (x, times) => {
    var urlQuotes = `https://sandbox.tradier.com/v1/markets/quotes?symbols=${x}&greeks=false`;
    await fetch(urlQuotes, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.bearer}`,
        Accept: "application/json"
      }
    })
      .then(async (result) => await result.json())
      .then(async (response) => {
        var price = response.quotes.quote;
        this.setState({
          symbolsSeen: [...this.state.symbolsSeen, response.quotes.quote],
          price
        });

        this.initHistory(x, times, price);
      })
      .catch((response) => {});
  };
  initHistory = async (x, times, price) => {
    var date = new Date(times[times.length - 1]);
    var datenotime = new Date();
    datenotime.setHours(date.getHours(), date.getMinutes(), 0, 0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var diffSecs = Math.round(
      date.getTime() - datenotime.getTime() // / 86400000
    );

    var formatted = this.formatDate(new Date());
    const url = `https://sandbox.tradier.com/v1/markets/history?symbol=${x}&interval=${
      this.state.interval
    }&start=${this.formatDate(
      new Date(new Date(formatted).getTime() - diffSecs)
    )}&end=${formatted}`;

    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.props.bearer}`,
        Accept: "application/json"
      }
    })
      .then(async (result) => await result.json())
      .then((response) => {
        var store = {
          symbol: x,
          historicalPrices: response.history.day,
          quote: price
        };
        var thisone = this.state.companyResults.find((t) => t.symbol === x);

        this.setState({
          symbols: [...this.state.symbols, store],
          thisone
        });
      })
      .catch((response) => {
        console.log(response.message);
      });
  };
  componentDidUpdate = async () => {
    if (this.state.symbol !== this.state.lastSymbol) {
      this.getOptions(this.state.symbol);
      this.setState({ lastSymbol: this.state.symbol });
    }
    if (
      this.state.chosenExpiration &&
      this.state.symbol &&
      this.state.chosenExpiration !== this.state.lastchosenExpiration
    ) {
      this.initQuotes();

      this.setState({ lastchosenExpiration: this.state.chosenExpiration });
    }
  };
  //3
  initQuotes = async () => {
    if (this.props.user !== undefined && this.props.user.paidSub) {
      clearInterval(this.counter);
      if (this.state.bigTimer > 10) {
        return this.setState({ play: false, bigTimer: 0 });
      }
      this.setState({
        bigTimer: this.state.bigTimer + 1,
        startTimer: 10,
        lastData: this.state.data[this.state.chosenExpiration]
      });
      this.counter = setInterval(() => {
        this.setState({ play: true });
        if (!document.hasFocus()) {
          this.setState({ play: false, bigTimer: 0 });
          return clearInterval(this.counter);
        }
        if (this.state.startTimer === 0) {
          if (
            this.state.data[this.state.chosenExpiration] === this.state.lastData
          ) {
            this.setState({ play: false, bigTimer: 0 });
            return clearInterval(this.counter);
          } else {
            return this.initQuotes();
          }
        } else {
          return this.setState({ startTimer: this.state.startTimer - 1 });
        }
      }, 1000);
    }

    var url = `https://sandbox.tradier.com/v1/markets/options/chains?symbol=${this.state.symbol}&expiration=${this.state.chosenExpiration}&greeks=true`;
    await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer XLMuLayiaU97CqFx7USMc78OMQeU",
        Accept: "application/json"
      }
    })
      .then(async (result) => await result.json())
      .then((response) => {
        let codes = [];
        var p = 0;
        var putTrades = 0;
        var callTrades = 0;
        var putWinners = 0;
        var callWinners = 0;
        let options = [];
        response.options.option.map((x) => {
          p++;
          var foo = { ...x };
          foo.high = x.high ? x.high : x.last;
          foo.low = x.low ? x.low : x.last;
          foo.last = x.last ? x.last : x.close;
          foo.open = x.open ? x.open : x.last;
          var price = x.close
            ? (foo.open + foo.high + foo.low + foo.close) / 4
            : (foo.last + foo.open + foo.high + foo.low) / 4;
          var addthistoputs =
            foo.option_type === "put" ? foo.volume * price : 0;
          putTrades += addthistoputs;
          var addthistocalls =
            foo.option_type === "call" ? foo.volume * price : 0;
          callTrades += addthistocalls;
          var winnerPuts =
            foo.option_type === "put" ? foo.volume * foo.last : 0;
          putWinners += winnerPuts;
          var winnerCalls =
            foo.option_type === "call" ? foo.volume * foo.last : 0;
          callWinners += winnerCalls;
          options.push(foo);
          return codes.push(foo.symbol);
        });
        options.push({
          option_type: "call",
          last: this.state.price.last,
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          isNow: true
        });
        options.push({
          option_type: "put",
          last: this.state.price.last,
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          isNow: true
        });
        if (options.length === p + 2) {
          this.setState({ codes, options });
          var x = {
            expiration: this.state.chosenExpiration,
            putTrades: Math.round(putTrades),
            callTrades: Math.round(callTrades),
            options: options,
            putWinners: Math.round(putWinners),
            callWinners: Math.round(callWinners)
          };
          var data = {
            ...this.state.data,
            [x.expiration]: {
              putTrades: x.putTrades,
              callTrades: x.callTrades,
              options: x.options
            }
          };
          this.setState({
            data
          });
        }
      })
      .catch((response) => {
        console.log(response.message);
      });
  };
  zeroPad = (value, length) => `${value}`.padStart(length, "0");
  //3
  initWebsocketQuotes = async () => {
    if (!window.WebSocket)
      return alert("WebSocket not supported by this browser");

    fetch("https://api.tradier.com/v1/markets/events/session", {
      method: "POST",
      //url: 'https://api.tradier.com/v1/markets/events/session',
      form: {},
      headers: {
        Authorization: "Bearer GSt6Derw4SH90jwqFbx0scANEEPB",
        Accept: "application/json"
      }
    })
      .then(async (response) => await response.json())
      .then((result) => {
        console.log(result);
        var stream = result.stream;
        this.quoteWS = new WebSocket(
          `wss://ws.tradier.com/v1/markets/options/chains`
        );
        this.quoteWS.onerror = (event) => {
          console.log(`error:`);
          console.log(event);
        };
        this.quoteWS.onclose = () => {
          console.log(
            `closed ${`wss://ws.tradier.com/v1/markets/options/chains?symbol=${this.state.symbol}&expiration=${this.state.chosenExpiration}&greeks=true`}`
          );
          //this.initWebsocketQuotes();
        };
        //send//
        //Version 10.15.2

        this.quoteWS.onopen = () => {
          var year = this.state.chosenExchange.split("-")[0];
          var monthday = this.state.chosenExchange.split("-")[1];
          var month = monthday.split("-")[0];
          var day = monthday.split("-")[1];
          console.log(`opened`);
          var symbols = [
            this.state.symbol + year + this.zeropad(month) + this.zeropad(day)
          ];
          //?symbol=${this.state.symbol}&expiration=${this.state.chosenExpiration}&greeks=true
          var send = JSON.stringify({
            symbols,
            //expiration:this.state.chosenExpiration,
            //greeks:true,
            sessionid: stream.sessionid,
            linebreak: true
          });
          console.log(send);
          this.quoteWS.send(send);
        };
        //receive
        this.quoteWS.onmessage = (event) => {
          console.log(event);
          const response = JSON.parse(event.data);
          console.log(response);
          if (response.event === "bts:request_reconnect") {
            //this.initWebsocketQuotes();
          } else if (response.event === "data") {
            console.log(response.data);

            let codes = [];
            var p = 0;
            var putTrades = 0;
            var callTrades = 0;
            var putWinners = 0;
            var callWinners = 0;
            let options = [];
            response.options.option.map((x) => {
              p++;
              var foo = { ...x };
              foo.high = x.high ? x.high : x.last;
              foo.low = x.low ? x.low : x.last;
              foo.last = x.last ? x.last : x.close;
              foo.open = x.open ? x.open : x.last;
              var price = x.close
                ? (foo.open + foo.high + foo.low + foo.close) / 4
                : (foo.last + foo.open + foo.high + foo.low) / 4;
              var addthistoputs =
                foo.option_type === "put" ? foo.volume * price : 0;
              putTrades += addthistoputs;
              var addthistocalls =
                foo.option_type === "call" ? foo.volume * price : 0;
              callTrades += addthistocalls;
              var winnerPuts =
                foo.option_type === "put" ? foo.volume * foo.last : 0;
              putWinners += winnerPuts;
              var winnerCalls =
                foo.option_type === "call" ? foo.volume * foo.last : 0;
              callWinners += winnerCalls;
              options.push(foo);
              return codes.push(foo.symbol);
            });
            options.push({
              option_type: "call",
              last: this.state.price.last,
              open: 0,
              high: 0,
              low: 0,
              close: 0,
              isNow: true
            });
            options.push({
              option_type: "put",
              last: this.state.price.last,
              open: 0,
              high: 0,
              low: 0,
              close: 0,
              isNow: true
            });
            if (options.length === p + 2) {
              this.setState({ codes, options });
              var x = {
                expiration: this.state.chosenExpiration,
                putTrades: Math.round(putTrades),
                callTrades: Math.round(callTrades),
                options: options,
                putWinners: Math.round(putWinners),
                callWinners: Math.round(callWinners)
              };
              var data = {
                ...this.state.data,
                [x.expiration]: {
                  putTrades: x.putTrades,
                  callTrades: x.callTrades,
                  options: x.options
                }
              };
              this.setState({
                data
              });
            }
          }
        };
      })
      .catch((err) => console.log(err));
  };
  render() {
    var priceOfBottom = this.state.symbolsSeen.find(
      (x) => x.symbol === this.state.showThisRef
    );
    if (!priceOfBottom) {
      priceOfBottom = this.state.price;
    }
    const { times, expirations, chosenExpiration, data, options } = this.state;

    var thisExpiration =
      times &&
      times.length > 0 &&
      times.find(
        (x) =>
          this.state.chosenExpiration === "" ||
          this.state.chosenExpiration === x
      );
    return (
      <div
        style={
          this.props.lookupOpen && this.state.showThisRef
            ? {
                display: "flex",
                position: "fixed",
                backgroundColor: "white",
                bottom: this.state.shortenView
                  ? "calc(60vh + 56px + 82px)"
                  : "61px",
                width: "100%",
                top: "0",
                left: "0",
                color: "rgb(20,20,20)",
                zIndex: "1",
                transition: ".3s ease-in",
                flexDirection: "column"
              }
            : this.props.lookupOpen
            ? {
                display: "flex",
                position: "fixed",
                backgroundColor: "white",
                bottom: this.state.shortenView ? "calc(60vh + 82px)" : "0px",
                width: "100%",
                top: "0",
                left: "0",
                color: "rgb(20,20,20)",
                zIndex: "1",
                transition: ".3s ease-in",
                flexDirection: "column"
              }
            : {
                display: "flex",
                position: "fixed",
                backgroundColor: "white",
                bottom: this.state.shortenView ? "calc(60vh + 82px)" : "0px",
                width: "0%",
                top: "0",
                left: "0",
                color: "white",
                opacity: "0",
                zIndex: "-1",
                transition: ".3s ease-out",
                flexDirection: "column"
              }
        }
      >
        <NoteLookupHeader
          closeVaumoney={this.props.closeVaumoney}
          changeQuery={(e) => {
            this.setState({ companyQuery: e.target.value });
          }}
          shut={() => {
            if (this.state.chosenExpiration) {
              this.setState({
                shortenView: false,
                chosenExpiration: "",
                openOptionBook: ""
              });
            } else {
              this.setState({
                shortenView: false,
                thisone: "",
                chosenExpiration: "",
                times: [],
                expirations: [],
                symbol: "",
                lastSymbol: "",
                lastQuery: "",
                price: "",
                companyQuery: "",
                companyResults: []
              });
            }
          }}
          companyQuery={this.state.companyQuery}
          chosenExchange={this.state.chosenExchange}
          submit={async (e) => {
            e.preventDefault();
            var url = "";
            if (this.state.chosenExchange !== "INDEXES") {
              url = `https://sandbox.tradier.com/v1/markets/search?q=${this.state.companyQuery}&limit=1`;
            } else {
              url = `https://sandbox.tradier.com/v1/markets/search?q=${this.state.companyQuery}&indexes=false&limit=1`;
            }
            this.setState({ lastQuery: this.state.companyQuery });
            this.state.companyQuery !== "" &&
              (await fetch(url, {
                method: "GET",
                headers: {
                  Authorization: `Bearer  ${this.props.bearer}`,
                  Accept: "application/json"
                }
              })
                .then(async (res) => await res.json())
                .then((done) => {
                  if (done.securities && done.securities.security) {
                    this.setState({ companyResults: done.securities.security });
                  } else
                    return this.setState({
                      companyResults: [
                        { symbol: this.state.companyQuery.toUpperCase() }
                      ]
                    });
                })
                .catch((err) => console.log(err.message)));
          }}
        />

        <div
          style={{
            display: "flex",
            position: "relative",
            overflowX: "hidden",
            overflowY: "auto",
            width: "100%",
            height: "100%"
          }}
        >
          <div
            ref={this.top}
            style={{
              alignItems: "center",
              display: "flex",
              position: "absolute",
              flexDirection: "column",
              width: "100%",
              height: "min-content"
            }}
          >
            {this.state.symbol === this.state.lastSymbol && this.state.thisone && (
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  backgroundColor: "rgb(20,20,20)",
                  borderBottom: "1px white solid",
                  top: "0px",
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "white",
                  height: "min-content"
                }}
              >
                <ChartObject
                  pause={
                    this.state.play
                      ? () => {
                          clearInterval(this.counter);
                          this.setState({ play: false, bigTimer: 0 });
                        }
                      : () => {
                          this.initQuotes();
                          this.setState({ play: true });
                        }
                  }
                  play={this.state.play}
                  startTimer={this.state.startTimer}
                  date={new Date()}
                  data={data}
                  chosenExpiration={chosenExpiration}
                  highlight={this.state.highlight}
                  toggleCall={
                    this.state.highlight === "call"
                      ? () => this.setState({ highlight: "" })
                      : () => this.setState({ highlight: "call" })
                  }
                  togglePut={
                    this.state.highlight === "put"
                      ? () => this.setState({ highlight: "" })
                      : () => this.setState({ highlight: "put" })
                  }
                  thisExpiration={thisExpiration}
                  times={times}
                  expirations={expirations}
                  shortenView={(x) => {
                    console.log(this.state.data[x]);
                    this.setState({ shortenView: true, chosenExpiration: x });
                  }}
                  normView={() => {
                    this.setState({
                      shortenView: false,
                      chosenExpiration: "",
                      openOptionBook: ""
                    });
                  }}
                  user={this.props.user}
                  symbols={this.state.symbols}
                  historicalPrices={this.state.historicalPrices}
                  symbolsSeen={this.state.symbolsSeen}
                  bearer={this.props.bearer}
                  price={this.state.price}
                  token={this.state.token}
                  thisone={this.state.thisone}
                  i={this.state.thisone.symbol}
                  company={true}
                  chosenExchange={this.state.chosenExchange}
                  useFilter={this.state.useFilter}
                  //

                  options={options}
                  openOptionBook={this.state.openOptionBook}
                  send={(x) => {
                    this.setState({ openOptionBook: x, shortenView: true });
                  }}
                  chooseFilter={(x) => this.setState({ useFilter: x })}
                />
                {this.state.chosenExpiration &&
                  this.state.data[this.state.chosenExpiration] &&
                  `$${
                    this.state.data[this.state.chosenExpiration].putTrades
                  } puts per average daily value`}

                {this.state.chosenExpiration &&
                  this.state.data[this.state.chosenExpiration] &&
                  `$${
                    this.state.data[this.state.chosenExpiration].callTrades
                  } calls per average daily value`}

                {this.state.openOptionBook && (
                  <div
                    style={{ color: "white", fontSize: "60px" }}
                    onClick={() => this.setState({ openOptionBook: "" })}
                  >
                    &times;
                  </div>
                )}
              </div>
            )}
            {this.state.exchanges.length > 0 &&
              this.state.exchanges.map((x) => {
                if (
                  !this.state.chosenExchange ||
                  this.state.chosenExchange === x
                ) {
                  return (
                    <div
                      key={x.code}
                      style={{
                        display: "flex",
                        position: "relative",
                        backgroundColor: "rgb(180,220,220)",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "min-content",
                        padding: "10px 0px",
                        margin: "2px 5px",
                        width: `calc(100% - 20px)`,
                        border: "none",
                        textIndent: "10px",
                        fontSize: "20px"
                      }}
                      onClick={() => this.setState({ chosenExchange: x })}
                    >
                      {x.name}
                    </div>
                  );
                } else return null;
              })}
            {this.state.companyQuery !== "" &&
            this.state.companyQuery !== this.state.lastQuery ? (
              <div>Press enter to search</div>
            ) : this.state.companyResults ? (
              this.state.companyResults.map((i, index) => {
                if (i && i.symbol && index < 2) {
                  if (this.state.symbol === i.symbol) {
                    return null;
                    /*(
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          position: "relative",
                          backgroundColor: "rgb(20,20,20)",
                          borderBottom: "1px white solid",
                          top: "0px",
                          width: "100%",
                          alignItems: "center",
                          flexDirection: "column",
                          color: "white",
                          zIndex: "9999",
                          height: "min-content"
                        }}
                        ref={this.refs[index]}
                      >
                        <ChartObject
                          user={this.props.user}
                          symbols={this.state.symbols}
                          historicalPrices={this.state.historicalPrices}
                          symbolsSeen={this.state.symbolsSeen}
                          bearer={this.props.bearer}
                          price={this.state.price}
                          key={index}
                          token={this.state.token}
                          i={i.symbol}
                          company={true}
                          chosenExchange={this.state.chosenExchange}
                        />
                      </div>
                    );*/
                  } else if (!this.state.symbol) {
                    return (
                      <div onClick={() => this.setState({ symbol: i.symbol })}>
                        {i.symbol}
                      </div>
                    );
                  } else return null;
                } else return null;
              })
            ) : null}
            <div
              style={
                this.state.chosenExchange &&
                this.state.showThisRef &&
                !this.state.scrollingDown
                  ? {
                      display: "flex",
                      position: "fixed",
                      color: "rgb(20,20,20)",
                      borderBottom: "1px white solid",
                      bottom: "0px",
                      width: "100%",
                      alignItems: "center",
                      flexDirection: "column",
                      backgroundColor: "white",
                      zIndex: "9999",
                      height: "56px",
                      justifyContent: "center"
                    }
                  : { display: "none" }
              }
            >
              {this.state.showThisRef}&nbsp;
              {priceOfBottom && priceOfBottom.last}
              {/*historicalPrices && (
                {<BottomChart historicalPrices={historicalPrices} />}
              )*/}
            </div>
            <div
              style={{
                color: "rgb(60,60,60)",
                lineHeight: "23px",
                border: "1px solid",
                margin: "10px",
                padding: "13px 30px",
                backgroundColor: "rgb(242,230,230)"
              }}
            >
              <div>results aren't per exchange yet</div>
              <div>some calculations may be incorrect as I develop</div>
              suggestions: <b>squeezemetrics.com/monitor/dix</b>
              <br />
              <b>vixcentral.com</b> historical{" > "}multiple{" > "}add terms
              {" > "}previous date
              <br />
              affiliates: <b>r/wallstreetvol</b> &bull; <b>hibit.cc</b> &bull;{" "}
              <b>2024nj.com/carducci</b>
            </div>
            {/*this.state.chosenExchange && (
              <div onClick={() => this.setState({ chosenExchange: null })}>
                &times;
              </div>
            )*/}
            <div>
              <br />
              <img
                style={{
                  width: "100%"
                }}
                src="https://www.dl.dropboxusercontent.com/s/otubfgnbs9hhrvs/OptionsTheta.png?dl=0"
                alt="options' theta-selling probability goes from 1 to 50 percent from In the Money to Out in time and strike"
              />
            </div>
            <br />
            {/*<BuyButton />*/}
            {/*<AddToCart
                style={
                  this.state.hoveringLive
                    ? {
                        boxShadow: "0px 3px 5px 1px black",
                        border: "1px solid black",
                        borderRadius: "50px",
                        color: "black",
                        backgroundColor: "white",
                        height: "56px",
                        padding: "0px 20px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        width: "max-content",
                        transition: ".3s ease-in"
                      }
                    : {
                        boxShadow: "none",
                        border: "1px solid black",
                        borderRadius: "50px",
                        color: "black",
                        backgroundColor: "white",
                        height: "56px",
                        padding: "0px 20px",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        width: "max-content",
                        transition: ".3s ease-out"
                      }
                }
                data={{
                  id: "2023 expiration",
                  name: "2023 expiration",
                  url: "/",
                  price: "200.00",
                  openCart: true,
                  description: "Get real-time updates until January 01, 2023",
                  image: "/src/froth.png",
                  "custom1-name": "Feature requests",
                  "custom1-type": "textarea",
                  "max-quantity": "1"
                }}
              >
                Get this live for $200 until 2023
              </AddToCart>
            <div>
              <button
                style={{
                  left: "85px",
                  bottom: "90px",
                  display: "flex",
                  position: "fixed"
                }}
                //class="snipcart-add-item"
                id="snipcart-checkout"
              >
                Checkout
              </button>
              <span id="snipcart-items-count"></span>
              <span id="snipcart-total-price"></span>
              {/*<div
                id="snipcart"
                data-api-key="N2EyNDljODMtNGE2My00NGRmLWI5ZWQtNTI2YmUxMTlmMGY2NjM3MzcxODk3OTA0MDM5NTUw"
              />
            </div>*/}
            <br />
            {/*} <div
              onClick={() => {
                this.setState({ hoveringTrade: false });
                clearTimeout(this.clickTrade);
                this.clickTrade = setTimeout(() => {
                  this.setState({ hoveringTrade: true });
                }, 200);
              }}
              onMouseEnter={(e) => this.setState({ hoveringTrade: true })}
              onMouseLeave={(e) => this.setState({ hoveringTrade: false })}
              style={
                this.state.hoveringTrade
                  ? {
                      boxShadow: "0px 3px 5px 1px black",
                      border: "1px solid black",
                      borderRadius: "50px",
                      color: "white",
                      backgroundColor: "rgb(80,160,255)",
                      height: "56px",
                      padding: "0px 20px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      width: "max-content",
                      transition: ".3s ease-in"
                    }
                  : {
                      boxShadow: "none",
                      border: "1px solid black",
                      borderRadius: "50px",
                      color: "white",
                      backgroundColor: "rgb(80,160,255)",
                      height: "56px",
                      padding: "0px 20px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      width: "max-content",
                      transition: ".3s ease-out"
                    }
              }
            >
              Trade commission free with Tradier for $50 month
            </div>*/}
            <br />
            Your positions may be seen by others
            <br />
            nick@froth.app
            <br />
            <br />
            <br />
          </div>
        </div>
        <div
          style={
            this.state.chosenExpiration
              ? {
                  backgroundColor: "navy",
                  zIndex: "9999",
                  top: "0px",
                  right: "0px",
                  position: "absolute",
                  display: "flex",
                  width: "36px",
                  height: "36px",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "30px"
                }
              : {
                  display: "none"
                }
          }
          onClick={() => {
            this.setState({
              shortenView: false,
              chosenExpiration: "",
              openOptionBook: ""
            });
          }}
        >
          &times;
        </div>
      </div>
    );
  }
}
export default NoteLookup;
/*[
            "ETF",
            "MUTUAL_FUND",
            "COMMODITY",
            "INDEX",
            "CRYPTO",
            "FOREX",
            "TSX",
            "AMEX",
            "NASDAQ",
            "NYSE",
            "EURONEXT"
          ]*/
/*onSubmit={async e => {
              e.preventDefault();
              var entry = this.state.companyQuery;
              this.setState({ lastQuery: entry });
              entry !== "" &&
                (await fetch(
                  `https://financialmodelingprep.com/api/v3/search?query=${entry}&limit=10&exchange=${
                    this.state.chosenExchange
                  }&apikey=dfcaf2b502650848710c60d241be551f`
                )
                  .then(async res => await res.json())
                  .then(done => {
                    var companyResults = done;
                    this.setState({ companyResults });
                  })
                  .catch(err => console.log(err)));
            }}*/
/**
 * 
  componentDidMount = async () => {
    var symbol = this.props.i;
    await fetch(
      `https://sandbox.tradier.com/v1/markets/options/exchanges?symbol=TBT`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer  ${this.props.bearer}`,
          Accept: "application/json"
        }
      }
    )
      .then(async result => await result.json())
      .then(response => {
        console.log(response.exchanges.date);
        this.setState({ exchanges: response.exchanges.date });
      })
      .catch(response => {
        console.log(response);
      });
  };
 */

/*componentDidMount = async () => {
    await fetch(`https://sandbox.livevol.com/id/connect/token`, {
      body:
        "grant_type=client_credentials&client_id=nick@froth.app_api_client_1593119569&client_secret=d5b54b9594be49a2b34e15c43beb8840",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST"
    })
      .then(async (result) => await result.json())
      .then(async (response) => {
        var token = response.access_token;
        this.setState({ token });
        await fetch(`https://sandbox.livevol.com/api/v1/market/exchanges`, {
          headers: { Authorization: "Bearer " + token },
          method: "GET"
        })
          .then(async (result) => await result.json())
          .then((response) => {
            this.setState({ exchanges: response });
          })
          .catch((response) => {
            console.log(response);
          });
      })
      .catch((response) => {
        console.log(response);
      });

    /*var sc = document.getElementById("sc");

    sc.type = "text/html";
    sc.async = true;
    sc.innerHTML = `<div
      hidden
      id="snipcart"
      data-api-key="N2EyNDljODMtNGE2My00NGRmLWI5ZWQtNTI2YmUxMTlmMGY2NjM3MzcxODk3OTA0MDM5NTUw"
    ></div>`;*/

// var subscribe = document.getElementById("snipcart-add-item");
//   subscribe.classList.add("snipcart-add-item");

/*document.addEventListener("snipcart.ready", this.readySnipcart);
    const snipcart = window.Snipcart;
    console.log(snipcart);
    snipcart.events.on("item.added", (cartItem) => {
      console.log(cartItem);
    });
    var itemCount = document.getElementById("snipcart-items-count");
    itemCount.classList.add("snipcart-items-count");

    var total = document.getElementById("snipcart-total-price");
    total.classList.add("snipcart-total-price");

    var checkout = document.getElementById("snipcart-checkout");
    checkout.classList.add("snipcart-checkout");
    
    var subscribe = document.getElementById("snipcart-add-item");
    //subscribe.classList.add("snipcart-add-item");

    var subscribe = document.getElementById("sc");
    
    subscribe.type = "text/html";
    subscribe.async = true;
    subscribe.innerHTML = `<div
      hidden
      id="snipcart"
      data-api-key="N2EyNDljODMtNGE2My00NGRmLWI5ZWQtNTI2YmUxMTlmMGY2NjM3MzcxODk3OTA0MDM5NTUw"
    ></div>`
    subscribe.type = "text/html";
    subscribe.async = true;
    subscribe.innerHTML = `<div style={{height:"min-content}}
    class="snipcart-add-item"
    data-item-id="2023 expiration"
    data-item-price="200.00"
    //{"usd": 20,"cad": 25}
    data-item-url="/"
    data-item-description="Get real-time updates until January 01, 2023"
    data-item-image="/src/froth.png"
    data-item-name="2023 expiration"
    data-item-custom1-name="Feature requests"
    data-item-custom1-type="textarea"
    data-item-max-quantity="1">Get this live for $200 until 2023</div>`;/

    //document.addEventListener("snipcart.ready", this.readySnipcart);
};*/
/*readySnipcart = () => {
    // You can safely use window.Snipcart here
    const snipcart = window.Snipcart;
    console.log(snipcart);
    snipcart.events.on(() => {
      //console.log(snipcart.json());
      this.setState({ snipcart });
    });

    snipcart.events.on("item.added", (cartItem) => {
      console.log(cartItem);
    });
    snipcart.events.on("item.updated", (cartItem) => {
      console.log(cartItem);
    });
    snipcart.events.on("item.removed", (cartItem) => {
      console.log(cartItem);
    });
  };
  componentWillUnmount = () => {
    window.removeEventListener("snipcart.ready", this.readySnipcart);
    const unsubscribe = window.Snipcart.events.on("item.added", (cartItem) => {
      console.log(cartItem);
    });
    unsubscribe();
  };*/

/*
  //2
  initWebsocketHistory = (x, times, price) => {
    var date = new Date(times[times.length - 1]);
    var datenotime = new Date();
    datenotime.setHours(date.getHours(), date.getMinutes(), 0, 0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    var diffSecs = Math.round(
      date.getTime() - datenotime.getTime() // / 86400000
    );

    var formatted = this.formatDate(new Date());
    const url = `wss://ws.tradier.com/v1/markets/history?symbol=${x}&interval=${
      this.state.interval
    }&start=${this.formatDate(
      new Date(new Date(formatted).getTime() - diffSecs)
    )}&end=${formatted}`;

    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          event: "bts:subscribe",
          data: {
            channel: "order_book_btcusd"
          }
        })
      );
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.event === "data") {
        console.log(response.data);
        var store = {
          symbol: x,
          historicalPrices: response.history.day,
          quote: price
        };
        var thisone = this.state.companyResults.find((t) => t.symbol === x);

        this.setState({
          symbols: [...this.state.symbols, store],
          thisone
        });
      } else if (response.event === "bts:request_reconnect") {
        this.initWebsocketHistory(x, times, price);
      }
    };
    ws.onclose = () => {
      this.initWebsocketHistory(x, times, price);
    };
  };*/
