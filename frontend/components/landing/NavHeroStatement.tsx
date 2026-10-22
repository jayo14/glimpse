import { Sheet } from "./Sheet";

export function Nav() {
  return (
    <nav>
      <a className="logo" href="#">
        <span className="mk"></span>Glimpse
      </a>
      <div className="l">
        <a href="#how">How it works</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </div>
      <a className="btn" href="#get">
        Get the app
      </a>
    </nav>
  );
}

export function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <h1>
          Find yourself<br />
          <i>in every frame.</i>
        </h1>
        <p className="mute">
          One selfie. Every photo you’re in, from every moment of the event, delivered in seconds.
        </p>
        <div className="cta">
          <a className="btn" href="#get">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8C6.9 7.4 5.4 8.300 4.600 9.700c-1.700 2.900-.4 7.200 1.200 9.500.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7c1.300 0 2.100-1.100 2.800-2.300.9-1.300 1.300-2.600 1.300-2.700 0 0-2.400-.9-2.400-3.900zM14.200 5.700c.6-.8 1.100-1.800.9-2.900-.9 0-2 .6-2.700 1.400-.6.700-1.100 1.800-1 2.800 1 .1 2-.5 2.800-1.300z" />
            </svg>
            Download on the App Store
          </a>
          <a className="btn o" href="#get">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 2.800c-.3.300-.5.800-.5 1.400v15.600c0 .6.2 1.100.5 1.400L12.600 12 4 2.800zM14 13.400l2.600 2.600-10.800 6.100 8.200-8.700zM16.600 8 14 10.600 5.800 1.900 16.600 8zM21 10.900c.6.400 1 .9 1 1.100s-.4.800-1 1.100l-2.700 1.500L15.400 12l2.900-2.600L21 10.900z" />
            </svg>
            Get it on Google Play
          </a>
        </div>
      </div>
      <Sheet />
    </header>
  );
}

export function Statement() {
  const text =
    "Hundreds of photos. Thousands of guests. Nobody should have to scroll through a thousand strangers to find their own smile.";
  const words = text.split(" ");
  return (
    <section className="state" id="stmt">
      <div className="wrap">
        <p>
          {words.map((w, i) => (
            <span key={i}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
