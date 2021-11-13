import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

toast.configure();

function App() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 64998.67,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:8080/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_51JuxCuKbxfW8ZS8cPQej3cSP17GkiTuc7DlJXH3m0ymZTGbFeojfTfiaaQjEfMOdjL7QZUGlNfFNxz7Y4Q1pgNCx00KND8nzpT"
        token={handleToken}
        amount={product.price * 100}
        name="Tesla Roadster"
        // billingAddress
        // shippingAddress
      />
    </div>
  );
}

export default App