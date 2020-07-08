import React from "react";
import { subscribe, publish } from "./Events";

export default function Card(props) {
  const [items, setItems] = React.useState([]);
  const AddNotifSubscription = subscribe("ADD-NOTIFICATIONS", (data) => {
    setItems([...items, data]);
    console.log("add data", data);
  });
  const updateSubscription = subscribe("UPDATE-NOTIFICATIONS", (data) => {
    setItems(data);
    console.log("data", data);
  });
  const CardSpecificSubscription = subscribe(
    `ADD-NOTIFICATIONS-${props.index || 1}`,
    (data) => {
      setItems([...items, data]);
    }
  );

  return (
    <div class="card">
      <div class="container">
        <h4>
          <b>Sample Card</b>
        </h4>
        <button
          onClick={() => {
            publish("ADD-NOTIFICATIONS", `Hello from Card-${props.index || 1}`);
          }}
        >
          {" "}
          Publish New
        </button>
        <ul>
          {items.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
