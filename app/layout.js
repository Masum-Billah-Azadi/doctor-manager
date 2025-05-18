import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Doctor Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
