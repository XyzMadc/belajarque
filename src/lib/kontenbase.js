import axios from "axios";

const kontenbase = axios.create({
  baseURL: "https://api.kontenbase.com/v1/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_KONTENBASE_API_KEY}`,
  },
});

export default kontenbase;
