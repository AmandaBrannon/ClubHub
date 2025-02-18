import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#1d1f21', minHeight: '100vh', width: '100vw', color: 'white' }}>
      <Navbar />
      <div className="container-fluid">{children}</div>
    </div>
  );
};

export default Layout;
