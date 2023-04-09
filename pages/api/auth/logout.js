import { serialize } from "cookie";

function logout(req, res) {
  const { cookies } = req;
  const jwt = cookies.authentication;
  if (!jwt) return res.json({ message: "Already logged out" });
  const serialized = serialize("authentication", null, {
    httpOnly: true,
    secure: process.env.VERCEL_ENV !== "development",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);
  return res.json({ message: "Logged out" });
}

export default logout;