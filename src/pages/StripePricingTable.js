import React, { useEffect } from "react";
const StripePricingTable = () => {
useEffect(() => {
const script = document.createElement("script");
script.src = "https://js.stripe.com/v3/pricing-table.js";
script.async = true;
document.body.appendChild(script);
return () => {
document.body.removeChild(script);
};
}, []);
return React.createElement("stripe-pricing-table", {
"pricing-table-id": 'prctbl_1OOvamIJPiFZsR6yklTnS6Ug',
"publishable-key": 'pk_live_51OOZ5UIJPiFZsR6yWsdAshzC9nHEHVCTNfTVRtMPMKNqb6TCIb4L2VOKQeOaWwWjXtaVqtTgOG2jtl1Nsd6KGdwt005BUEYAqt',
});
};
export default StripePricingTable;