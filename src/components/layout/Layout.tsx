import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AlertModal from './AlertModal';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AlertModal />
    </>
  );
};

export default Layout;