"use client"; // Mark this as a Client Component
import "./globals.css";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <QueryClientProvider client={queryClient}>
          <header className="bg-blue-600 text-white p-4">
            <nav>
              <Link href="/" className="mr-4">
                Home
              </Link>
              <Link href="/auth" className="mr-4">
                Auth
              </Link>
              <Link href="/card_view/tags" className="mr-4">
                Tags
              </Link>
              <Link href="/card_view/categories" className="mr-4">
                Categories
              </Link>
              <Link href="/card_view/posts" className="mr-4">
                Posts
              </Link>
            </nav>
          </header>
          <main className="p-6">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
