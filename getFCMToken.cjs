// getFCMToken.js
const { GoogleAuth } = require('google-auth-library');

async function getAccessToken() {
  try {
    const auth = new GoogleAuth({
      keyFile: 'firebase-adminsdk.json', // <-- replace with your service account file path
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    console.log("\n✅ FCM Access Token:");
    console.log(accessToken.token, "\n");
  } catch (error) {
    console.error("❌ Error getting access token:", error.message);
  }
}

getAccessToken();
