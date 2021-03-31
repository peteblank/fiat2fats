
paypal
  .Buttons({
    createOrder: function(data, actions) {
      var amounts = document.getElementById("amount").value;
      var amounts2 = amounts.toString();

      // This function sets up the details of the transaction, including the amount and line item details.
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amounts2,
            },
          },
        ],
      });
    },
    onApprove: function pal(data, actions) {
      // This function captures the funds from the transaction.
      return actions.order.capture().then(async function(details) {
        // This function shows a transaction success message to your buyer.

        var amounts = document.getElementById("amount").value;
        var wallet = document.getElementById("wallet").value;
        var amounts2 = amounts.toString();
        var f = JSON.stringify(amounts2).replace(/[^\d.-]/g, ""); //to remove the quotation marks
        var d = JSON.stringify(wallet).replace(/[^\w\s]/gi, ""); //to remove the quotation marks
        var data2 = {
          amount: f,
          wallet: d,
        };
        console.log("data", data2);
   
        await fetch("https://fiat2fats.herokuapp.com/", {
          method: "POST",
          body: JSON.stringify(data2),
          headers: { "Content-type": "application/json" },
        }).then((response) => response);
      });
    },
  })
  .render("#paypal-button-container");
//This function displays Smart Payment Buttons on your web page.
