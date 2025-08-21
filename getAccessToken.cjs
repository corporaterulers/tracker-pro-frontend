const { GoogleAuth } = require('google-auth-library');

const auth = new GoogleAuth({
  keyFile: './serviceAccountKey.json', 
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

async function getAccessToken() {
  try {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    console.log("Access Token:", accessToken.token);
  } catch (error) {
    console.error("Error generating access token:", error.message);
  }
}

getAccessToken();
