import './globals.css';
import { Providers } from '../store/providers'; // 👇 you’ll create this

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
