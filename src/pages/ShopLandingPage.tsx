
import './ShopLandingPage.css'
import { useNavigate } from 'react-router-dom';

export default function ShopLandingPage() {
    const navigate = useNavigate();
    const navToDetail = () => {
        navigate("/detail")
    }
    return (
        <>
            <div className="banner-container">
                <div className="banner">
                    <img src="/b71107b7443cff62a62d.jpg" alt="banner" />
                    <div className="content">
                        <h3>Necklace and more!</h3>
                        <p>Subheading with description of your shopping site</p>
                        <button>More</button>
                    </div>
                </div>
            </div>
            <div className="product-container">
                <h3>Our products</h3>
                <div className="product-row">
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/5b26c4089b8320dd79922.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/76d12d06738dc8d3919c4.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/251591c1cf4a74142d5b6.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/b69b87b1d83a63643a2b1.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/c0f15a2f04a4bffae6b53.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                    <div className="product" onClick={() => navToDetail()}>
                        <img src="/c4396aed34668f38d6775.jpg" alt="banner" />
                        <div className="product-info">
                            <h4>Product</h4>
                            <p>Description</p>
                            <p>$10.99</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-container">
                <h3>Top sales</h3>
                <div className="sales-row">
                    <div className='sales-1'>
                        <div className="product-sales" onClick={() => navToDetail()}>
                            <img src="/9ef819ca5a41e11fb85010.jpg" alt="banner" />
                            <div className="product-info">
                                <h4>Product</h4>
                                <p>Description</p>
                                <p>$10.99</p>
                            </div>
                        </div>
                    </div>
                    <div className='sales-2'>
                        <div className="product-sales" onClick={() => navToDetail()}>
                            <img src="/85e003d34058fb06a2497.jpg" alt="banner" />
                            <div className="product-info">
                                <h4>Product</h4>
                                <p>Description</p>
                                <p>$10.99</p>
                            </div>
                        </div>
                        <div className="product-sales" onClick={() => navToDetail()}>
                            <img src="/cc62ab53e8d853860ac99.jpg" alt="banner" />
                            <div className="product-info">
                                <h4>Product</h4>
                                <p>Description</p>
                                <p>$10.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
