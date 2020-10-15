import React from "react";

class NoteLookupHeader extends React.Component {
  state = {};
  render() {
    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          //pink
          backgroundColor: "rgb(240,180,250)",
          borderBottom: "1px white solid",
          height: "min-content",
          width: "100%",
          top: "0px",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          zIndex: "1",
          transform: "translateY(0%)"
        }}
      >
        <div
          onClick={() => {
            if (this.state.revenueShow || this.state.expenseShow) {
              this.setState({ revenueShow: false, expenseShow: false });
            } else {
              this.props.closeVaumoney();
            }
            this.setState({ hoveringBack: false });
            clearTimeout(this.clickBack);
            this.clickBack = setTimeout(() => {
              this.setState({ hoveringBack: true });
            }, 200);
          }}
          onMouseEnter={(e) => this.setState({ hoveringBack: true })}
          onMouseLeave={(e) => this.setState({ hoveringBack: false })}
          style={
            this.state.hoveringBack
              ? {
                  boxShadow: "0px 3px 5px 1px black",
                  marginLeft: "10px",
                  display: "flex",
                  width: "36px",
                  borderRadius: "50px",
                  height: "36px",
                  border: "1px rgb(20,20,20) solid",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgb(20,20,20)",
                  zIndex: "3",
                  transition: ".3s ease-in"
                }
              : {
                  boxShadow: "none",
                  marginLeft: "10px",
                  display: "flex",
                  width: "36px",
                  borderRadius: "50px",
                  height: "36px",
                  border: "1px rgb(20,20,20) solid",
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgb(20,20,20)",
                  zIndex: "3",
                  transition: ".3s ease-out"
                }
          }
        >
          {"<"}
        </div>
        <form
          style={{
            display: "flex",
            height: "min-content",
            left: "56px",
            width: `calc(100%)`,
            fontSize: "16px",
            backgroundColor: "none",
            border: "none",
            textIndent: "10px"
          }}
          onSubmit={this.props.submit}
        >
          <div
            onClick={this.props.shut}
            style={{
              top: "17px",
              width: "28px",
              height: "20px",
              right: "40px",
              display: "flex",
              position: "absolute",
              backgroundColor: "rgb(20,30,40)",
              borderRadius: "20px",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                height: "20px",
                right: "10.2px",
                display: "flex",
                position: "absolute",
                backgroundColor: "rgb(20,30,40)",
                borderRadius: "20px",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              &times;
            </div>
          </div>
          <input
            value={this.props.companyQuery}
            onChange={this.props.changeQuery}
            style={
              this.props.chosenExchange
                ? {
                    display: "flex",
                    height: "33px",
                    margin: "10px auto",
                    width: `calc(90%)`,
                    fontSize: "16px",
                    backgroundColor: "none",
                    border: "none",
                    textIndent: "10px",
                    userSelect: "text"
                  }
                : { display: "none" }
            }
            placeholder="Search"
          />
          <div
            style={
              !this.props.chosenExchange
                ? {
                    color: "rgb(180,220,220)",
                    alignItems: "center",
                    display: "flex",
                    height: "min-content",
                    minHeight: "33px",
                    padding: "10px",
                    left: "56px",
                    width: `100%`,
                    backgroundColor: "none",
                    border: "none",
                    textIndent: "10px",
                    fontSize: "20px"
                  }
                : { display: "none" }
            }
          >
            Please select a category
          </div>
        </form>
      </div>
    );
  }
}
export default NoteLookupHeader;
