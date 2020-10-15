import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import firebase from "./init-firebase";

class ImportFireToBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: undefined,
      lastauth: null,
      users: undefined,
      user: undefined,
      loaded: false,
      loggedOut: true
    };
  }
  componentDidMount = async () => {
    firebase
      .firestore()
      .collection("users")
      .onSnapshot(querySnapshot => {
        let p = 0;
        let users = [];
        p++;
        querySnapshot.docs.forEach(doc => {
          if (doc.exists) {
            let data = doc.data();
            data.id = doc.id;
            /*data.photoThumbnail = data.photoThumbnail
              ? data.photoThumbnail
              : "https://www.dl.dropboxusercontent.com/s/wef09yq3mgu8eif/profile1%20%281%29.png?dl=0";
           
            data.profilergb = data.profilergb
              ? data.profilergb
              : "#" + (((1 << 24) * Math.random()) | 0).toString(16);*/
            users.push(data);
            if (querySnapshot.docs.length === p) {
              this.getUserInfo();
              this.setState({ users });
            }
          }
          return console.log(`${users.length} users signed up`);
        });
      });
  };
  getUserInfo = () => {
    this.setState({ stop: true });
    firebase.auth().onAuthStateChanged(async meAuth => {
      if (meAuth) {
        meAuth.getIdToken(/* forceRefresh */ true).then(idToken => {
          this.setState({ jwt: idToken });
          firebase
            .firestore()
            .collection("users")
            .doc(meAuth.uid)
            .onSnapshot(querySnapshot => {
              if (querySnapshot.exists) {
                let b = querySnapshot.data();
                b.id = querySnapshot.id;
                /*b.photoThumbnail = b.photoThumbnail
                  ? b.photoThumbnail
                  : "https://www.dl.dropboxusercontent.com/s/wef09yq3mgu8eif/profile1%20%281%29.png?dl=0";
                 b.profilergb = b.profilergb
                  ? b.profilergb
                  : "#" + (((1 << 24) * Math.random()) | 0).toString(16);
                */
                if (this.state.user !== b) {
                  this.setState({
                    user: b,
                    auth: meAuth,
                    loaded: true,
                    loggedOut: false
                  });
                }
              }
            });
        });
        var random = Math.random;
        this.setState({ random });
      } else return this.setState({ user: undefined });
    });
  };
  render() {
    return (
      <App
        jwt={this.state.jwt}
        setKey={x => {
          this.setKey(x, "setKey");
        }}
        sdb={this.state.sdb}
        auth={this.state.auth}
        users={this.state.users}
        user={this.state.user}
        loaded={this.state.loaded}
      />
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <ImportFireToBase />
  </BrowserRouter>,
  rootElement
);
