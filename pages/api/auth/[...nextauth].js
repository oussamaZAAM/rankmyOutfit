import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/database/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   async authorize(credentials, req) {
    //     connectMongo().catch(error => {error: "Connection Failed"})

    //     //Check if User Exists
    //     const existed = await Users.findOne({email: credentials.email});
    //     if(!existed) {
    //       throw new Error("No User is signed up with this email");
    //     }

    //     //Compare Passwords
    //     const checkPassword = await compare(credentials.password, existed.password);

    //     //Incorrect Credentials
    //     if (!checkPassword || credentials.email !== existed.email) {
    //       throw new Error("Email or password mismatch")
    //     }
    //     return existed;
    //   }
    // })
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.JWT_SECRET,
});
