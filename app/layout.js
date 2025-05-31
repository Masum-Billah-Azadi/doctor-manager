import './globals.css';
import Providers from './providers'; // 👈 import this

export const metadata = {
  title: 'Doctor Manager',
  description: 'Doctor-patient management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
