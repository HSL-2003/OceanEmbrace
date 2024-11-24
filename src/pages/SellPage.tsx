
import './SellPage.css'
import { useNavigate } from 'react-router-dom';

export default function SellPage() {
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
                        <h3>Sell your beautiful creations</h3>
                        <p>Subheading with description of your shopping site</p>
                        <button onClick={navToDetail}>More</button>
                    </div>
                </div>
            </div>
            <div className="product-detail">
                <img src="/9ef819ca5a41e11fb85010.jpg" alt="detail" className="product-image" />
                <div className="product-info">
                    <h3>Shop preferences</h3>
                    <form>
                        <div className='form-group'>
                            <label>Shop name</label>
                            <input
                                type="text"
                                placeholder='Shop name'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder='email@janesfakedomain.net'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number</label>
                            <input
                                type="tel"
                                placeholder='Phone number'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Payment method</label>
                            <input
                                type="text"
                                placeholder='Payment method'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Bio</label>
                            <textarea
                                name="Bio"
                                placeholder='Enter your question or message'
                                required
                            ></textarea>
                        </div>
                    </form>
                    <div className='container-button'>
                        <button className="add-to-Accept">Accept for commission</button>
                        <div className="button-column">
                            <button className="add-to-Submit">Submit</button>
                            <button className="add-to-Stall">Go to My Stall</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
