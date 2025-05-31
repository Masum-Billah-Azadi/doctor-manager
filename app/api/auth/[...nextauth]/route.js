import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await dbConnect();

        const existingDoctor = await Doctor.findOne({ email: user.email });

        if (!existingDoctor) {
          await Doctor.create({
            name: user.name,
            email: user.email,
            image: user.image,
            phone: null, // optional: you can let doctor edit later
          });
        }

        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
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
});

export { handler as GET, handler as POST };

