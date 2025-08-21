import '../css/Footer.css';

function Footer(){
    return(
        <div className="footer"> 
            <div className="footer-intro">
                <p>Website made by Youngjun Ryoo and Wan Kim</p>
            </div>
            <div className="footer-legal">
                <p>© {new Date().getFullYear()} myplayer.com. All rights reserved.</p>
            </div>
            <div className="footer-src">
                <p>Player stats provided by <a href="https://docs.statsapi.mlb.com/" className="src-link">mlb.com API</a></p>
            </div>
           
        </div>
    )
        
    
}
export default Footer;