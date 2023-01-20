import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import connectDb from "../../../utils/connectDb";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const loweredEmail = email.toLowerCase();

        await connectDb();

        const userExists = await User.findOne({ email: loweredEmail }).lean();

        if (!userExists) {
          throw new Error("User not found.");
        }

        const verified = await bcrypt.compare(password, userExists.password);

        if (!verified) {
          throw new Error("Password is not valid!");
        }

        return userExists;
      },
    }),
  ],
};

export default NextAuth(authOptions);
