import Footer from "./Footer/footer";
import Navbar from "./Navbar/navbar";
import Sidebar from "./Sidebar/sidebar";

export default function Layout({ sidebarOpen, toggleSidebar, children }) {
  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <Navbar />
        <div className="content-body">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
