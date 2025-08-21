import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} School Management System. All rights reserved.</p>
      <p>Contact: support@schoolms.com | +1 (555) 123-4567</p>
    </footer>
  );
};

export default Footer;
