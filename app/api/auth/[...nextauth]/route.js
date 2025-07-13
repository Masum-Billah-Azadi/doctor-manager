import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await dbConnect();
        const doctor = await Doctor.findOne({ email: credentials.email });

        if (!doctor || !doctor.password) return null;

        const isValid = await bcrypt.compare(credentials.password, doctor.password);
        if (!isValid) return null;

        return {
          id: doctor._id,
          email: doctor.email,
          name: doctor.name,
          phone: doctor.phone,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();

      // Handle Google signup for first-time users
      if (account.provider === "google") {
        const existingDoctor = await Doctor.findOne({ email: user.email });

        if (!existingDoctor) {
          await Doctor.create({
            name: user.name,
            email: user.email,
            image: user.image,
            phone: null,
            password: undefined, // No password for Google
          });
        }
      }

      return true;
    },

    async session({ session }) {
      await dbConnect();
      const doctor = await Doctor.findOne({ email: session.user.email });

      if (doctor) {
        session.user.id = doctor._id;
        session.user.name = doctor.name;
        session.user.phone = doctor.phone;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
