import "./globals.css";

export const metadata = {
  title: "Voltura | Electric Mobility",
  description: "Next generation electric mobility and energy systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}