import { Navbar, Footer } from '@/components/layout';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
