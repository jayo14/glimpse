import { art } from "@/lib/art";

const hits = [2, 9, 13, 20, 26];

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

export function Sheet() {
  const tiles = [...Array(32)].map((_, i) => {
    const v = 40 + ((i * 53) % 50);
    const isHit = hits.includes(i);
    return (
      <div
        key={i}
        className="t"
        style={({
          "--g": `linear-gradient(${150 + i * 7}deg,hsl(0 0% ${v}%),hsl(0 0% ${v - 30}%))`,
          "--b": `hsl(0 0% ${v - 18}%)`,
          "--h": `hsl(0 0% ${v - 8}%)`,
          "--img": `url("${art(i, isHit ? 0 : i + 1)}")`,
        } as unknown as React.CSSProperties)}
      >
        <i>✓</i>
      </div>
    );
  });

  return (
    <div className="sheet">
      <div className="tiles" id="tiles">
        {tiles}
      </div>
      <div className="pillm">
        <span className="selfie"></span>
        <span>Matching your selfie</span>
        <b id="cnt">0</b>
        <span className="mute">photos found</span>
      </div>
      <div className="atxt">
        <h2>5 photos found.<br /><i className="mute">Now they’re yours.</i></h2>
      </div>
      <div className="atitle">
        <h3>Hope & Victor’s Wedding</h3>
        <small>5 photos from your night</small>
      </div>
      <div className="gh">Every event, in one place</div>
      <div className="gal" id="gal2">
        {AL.map(([name, count], k) => {
          const n = k ? 3 : 5;
          const c = (n - 1) / 2;
          return (
            <div key={k} className="al">
              <div className="cv">
                {[...Array(n)].map((_, j) => {
                  const seed = 70 + k * 3 + j;
                  const w = k ? seed : 0;
                  return (
                    <i
                      key={j}
                      style={({
                        "--img": `url("${art(seed, w)}")`,
                        transform: `rotate(${(j - c) * 8}deg) translateX(${(j - c) * 14}%)`,
                      } as unknown as React.CSSProperties)}
                    />
                  );
                })}
              </div>
              <h3>{name}</h3>
              <small>{count} photos</small>
            </div>
          );
        })}
      </div>
      <div className="fx">
        <h2>Every moment,<br />kept in albums.</h2>
      </div>
    </div>
  );
}
