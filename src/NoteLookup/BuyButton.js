import React from "react";

class BuyButton extends React.Component {
  state = {};
  /*componentDidMount = () => {
    var subscribe = document.getElementById("snipcart-add-item");
    subscribe.classList.add("snipcart-add-item");
  };*/

  render() {
    return (
      <div
        style={{ position: "relative", width: "min-content" }}

        /*id="snipcart-add-item"
        class="snipcart-add-item"
        data-item-id="2023 expiration"
        data-item-price="200.00"
        //{"usd": 20,"cad": 25}
        data-item-url="/"
        data-item-description="Get real-time updates until January 01, 2023"
        data-item-image="https://www.dl.dropboxusercontent.com/s/u9kahqiqiiqse5t/froth%20logo300150.png?dl=0"
        data-item-name="2023 expiration"
        data-item-custom1-name="Feature requests"
        data-item-custom1-type="textarea"
        data-item-max-quantity="1"*/
      >
        {/*<Helmet>
          <meta name="class" content="snipcart-add-item" />
          <meta name="data-item-id" content="2023 expiration" />
          <meta name="data-item-price" content="200.00" />
          <meta name="data-item-url" content="/" />
          <meta
            name="data-item-description"
            content="Get real-time updates until January 01, 2023"
          />
          <meta
            name="data-item-image"
            content="https://www.dl.dropboxusercontent.com/s/u9kahqiqiiqse5t/froth%20logo300150.png?dl=0"
          />
          <meta name="data-item-name" content="2023 expiration" />
          <meta name="data-item-custom1-name" content="Feature requests" />
          <meta name="data-item-custom1-type" content="textarea" />
          <meta name="data-item-max-quantity" content="1" />
        </Helmet>*/}
        <div
          onClick={() => {
            this.setState({ hoveringLive: false });
            clearTimeout(this.clickLive);
            this.clickLive = setTimeout(() => {
              this.setState({ hoveringLive: true });
              window.location.href = "https://checkout.chec.io/froth";
            }, 200);
          }}
          onMouseEnter={(e) => this.setState({ hoveringLive: true })}
          onMouseLeave={(e) => this.setState({ hoveringLive: false })}
          style={
            this.state.hoveringLive
              ? {
                  flexDirection: "column",
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
                  flexDirection: "column",
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
        >
          Get this live* for $200 until 2023
          <div style={{ color: "grey", fontSize: "13px" }}>
            *10 second chains
          </div>
        </div>
      </div>
    );
  }
}

export default BuyButton;
