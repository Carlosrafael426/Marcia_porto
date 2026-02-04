import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Home from "./pages/Home";
import './index.css'

export default function App() {
  const waLink = "https://wa.me/5541999193582";

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Navbar waLink={waLink} />
      <Home waLink={waLink} />
      <Footer />
      <WhatsAppFloat waLink={waLink} />
    </div>
  );
}
