import React from "react";
import firebase from ".././init-firebase";
//import { PlaidLink } from "react-plaid-link";

class Profile extends React.Component {
  state = {};
  /*componentDidMount = () => {
    //document.getElementById("snipcart").style.position = "relative";
    //document.getElementById("snipcart").style.width = "100%";

    var subscribe = document.getElementById("snipcart-add-item");
    subscribe.classList.add("snipcart-add-item");

    var itemCount = document.getElementById("snipcart-items-count");
    itemCount.classList.add("snipcart-items-count");

    var total = document.getElementById("snipcart-total-price");
    total.classList.add("snipcart-total-price");

    var checkout = document.getElementById("snipcart-checkout");
    checkout.classList.add("snipcart-checkout");

    /*var form = document.getElementById("snipcart-form__set");
    form.classList.add("snipcart-form__set");

    var formField = document.getElementById("snipcart-form__field");
    formField.classList.add("snipcart-form__field");

    var formBox = document.getElementById("snipcart-form__field-checkbox");
    formBox.classList.add("snipcart-form__field-checkbox");

    var formLabel = document.getElementById(
      "snipcart__font--tiny snipcart-form__label--checkbox"
    );
    formLabel.classList.add("snipcart__font--tiny");
    formLabel.classList.add("snipcart-form__label--checkbox");*
    document.addEventListener("snipcart.ready", this.readySnipcart);
};
  readySnipcart = () => {
    // You can safely use window.Snipcart here
    const snipcart = window.Snipcart;
    snipcart.events.on(() => this.setState({ snipcart }));

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
  };*/
  render() {
    const { users } = this.props;
    var existingUsernames = [];
    users &&
      users.length > 0 &&
      users.map((number) => existingUsernames.push(number.username));
    if (existingUsernames.includes(this.state.newUsername)) {
      if (!this.state.usernameTaken) {
        this.setState({ usernameTaken: true });
      }
    } else {
      if (this.state.usernameTaken) {
        this.setState({ usernameTaken: false });
      }
    }
    return (
      <div
        style={
          this.props.openProfile
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                transform: "translateX(0%)",
                transition: ".3s ease-in",
                backgroundColor: "white"
              }
            : {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                transform: "translateX(100%)",
                transition: ".3s ease-out",
                opacity: "0"
              }
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !this.state.usernameTaken &&
              (this.props.user.username !== this.state.newUsername ||
                this.props.user.name !== this.state.newName)
            ) {
              firebase
                .firestore()
                .collection("users")
                .doc(this.props.auth.uid)
                .update({
                  username:
                    this.props.user.username !== this.state.newUsername
                      ? this.state.newUsername
                      : this.props.user.username,
                  name:
                    this.props.user.name !== this.state.newName
                      ? this.state.newName
                      : this.props.user.name
                });
              this.setState({ newName: "", newUsername: "" });
            }
          }}
          style={{
            padding: "30px",
            display: "flex",
            position: "absolute",
            height: "min-content",
            flexDirection: "column",
            width: "30%"
          }}
        >
          {this.props.user.username}
          <input
            placeholder={this.props.user.username}
            value={this.state.newUsername}
            onChange={(e) => {
              this.setState({ newUsername: e.target.value });
            }}
          />
          {this.state.usernameTaken && "username taken"}
          <br />
          {this.props.user.name}
          <input
            placeholder={this.props.user.name}
            value={this.state.newName}
            onChange={(e) => {
              this.setState({ newName: e.target.value });
            }}
          />
          <br />
          <button>Save</button>
        </form>
        {/*<span id="snipcart-items-count"></span>
        <span id="snipcart-total-price"></span>
        <div>
          <button
            style={{
              left: "20px",
              bottom: "90px",
              display: "flex",
              position: "fixed"
            }}
            //class="snipcart-add-item"
            id="snipcart-add-item"
            data-item-id="starry-night"
            data-item-price="50.00"
            //{"usd": 20,"cad": 25}
            data-item-url="/paintings/starry-night"
            data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
            data-item-image="/assets/images/starry-night.jpg"
            data-item-name="The Starry Night"
            data-item-custom1-name="Feature requests"
            data-item-custom1-type="textarea"
            data-item-max-quantity="1"
          >
            Cart++
          </button>
        </div>
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
        </div>
        <div
          style={
            this.state.snipcart
              ? {
                  left: "180px",
                  bottom: "90px",
                  display: "flex",
                  position: "fixed",
                  opacity: "1",
                  transition: ".3s ease-in"
                }
              : {
                  left: "180px",
                  bottom: "90px",
                  display: "flex",
                  position: "fixed",
                  opacity: "0",
                  transition: ".3s ease-out"
                }
          }
        >
          snipcart
        </div>
        <div
          style={{
            color: "grey",
            fontSize: "14px",
            left: "20px",
            bottom: "60px",
            display: "flex",
            position: "fixed"
          }}
        >
          {/*you will get nothing*
          Get this live for $200 until 2023
        </div>
        <div
          onClick={this.props.askLanguage}
          style={{
            left: "130px",
            bottom: "30px",
            display: "flex",
            position: "fixed"
          }}
        >
          {this.state.language}
        </div>
        <div
          style={
            this.props.askLanguage
              ? {
                  display: "flex",
                  position: "fixed",
                  overflowY: "auto",
                  overflowX: "hidden",
                  width: "100%",
                  height: "100%",
                  transform: "translateX(0%)",
                  transition: ".3s ease-in",
                  backgroundColor: "white"
                }
              : {
                  display: "flex",
                  position: "fixed",
                  overflowY: "auto",
                  overflowX: "hidden",
                  width: "100%",
                  height: "100%",
                  transform: "translateX(100%)",
                  transition: ".3s ease-out",
                  opacity: "0"
                }
          }
        >
          <div
            style={{
              margin: "30px",

              flexDirection: "column"
            }}
          >
            <div style={{ padding: "10px 20px", margin: "5px" }}>
              Please select a language
            </div>
            {[
              { name: "english", code: "en" },
              { name: "french", code: "fr" },
              { name: "spanish", code: "es" },
              { name: "dutch", code: "nl" }
            ].map((x) => {
              return (
                <div
                  key={x.code}
                  style={
                    this.state.language === x.code
                      ? {
                          padding: "10px 20px",
                          margin: "5px",
                          border: "1px solid black"
                        }
                      : { padding: "10px 20px", margin: "5px" }
                  }
                  onClick={() => this.setState({ language: x.code })}
                >
                  {x.name}
                </div>
              );
            })}
            <button onClick={this.props.closeAskLang}>save</button>
          </div>
          </div>*/}
        <div
          style={
            this.props.auth !== undefined
              ? {
                  display: "flex",
                  position: "fixed",
                  top: "100px",
                  right: "5%",
                  backgroundColor: "rgba(250,250,250,.8)"
                }
              : {
                  display: "none"
                }
          }
          className="logoutbtn"
          onClick={async () => {
            await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.SESSION);
            var answer = window.confirm("Are you sure you want to log out?");
            if (answer) {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  console.log("logged out");
                })
                .catch((err) => {
                  console.log(err);
                });
              this.props.close();
              window.location.reload();
            }
          }}
        >
          Log Out
        </div>
        <div id="snipcart" />
        {/*<billing section="bottom">
            <fieldset id="snipcart-form__set">
              <div id="snipcart-form__field">
                <div id="snipcart-form__field-checkbox">
                  <snipcart-checkbox name="subscribeToNewsletter"></snipcart-checkbox>
                  <snipcart-label
                    id="snipcart__font--tiny snipcart-form__label--checkbox"
                    for="subscribeToNewsletter"
                  >
                    Subscribe to newsletter
                  </snipcart-label>
                </div>
              </div>
            </fieldset>
          </billing>
        </div>*/}
      </div>
    );
  }
}

export default Profile;

/*<div
          style={{
            left: "20px",
            bottom: "90px",
            display: "flex",
            position: "fixed"
          }}
          onClick={async () =>
            await fetch(
              "https://us-central1-froth-7tpiu.cloudfunctions.net/initializePlaidFroth",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Accept: "application/json"
                  //Authorization: `Bearer ${this.props.jwt}`
                  //type: "TOKEN",
                  //"test-token":"allow",

                  //authorizationToken: "allow",
                  //"arn:aws:execute-api:{regionId}:{accountId}:{apiId}/{stage}/{httpVerb}/[{resource}/[{child-resources}]]"
                  //methodArn:"arn:aws:execute-api:us-east-2:334821136337:cr0ucj7mp0/Beta/*
                  POST/"
                },
                body: JSON.stringify({ public_token: this.props.jwt })
              }
            )
              .then(async res => await res.json())
              .then(response => {
                console.log(response);
                firebase
                  .firestore()
                  .collection("users")
                  .doc(this.props.auth.uid)
                  .update({
                    paidSub: true
                  });
              })
              .catch(err => console.log(err.message))
          }
        >
          Try
        </div>
        <div
          style={{
            left: "20px",
            bottom: "30px",
            display: "flex",
            position: "fixed"
          }}
          onClick={async () => {
            var paidSub = this.props.user.paidSub ? false : true;
            console.log(paidSub);
            if (!this.props.user.paidSub) {
              if (!this.state.language) {
                this.props.askLanguager();
              } else {
                if (!this.state.proceed) {
                  var answer = window.confirm(
                    "you'll need to register with plaid, proceed?"
                  );
                  if (answer) {
                    this.setState({ proceed: true });
                  }
                }
              }
            } else {
              var answer1 = window.confirm(
                "are you sure you want to unsubscribe? this will end your subscription"
              );
              if (answer1)
                firebase
                  .firestore()
                  .collection("users")
                  .doc(this.props.auth.uid)
                  .update({
                    paidSub: false
                  });
            }
          }}
        >
          {!this.state.proceed
            ? this.props.user.paidSub
              ? "unsubscribe"
              : "subscribe"
            : null}
          {this.state.proceed && (
            <PlaidLink
              clientName="Froth"
              env="development"
              product={["auth", "transactions"]}
              publicKey="a7fad69fb730715aa03d0b36df10b5"
              onExit={(metadata, error) => {
                console.log(error);
                console.log(metadata);
              }}
              onSuccess={async (public_token, metadata) => {
                this.setState({ linkSessionId: metadata.link_session_id });
                await fetch(
                  "https://us-central1-froth-7tpiu.cloudfunctions.net/initializePlaidFroth",
                  {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                      Accept: "application/json"
                    },
                    body: {
                      public_token: JSON.stringify(public_token)
                    }
                  }
                )
                  .then(async res => await res.json())
                  .then(response => {
                    console.log(response);
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(this.props.auth.uid)
                      .update({
                        paidSub: true
                      });
                  })
                  .catch(err => console.log(err));
              }}
              language={this.state.language}
            >
              subscribe
            </PlaidLink>
          )}
        </div>*/
