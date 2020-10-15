import React from "react";
import Profile from "./Profile/Profile";
import Subscribe from "./Subscribe";

import NoteLookup from "./NoteLookup/NoteLookup";

import "./styles.css";
import froth from "./froth.png";

export default class Froth extends React.Component {
  constructor(props) {
    super(props);
    var bearer = "XLMuLayiaU97CqFx7USMc78OMQeU";
    this.state = {
      lookupOpen: true,
      width: "100%",
      bearer
    };
    this.doo = React.createRef();
  }
  refresh = () => {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      var width = window.innerWidth; // * 0.15;
      var height = window.innerHeight; // * 0.15;
      this.setState({
        width,
        height
      });
    }, 50);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.refresh);
  };
  componentDidMount() {
    window.addEventListener("resize", this.refresh, true); //This should be debounced
    //this.props.auth !== undefined &&
  }
  render() {
    return (
      <div
        ref={this.doo}
        style={{
          display: "flex",
          position: "fixed",
          fontFamily: "sans-serif",
          textAlign: "center",
          height: "100vh",
          width: "100%",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            padding: "0px 5px",
            paddingRight: "10px",
            display: "flex",
            position: "relative",
            backgroundColor: "rgb(200,240,255)", //"rgb(140,180,150)",
            borderBottom: "1px white solid",
            height: "56px",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white"
          }}
        >
          <h1
            onClick={() => this.setState({ lookupOpen: true })}
            style={{
              borderLeft: "4px solid",
              paddingLeft: "5px",
              color: "rgb(20,30,40)"
            }}
          >
            Notes
          </h1>
          <a href="https://froth.app">
            <img
              src={froth}
              style={{
                display: "flex",
                position: "relative",
                width: "36px",
                borderRadius: "50px",
                height: "36px",
                border: "1px white solid",
                backgroundColor: "rgb(20,20,40)",
                alignItems: "center",
                justifyContent: "center",
                color: "white"
              }}
              alt="error"
            />
          </a>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            color: "rgb(20,30,40)",
            backgroundColor: "rgb(200,200,200)",
            height: "56px",
            top: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h2>Industries</h2>
          <div
            onClick={
              this.props.auth === undefined
                ? () => this.setState({ openSubscription: true })
                : () => this.setState({ openProfile: true })
            }
            style={{ position: "absolute", right: "20px" }}
          >
            {this.props.auth === undefined
              ? "Sub"
              : this.props.user && this.props.user.username}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "rgb(20,20,40)",
            height: "100%",
            //height: "calc(100% - 168px)",
            top: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}
        >
          <h2>List</h2>
        </div>
        {/*<div
          style={{
            display: "flex",
            position: "fixed",
            backgroundColor: "rgb(20,20,40)",
            width: "100%",
            height: "56px",
            bottom: "0",
            left: "0",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}
        >
          <h2>EarningsAlerts</h2>
        </div>*/}
        <NoteLookup
          user={this.props.user}
          bearer={this.state.bearer}
          width={this.state.width}
          lookupOpen={this.state.lookupOpen}
          closeVaumoney={() => this.setState({ lookupOpen: false })}
        />
        <Subscribe
          pleaseClose={() =>
            this.setState({
              openSubscription: false
            })
          }
          auth={this.props.auth}
          user={this.props.user}
          users={this.props.users}
          openSubscription={this.state.openSubscription}
        />
        {this.props.user && (
          <Profile
            jwt={this.props.jwt}
            close={() => this.setState({ openProfile: false })}
            askLanguage={this.state.askLanguage}
            askLanguager={() => this.setState({ askLanguage: true })}
            closeAskLang={() => this.setState({ askLanguage: false })}
            setKey={this.props.setKey}
            sdb={this.props.sdb}
            auth={this.props.auth}
            user={this.props.user}
            openProfile={this.state.openProfile}
          />
        )}
        <div
          onClick={() => {
            if (this.state.askLanguage) {
              this.setState({ askLanguage: false });
            } else {
              this.setState({
                openSubscription: false,
                openProfile: false
              });
            }
          }}
          style={
            !this.state.openSubscription && !this.state.openProfile
              ? { display: "none" }
              : {
                  backgroundColor: "rgba(250,250,250,0.8)",
                  display: "flex",
                  position: "fixed",
                  right: "10px",
                  top: "10px",
                  height: "56px",
                  width: "56px",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  zIndex: "9999",
                  border: "2px solid navy"
                }
          }
        >
          &times;
        </div>
      </div>
    );
  }
}
