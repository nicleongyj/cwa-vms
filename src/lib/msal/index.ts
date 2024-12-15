import * as msal from "@azure/msal-node";
import "dotenv/config"; // process.env now has the values defined in a .env file

const clientConfig = {
  auth: {
    clientId: "your_client_id",
    authority: "your_authority",
    clientSecret: process.env.clientSecret, // OR
    clientCertificate: {
      thumbprint: process.env.thumbprint,
      privateKey: process.env.privateKey,
    }, // OR
    clientAssertion: 'SOME_ASSERTION', // TODO: or a predetermined clientAssertion string
  },
};
const cca = new msal.ConfidentialClientApplication(clientConfig);
