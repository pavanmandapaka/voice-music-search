import axios from "axios";

const CLIENT_ID = "f6d1d19044334c58b4d182e31aea4c53"; // Replace with your actual Spotify Client ID
const CLIENT_SECRET = "81d24ecaf4e44fc498977ed306045641"; // Replace with your actual Spotify Client Secret

// ✅ Function to get Spotify Access Token
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Spotify Access Token:", response.data.access_token); // Debugging
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

// ✅ Function to search for songs
export const searchSong = async (query) => {
  const token = await getAccessToken();
  if (!token) return [];

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Spotify API Response:", response.data.tracks.items); // Debugging
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error fetching song data:", error);
    return [];
  }
};
