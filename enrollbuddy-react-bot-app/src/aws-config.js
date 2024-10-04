import AWS from 'aws-sdk';

// Update the AWS config

AWS.config.update({
  region: process.env.REACT_APP_REGION, // Replace with your region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  }),
});

// Initialize the Lex Runtime V2 client
const lexRuntimeV2 = new AWS.LexRuntimeV2();
 
export default lexRuntimeV2;