import { serialize } from "cookie";

function logout(req, res) {
  const { cookies } = req;
  const jwt = cookies.rankmyOutfit;
  !jwt && res.json({ message: "Already logged out" });
  const serialised = serialize("rankmyOutfit", null, {
    httpOnly: true,
    secure: process.env.NEXT_ENV !== "dev",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialised);
  res.json({ message: "Logged out" });
}

export default logout;