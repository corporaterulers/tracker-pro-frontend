const { GoogleAuth } = require('google-auth-library');

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: 'path-to-service-account.json',
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  console.log('Access Token:', accessToken.token);
}

getAccessToken().catch(console.error);
