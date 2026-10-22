export function Footer() {
  return (
    <footer className="fin on-k" id="get">
      <div className="wrap">
        <h2>Take control of<br />your event photos.</h2>
        <div className="cta">
          <a className="btn" href="#">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8C6.9 7.4 5.4 8.300 4.600 9.700c-1.700 2.900-.4 7.200 1.200 9.500.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7c1.300 0 2.100-1.100 2.800-2.300.9-1.300 1.300-2.600 1.300-2.700 0 0-2.400-.9-2.400-3.900zM14.200 5.700c.6-.8 1.100-1.800.9-2.900-.9 0-2 .6-2.700 1.400-.6.700-1.100 1.800-1 2.800 1 .1 2-.5 2.800-1.300z" />
            </svg>
            App Store
          </a>
          <a className="btn o" href="#">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 2.800c-.3.300-.5.800-.5 1.400v15.600c0 .6.2 1.100.5 1.400L12.600 12 4 2.800zM14 13.400l2.600 2.600-10.800 6.100 8.200-8.700zM16.600 8 14 10.600 5.800 1.900 16.600 8zM21 10.900c.6.400 1 .9 1 1.100s-.4.800-1 1.100l-2.700 1.500L15.400 12l2.900-2.600L21 10.900z" />
            </svg>
            Google Play
          </a>
        </div>
        <div className="fg">
          <div>
            <a className="logo" href="#">
              <span className="mk" style={{ background: "#fff" }}></span>Glimpse
            </a>
            <div className="news">
              <input type="email" placeholder="Your email" aria-label="Email" />
              <a className="btn" href="#">
                Subscribe
              </a>
            </div>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#how">How it works</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#faq">FAQ</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="big" aria-hidden="true">
          <svg
            id="gsvg"
            viewBox="0 0 1000 340"
            style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
          >
            <defs>
              <linearGradient
                id="gl"
                gradientUnits="userSpaceOnUse"
                x1="-900"
                x2="-500"
                y1="0"
                y2="0"
              >
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset=".5" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <filter id="gb" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <g
              fontFamily="'Instrument Serif',Georgia,serif"
              fontSize="340"
              letterSpacing="-17"
              textAnchor="middle"
            >
              <text x="500" y="255" fill="#1c1c1c" stroke="#2c2c2c" strokeWidth="1">
                Glimpse
              </text>
              <text x="500" y="255" fill="none" stroke="url(#gl)" strokeWidth="6" filter="url(#gb)">
                Glimpse
              </text>
              <text x="500" y="255" fill="none" stroke="url(#gl)" strokeWidth="1.8">
                Glimpse
              </text>
            </g>
          </svg>
        </div>
      </div>
    </footer>
  );
}
