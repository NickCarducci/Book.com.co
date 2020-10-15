import React from "react";

class CashHeader extends React.Component {
  render() {
    return (
      <div
        style={
          this.props.revenueShow || this.props.expenseShow
            ? {
                display: "flex",
                position: "relative",
                height: "min-content",
                top: "0",
                transform: "translateY(-280px)",
                width: "100%",
                transition: "transform .3s ease-out",
                flexDirection: "column"
              }
            : {
                display: "flex",
                position: "relative",
                height: "min-content",
                top: "0",
                transform: "translateY(0)",
                width: "100%",
                transition: "transform .3s ease-in",
                flexDirection: "column"
              }
        }
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "white",
            borderBottom: "1px white solid",
            height: "56px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "teal"
          }}
        >
          <h2>${this.props.balance}</h2>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "20px",
              width: "36px",
              height: "36px",
              backgroundColor: "teal",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "5px",
              color: "white",
              fontSize: "30px"
            }}
          >
            +
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "white",
            borderTop: "2px teal solid",
            height: "168px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "teal"
          }}
        >
          <h3>chart</h3>
        </div>
      </div>
    );
  }
}

export default CashHeader;
