import ServerLayout from "./server-layout";
import ClientLayout from "./client-layout";

export default function RootLayout({ children }) {
  return (
    <ServerLayout>
      <ClientLayout>
        {children}
      </ClientLayout>
    </ServerLayout>
  );
}
