import { OpacityAnimation } from "../../styles/sharedStyles";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

interface I_Props {
  children: React.ReactNode;
}

const Layout = ({ children }: I_Props) => {
  return (
    <OpacityAnimation>
      <Navbar />
      {children}
    </OpacityAnimation>
  );
};

export default Layout;
