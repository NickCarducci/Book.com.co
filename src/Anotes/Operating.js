import React from "react";

class Operating extends React.Component {
  render() {
    return (
      <div
        style={
          this.props.revenueShow || this.props.expenseShow
            ? {
                display: "flex",
                position: "relative",
                top: "0",
                height: "min-content",
                transform: "translateY(-280px)",
                width: "100%",
                transition: "transform .3s ease-out",
                flexDirection: "column"
              }
            : {
                display: "flex",
                position: "relative",
                top: "0",
                height: "min-content",
                transform: "translateY(0)",
                width: "100%",
                transition: "transform .3s ease-in",
                flexDirection: "column"
              }
        }
      >
        <div
          style={
            this.props.scrolled > 280
              ? { display: "none" }
              : {
                  display: "flex",
                  position: "relative",
                  backgroundColor: "teal",
                  borderBottom: "1px white solid",
                  height: "56px",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white"
                }
          }
        >
          <h2>
            this year
            {(this.props.revenueShow || this.props.expenseShow) &&
              `'s ${this.props.expenseShow ? "expenses" : ""}${
                this.props.revenueShow ? "revenue" : ""
              }`}
          </h2>
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
              color: "white"
            }}
          >
            \/
          </div>
        </div>
        <div
          style={
            this.props.revenueShow || this.props.expenseShow
              ? { display: "none" }
              : {
                  display: "flex",
                  position: "relative",
                  borderTop: "2px teal solid",
                  height: "168px",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white"
                }
          }
        >
          <div
            onClick={this.props.openRev}
            style={{
              display: "flex",
              position: "relative",
              backgroundColor: "white",
              height: "168px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px teal solid",
              color: "teal"
            }}
          >
            <h3>revenue</h3>
          </div>
          <div
            onClick={this.props.openExp}
            style={{
              display: "flex",
              position: "relative",
              backgroundColor: "white",
              height: "168px",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px left solid",
              color: "teal"
            }}
          >
            <h3>expenses</h3>
          </div>
        </div>
        <div
          style={
            this.props.revenueShow || this.props.expenseShow
              ? {
                  display: "none"
                }
              : {
                  display: "flex",
                  position: "relative",
                  backgroundColor: "white",
                  borderTop: "2px teal solid",
                  height: "168px",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "teal"
                }
          }
        >
          <h3>chart</h3>
        </div>
      </div>
    );
  }
}
export default Operating;
