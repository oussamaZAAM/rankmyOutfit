import { serialize } from "cookie";

function logout(req, res) {
  const { cookies } = req;
  const jwt = cookies.authentication;
  if (!jwt) return res.json({ message: "Already logged out" });
  const serialised = serialize("authentication", null, {
    httpOnly: true,
    secure: process.env.NEXT_ENV !== "dev",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialised);
  return res.json({ message: "Logged out" });
}

export default logout;