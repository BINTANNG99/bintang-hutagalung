import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import VisitorCounter from "@/components/VisitorCounter";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <VisitorCounter />
    </>
  );
}
