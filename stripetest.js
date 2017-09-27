
//pk_test_MfMLV8cfYDwI9mWNH5qi0tya


var stripe = require("stripe")(
  "sk_test_BXX25dhatRKrf5ARZ6FxpZGp"
);

stripe.balance.retrieve(function(err, balance) {
  // asynchronously called
  console.log(balance);
});
