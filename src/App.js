import React from "react";
import "./App.css";
import Card from "./Cards";
import { publish } from "./Events";
// function App({ title = "Hello World", ...props }) {
//   console.log("props", props);
//   return <h1>{JSON.stringify(props.data)}</h1>;
// }

class App extends React.Component {
  ClearNotifications = () => {
    publish("UPDATE-NOTIFICATIONS", []);
  };
  AddNotifications = () => {
    const dateNow = new Date();
    publish("ADD-NOTIFICATIONS", dateNow.toISOString());
  };

  AddItemToCard2 = () => {
    const dateNow = new Date();
    publish("ADD-NOTIFICATIONS-2", dateNow.toISOString());
  };
  AddBaseNotifcations = () => {
    publish("UPDATE-NOTIFICATIONS", ["Aarshad", "is", "mad"]);
  };
  render() {
    return (
      <div>
        <h1>Events POC</h1>
        <button onClick={this.AddNotifications}>Add Notification</button>
        <button onClick={this.AddBaseNotifcations}>AddBaseNotifcations</button>
        <button onClick={this.ClearNotifications}>Clear Notification</button>
        <button onClick={this.AddItemToCard2}>Add to Card 2</button>
        <div style={{ display: "flex" }}>
          <div style={{ margin: 10 }}>
            <Card index={1} />
          </div>
          <div style={{ margin: 10 }}>
            <Card index={2} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
