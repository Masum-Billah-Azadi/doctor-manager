import GoogleProvider from "next-auth/providers/google";
import dbConnect from "./dbConnect";
import Doctor from "@/models/Doctor";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await dbConnect();
      const existingDoctor = await Doctor.findOne({ email: user.email });
      if (!existingDoctor) {
        await Doctor.create({ name: user.name, email: user.email });
      }
      return true;
    },
    async session({ session }) {
      await dbConnect();
      const doctor = await Doctor.findOne({ email: session.user.email });
      session.user.id = doctor._id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
