import React from 'react';
import './ProjectInfoPage.css'; // Đảm bảo sử dụng CSS mới để trang đẹp hơn
import Footer from '../components/Footer'; // Import Footer

const ProjectInfoPage: React.FC = () => {
  return (
    <div className="project-info">
      <div className="container">
        <header className="page-header">
          <h2 className="page-title">About Us</h2>
          <p className="page-description">
            Our project is to build a professional website to post and sell handmade products made from materials from the sea.
            This website is not only a place where users can easily search and shop for unique products, but also a platform that connects lovers and enthusiasts of marine craft arts.
          </p>
        </header>

        <section className="article-section">
          <h3 className="section-title">Related Articles</h3>
          <div className="article-list">
            <div className="article">
              <div className="article-image">
                <img src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474099XYj/hinh-nen-bien-dep-cho-dien-thoai-tuyet-dep_025637077.jpg" alt="Ocean Jewelry" />
              </div>
              <h4 className="article-title">Discover Unique Handcrafted Treasures Made from Ocean-Sourced Materials</h4>
              <p className="article-summary">
                Experience the beauty and craftsmanship of handcrafted items made from materials sourced from the ocean. Each piece tells a story and is a testament to the creativity and skill of the artisans.
              </p>
              <a href="#" className="read-more">Learn More</a>
            </div>

            <div className="article">
              <div className="article-image">
                <img src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/168009/Originals/hinh-nen-bien-2.png" alt="Ocean Protection" />
              </div>
              <h4 className="article-title">Create Your Unique Style with Custom-Made Items</h4>
              <p className="article-summary">
                At our website, we offer the option to request custom-made items tailored to your individual style. Whether you're looking for a one-of-a-kind piece of jewelry or a decorative item that perfectly matches your home decor, our talented artisans can bring your vision to life. With our customization service, you can express your unique personality and stand out from the crowd.
              </p>
              <a href="#" className="read-more">Learn More</a>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      
    </div>
  );
};

export default ProjectInfoPage;
