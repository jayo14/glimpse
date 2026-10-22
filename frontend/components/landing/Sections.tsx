import { art, qr } from "@/lib/art";
import Link from "next/link";

const APPLE = "M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8C6.9 7.4 5.4 8.300 4.600 9.700c-1.700 2.900-.4 7.200 1.200 9.500.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7c1.300 0 2.100-1.100 2.800-2.300.9-1.300 1.300-2.600 1.300-2.700 0 0-2.400-.9-2.400-3.900zM14.200 5.700c.6-.8 1.100-1.800.9-2.900-.9 0-2 .6-2.700 1.400-.6.700-1.100 1.800-1 2.800 1 .1 2-.5 2.800-1.300z";
const PLAY = "M4 2.800c-.3.300-.5.800-.5 1.400v15.600c0 .6.2 1.100.5 1.400L12.600 12 4 2.800zM14 13.400l2.600 2.600-10.800 6.100 8.200-8.700zM16.600 8 14 10.600 5.800 1.900 16.600 8zM21 10.900c.6.400 1 .9 1 1.100s-.4.800-1 1.100l-2.700 1.500L15.400 12l2.900-2.600L21 10.900z";

const img = (i: number, w: number) => ({ "--img": `url("${art(i, w)}")` } as unknown as React.CSSProperties);

const Qr = ({ n }: { n: number }) => (
  <div dangerouslySetInnerHTML={{ __html: qr(n) }} />
);

const screenUI = (k: number) => {
  const C = [
    ["Instant scanner", "Scan, snap, done."],
    ["Biometric match", "Accurate in any light."],
    ["Personal gallery", "Only the photos you’re in."],
    ["TV wall", "Shots hit the big screen live."],
    ["Guestbook", "Messages beside the moments."],
  ];
  const U = [
    (
      <>
        <div className="bg" style={{ ...img(1, 1), filter: "grayscale(1) blur(2px) brightness(.4)" }}></div>
        <div className="sb"><span>9:41</span><span>●●● ▮</span></div>
        <div className="qf"><b></b><b></b><b></b><b></b><div className="c"><Qr n={21} /></div></div>
        <i className="ln"></i>
        <div className="hint">Point at the event QR code</div>
      </>
    ),
    (
      <>
        <div className="bg" style={img(0, 0)}></div>
        <i className="ov"></i>
        <i className="ln"></i>
        <div className="bar2">
          Matching your face… 92%<i></i>
        </div>
      </>
    ),
    (
      <>
        <div className="gh2">
          <b style={{ fontWeight: 400 }}>{C[k][0]}</b>
          <span>42 found</span>
        </div>
        <div className="chips"><span>All</span><span>Favourites</span><span>Group</span></div>
        <div className="gg">{[0, 1, 2].map((j) => (
          <i key={j} style={img(100 + j, j % 2 ? 100 + j : 0)} />
        ))}</div>
        <div className="fab">Save all originals</div>
      </>
    ),
    (
      <>
        <div className="gh2">
          <b style={{ fontWeight: 400 }}>{C[k][0]}</b>
          <span>Lobby TV</span>
        </div>
        <div className="tvw">
          <div className="bg" style={{ ...img(3, 0), backgroundPosition: "center 35%" }} />
          <span className="live">● Live</span>
        </div>
        <div className="th">{[0, 1, 2, 3].map((j) => (
          <i key={j} style={img(120 + j, j % 2 ? 120 + j : 0)} />
        ))}</div>
        <div className="fab">Casting · 128 photos</div>
      </>
    ),
    (
      <>
        <div className="gh2">
          <b style={{ fontWeight: 400 }}>{C[k][0]}</b>
          <span>34 notes</span>
        </div>
        <div className="msg">
          <u style={img(140, 141)} />
          <p>Best night ever. Thank you for the photos!</p>
        </div>
        <div className="msg">
          <u style={img(142, 143)} />
          <p>Found 12 of me in seconds.</p>
        </div>
        <div className="msg me">
          <u style={img(144, 0)} />
          <p>Congratulations again!</p>
        </div>
        <div className="inp">Write a note…</div>
      </>
    ),
  ];
  return (
    <>
      <div className="u">{U[k]}</div>
      <div className="cap">
        <h3>{C[k][0]}</h3>
        <p>{C[k][1]}</p>
      </div>
    </>
  );
};

const stepVisual = (k: number) => {
  const V = [
    (
      <>
        <div className="tent">
          <div className="tq" dangerouslySetInnerHTML={{ __html: qr(25) }} />
          <b>Scan to find your photos</b>
          <small>Glimpse · Hope & Victor</small>
        </div>
      </>
    ),
    (
      <>
        <div className="sf">
          <div className="bg" style={img(0, 0)} />
          <i className="ov"></i>
          <i className="ln"></i>
          <span className="pillx">Hold still · matching</span>
        </div>
      </>
    ),
    (
      <>
        <div>
          <div className="cr">{[0, 1, 2, 3, 4, 5].map((j) => (
            <i key={j} style={img(160 + j, j % 2 ? 160 + j : 0)} />
          ))}</div>
          <div className="toast">Saved 42 originals</div>
        </div>
      </>
    ),
  ];
  return V[k];
};

const AL = [
  ["Hope & Victor’s Wedding", 5],
  ["Grandpa’s 97th Birthday", 12],
  ["AI Bootcamp", 48],
  ["Ada’s Graduation Day", 23],
  ["Lagos Tech Week", 86],
  ["Founders’ Dinner", 17],
  ["Naming Ceremony", 31],
  ["Beach Party ’26", 64],
  ["Sunday Brunch", 9],
];

const Steps = () => (
  <section id="how">
    <div className="wrap">
      <div className="hd rv">
        <h2>Three taps.<br />All your memories.</h2>
        <p className="mute" style={{ maxWidth: "34ch" }}>
          No app to install, no account to create. Just scan, smile and save.
        </p>
      </div>
      <div className="steps">
        {[1, 2, 3].map((k) => (
          <div key={k} className="step rv">
            <div>
              <div className="n">{k}</div>
            </div>
            <div>
              <div className="vis">{stepVisual(k - 1)}</div>
              <h3>{k === 1 ? "Scan the code" : k === 2 ? "Take a selfie" : "Save the originals"}</h3>
              <p>{k === 1 ? "Scan the QR code at the event. Glimpse opens instantly in your browser." : k === 2 ? "Face matching finds every photo you appear in within seconds." : "Full-resolution downloads with no watermarks, straight to your camera roll."}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section style={{ paddingTop: 20 }}>
    <div className="wrap">
      <div className="hd rv">
        <h2>Everything you need.<br />Nothing you don’t.</h2>
      </div>
      <div className="rv">
        <a className="row" href="#">
          <h3>Instant face matching</h3>
          <p>Guests find all their photos with a 10-second selfie.</p>
          <span className="ar">→</span>
        </a>
        <a className="row" href="#">
          <h3>Fast photographer upload</h3>
          <p>Bulk upload from SD cards or tethered cameras. Thousands of shots processed in minutes.</p>
          <span className="ar">→</span>
        </a>
        <a className="row" href="#">
          <h3>Live TV slideshow</h3>
          <p>Stream new photos to venue screens as they are shot.</p>
          <span className="ar">→</span>
        </a>
        <a className="row" href="#">
          <h3>Secure and encrypted</h3>
          <p>Face data is encrypted, never shared and deleted on your schedule.</p>
          <span className="ar">→</span>
        </a>
      </div>
    </div>
  </section>
);

const Screens = () => (
  <>
    <section style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="hd rv"><h2>Made for every screen.</h2></div>
      </div>
    </section>
    <div className="rail">
      {[0, 1, 2, 3, 4].map((k) => (
        <div
          key={k}
          className="ph"
          style={(
            {
              "--g":
                k === 0 ? "linear-gradient(160deg,#777,#222)"
                : k === 1 ? "linear-gradient(160deg,#222,#999)"
                : k === 2 ? "linear-gradient(160deg,#bbb,#333)"
                : k === 3 ? "linear-gradient(160deg,#111,#666)"
                : "linear-gradient(160deg,#888,#1a1a1a)",
            } as unknown as React.CSSProperties
          )}
        >
          <div style={img(50 + k, 50 + k)}>{screenUI(k)}</div>
        </div>
      ))}
    </div>
  </>
);

const Stats = () => (
  <div className="stats" style={{ marginTop: 60 }}>
    <div className="wrap">
      <div className="sg">
        <div className="rv"><b>3s</b><span>from selfie to gallery</span></div>
        <div className="rv"><b>25k</b><span>photos delivered at one festival</span></div>
        <div className="rv"><b>0</b><span>apps for guests to install</span></div>
      </div>
    </div>
  </div>
);

const Pricing = () => (
  <section id="pricing">
    <div className="wrap">
      <div className="hd rv">
        <h2>Plans for every<br />kind of event.</h2>
        <p className="mute" style={{ maxWidth: "30ch" }}>
          Start free. Upgrade when you need more. Cancel any time.
        </p>
      </div>
      <div className="price">
        <div className="pc rv">
          <h3>Guest &amp; Casual</h3>
          <div className="n">$0</div>
          <small>forever</small>
          <ul>
            <li>Unlimited face matching</li>
            <li>Instant web galleries</li>
            <li>Standard downloads</li>
          </ul>
          <a className="btn o" href="#get">Start free</a>
        </div>
        <div className="pc hot rv">
          <h3>Host Pro</h3>
          <div className="n">$29</div>
          <small>per event</small>
          <ul>
            <li>Full-resolution downloads</li>
            <li>Live TV wall and QR kits</li>
            <li>Custom branding</li>
            <li>90-day secure archive</li>
          </ul>
          <a className="btn" href="#get">Get Host Pro</a>
        </div>
        <div className="pc rv">
          <h3>Studio &amp; Agency</h3>
          <div className="n">$79</div>
          <small>per month</small>
          <ul>
            <li>Unlimited events</li>
            <li>Multi-photographer upload</li>
            <li>White-label galleries</li>
          </ul>
          <a className="btn o" href="#">Contact sales</a>
        </div>
      </div>
    </div>
  </section>
);

const Quotes = () => (
  <section style={{ paddingTop: 20 }}>
    <div className="wrap">
      <div className="hd rv"><h2>Real people.<br />Real results.</h2></div>
      <div className="qs">
        <div className="q rv">
          <small><b>Marcus Vasco</b>Wedding photographer</small>
          <p>We cut photo delivery from three weeks to three minutes. Guests were amazed.</p>
        </div>
        <div className="q rv">
          <small><b>Sarah Khan</b>Conference director</small>
          <p>Half our attendees found their photos before the keynote ended.</p>
        </div>
        <div className="q rv">
          <small><b>Elena Rivera</b>Festival organiser</small>
          <p>25,000 photos, 2,000 guests, zero slowdown.</p>
        </div>
      </div>
    </div>
  </section>
);

const Faq = () => (
  <section id="faq" style={{ paddingTop: 20 }}>
    <div className="wrap" style={{ maxWidth: "900px" }}>
      <div className="hd rv"><h2>Questions, answered.</h2></div>
      <details open>
        <summary>Do guests need to download an app?</summary>
        <p>No. Guests scan a QR code, take a selfie in their mobile browser and get their gallery instantly.</p>
      </details>
      <details>
        <summary>How does face matching work?</summary>
        <p>Glimpse compares a guest’s selfie with the faces in the event gallery and returns only their photos.</p>
      </details>
      <details>
        <summary>Is biometric data private?</summary>
        <p>Yes. Face data is encrypted, never shared and can be deleted at any time.</p>
      </details>
      <details>
        <summary>How fast do photos appear?</summary>
        <p>Photos are matched as the photographer uploads, so new shots show up within moments.</p>
      </details>
      <details>
        <summary>Can we show a live slideshow at the venue?</summary>
        <p>Yes. Cast the Live TV slideshow to any screen and photos appear as they arrive.</p>
      </details>
    </div>
  </section>
);

export { Steps, Features, Screens, Stats, Pricing, Quotes, Faq };
