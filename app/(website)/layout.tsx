import Header from "./header";
import Footer from './footer'
import LenisProvider from "./components/smoothscroll";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <LenisProvider>
    <Header />
    {children}
    <Footer/>
    </LenisProvider>
    </>
    
  );
}
