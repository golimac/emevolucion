import "./globals.css";

export const metadata = {
  title: "eme · demo del acompañamiento permanente",
  description: "Demo de concepto del acompañamiento permanente de Sentido EME",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
