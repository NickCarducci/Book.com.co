import React from "react";

class ChartResult extends React.Component {
  state = {};
  get = async () => {
    await fetch(
      `https://sandbox.livevol.com/api/v1/delayed/time-and-sales/option-trades-with-greeks?symbol=${
        this.props.openOptionBook.symbol
      }&exchange_id=${
        this.props.chosenExchange.id
      }&condition_id=0&min_size=5&max_size=100&min_price=0.25&max_price=300&start_sequence_number=0&limit=10&order_by_time=ASC&min_time=09:30:00.001&max_time=10:00:00.001&date=2019-01-18`,
      {
        headers: { Authorization: "Bearer " + this.props.token },
        method: "GET"
      }
    )
      .then(async result => await result.json())
      .then(response => {
        //console.log("response:");
        //console.log(response);
        this.setState({ error: response.error });
      })
      .catch(response => {
        //console.log(response);
        this.setState({ error: response.error });
      });
  };
  componentDidMount = async () => {
    //console.log("request:");
    //console.log(this.props.openOptionBook);
    //console.log(this.props.chosenExchange);
    this.get();
  };
  componentDidUpdate = async prevProps => {
    if (this.props.openOptionBook !== prevProps.openOptionBook) {
      this.get();
    }
  };
  render() {
    return <div>{this.state.error}, like CBOE</div>;
  }
}
export default ChartResult;
