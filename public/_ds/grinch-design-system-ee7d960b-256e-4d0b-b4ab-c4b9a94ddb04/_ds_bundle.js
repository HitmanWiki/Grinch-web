/* @ds-bundle: {"format":3,"namespace":"GRINCHDesignSystem_ee7d96","components":[{"name":"ChecklistItem","sourcePath":"components/contest/ChecklistItem.jsx"},{"name":"CountdownTimer","sourcePath":"components/contest/CountdownTimer.jsx"},{"name":"PrizeRow","sourcePath":"components/contest/PrizeRow.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"}],"sourceHashes":{"components/contest/ChecklistItem.jsx":"12edf0289bd7","components/contest/CountdownTimer.jsx":"3d173cca3cf8","components/contest/PrizeRow.jsx":"49908625f73c","components/core/Badge.jsx":"48f343711108","components/core/Button.jsx":"b164be16574b","components/core/Card.jsx":"3812ee46b0cc","ui_kits/contest/ContestLanding.jsx":"a99970d4843b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GRINCHDesignSystem_ee7d96 = window.GRINCHDesignSystem_ee7d96 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/contest/ChecklistItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A single criterion / bonus / rule line with a glowing neon check or bullet.
 * Used for the Judging Criteria and Bonus Points lists.
 */
function ChecklistItem({
  children,
  marker = 'check',
  accent = 'neon',
  style,
  ...rest
}) {
  const color = accent === 'gold' ? 'var(--gold)' : 'var(--neon)';
  const glow = accent === 'gold' ? 'var(--text-glow-gold)' : 'var(--text-glow-neon)';
  const Glyph = () => {
    if (marker === 'dot') {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 'none',
          width: 8,
          height: 8,
          marginTop: 9,
          borderRadius: '50%',
          background: color,
          boxShadow: glow
        }
      });
    }
    return /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      style: {
        flex: 'none',
        marginTop: 2,
        filter: 'drop-shadow(0 0 6px ' + (accent === 'gold' ? 'rgba(255,212,59,0.6)' : 'rgba(57,255,20,0.6)') + ')'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 10.5L8 14.5L16 5.5",
      stroke: color,
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }));
  };
  return /*#__PURE__*/React.createElement("li", _extends({
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      padding: '10px 0',
      listStyle: 'none',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-lg)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(Glyph, null), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { ChecklistItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/contest/ChecklistItem.jsx", error: String((e && e.message) || e) }); }

// components/contest/CountdownTimer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Live neon countdown to a target date. Shows Days / Hours / Minutes / Seconds.
 * Falls back to a static end-date label once the deadline passes.
 */
function CountdownTimer({
  deadline,
  days = 14,
  accent = 'neon',
  style,
  ...rest
}) {
  // Resolve target: explicit deadline, else now + `days`.
  const target = React.useMemo(() => {
    if (deadline) return new Date(deadline).getTime();
    return Date.now() + days * 24 * 60 * 60 * 1000;
  }, [deadline, days]);
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const ended = diff === 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  const s = Math.floor(diff % 60000 / 1000);
  const color = accent === 'gold' ? 'var(--gold)' : 'var(--neon)';
  const glow = accent === 'gold' ? 'var(--glow-gold)' : 'var(--glow-neon)';
  const tglow = accent === 'gold' ? 'var(--text-glow-gold)' : 'var(--text-glow-neon)';
  const pad = n => String(n).padStart(2, '0');
  const units = [{
    label: 'Days',
    value: pad(d)
  }, {
    label: 'Hours',
    value: pad(h)
  }, {
    label: 'Minutes',
    value: pad(m)
  }, {
    label: 'Seconds',
    value: pad(s)
  }];
  if (ended) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--fs-2xl)',
        color,
        textShadow: tglow,
        ...style
      }
    }, rest), "Contest closed");
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      ...style
    }
  }, rest), units.map(u => /*#__PURE__*/React.createElement("div", {
    key: u.label,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '20px 8px',
      background: 'var(--surface-raised)',
      border: `1px solid ${accent === 'gold' ? 'var(--border-gold)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: glow
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 'clamp(28px, 9vw, 48px)',
      lineHeight: 1,
      color,
      textShadow: tglow,
      fontVariantNumeric: 'tabular-nums'
    }
  }, u.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, u.label))));
}
Object.assign(__ds_scope, { CountdownTimer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/contest/CountdownTimer.jsx", error: String((e && e.message) || e) }); }

// components/contest/PrizeRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * One row of the prize-pool table. Top-3 places get the gold treatment;
 * remaining places use the neon theme. Use inside a vertical stack.
 */
function PrizeRow({
  place,
  reward,
  rank,
  highlight = false,
  style,
  ...rest
}) {
  const isGold = highlight;
  const accent = isGold ? 'var(--gold)' : 'var(--neon)';
  const glow = isGold ? 'var(--text-glow-gold)' : 'var(--text-glow-neon)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '18px 22px',
      background: isGold ? 'rgba(255,212,59,0.06)' : 'var(--surface-raised)',
      border: `1px solid ${isGold ? 'var(--border-gold)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: isGold ? 'var(--glow-gold)' : 'none',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      color: isGold ? 'var(--black)' : accent,
      background: isGold ? 'var(--gold)' : 'transparent',
      border: isGold ? 'none' : `1px solid ${accent}`,
      boxShadow: isGold ? 'var(--glow-gold)' : 'none'
    }
  }, rank ?? ''), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 600,
      color: 'var(--text-body)',
      whiteSpace: 'nowrap'
    }
  }, place)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 'var(--fs-lg)',
      color: accent,
      textShadow: glow,
      whiteSpace: 'nowrap'
    }
  }, reward));
}
Object.assign(__ds_scope, { PrizeRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/contest/PrizeRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small glowing label / eyebrow. Use `neon` for section tags, `gold` for podium ranks,
 * `outline` for quiet meta chips.
 */
function Badge({
  children,
  variant = 'neon',
  style,
  ...rest
}) {
  const variants = {
    neon: {
      color: 'var(--neon)',
      background: 'rgba(57,255,20,0.10)',
      border: '1px solid var(--border-strong)',
      textShadow: 'var(--text-glow-neon)'
    },
    gold: {
      color: 'var(--gold)',
      background: 'rgba(255,212,59,0.10)',
      border: '1px solid var(--border-gold)',
      textShadow: 'var(--text-glow-gold)'
    },
    outline: {
      color: 'var(--text-muted)',
      background: 'transparent',
      border: '1px solid var(--border)'
    },
    solid: {
      color: 'var(--text-on-accent)',
      background: 'var(--neon)',
      border: '1px solid var(--neon)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1,
      ...(variants[variant] || variants.neon),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * $GRINCH primary action. Neon-green fill with black text is the canonical CTA.
 * Glows on hover. Use `outline` for secondary actions, `gold` for podium/prize context.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  fullWidth = false,
  disabled = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 18px',
      height: 40,
      fontSize: 14
    },
    md: {
      padding: '0 28px',
      height: 52,
      fontSize: 16
    },
    lg: {
      padding: '0 40px',
      height: 64,
      fontSize: 19
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--neon)',
      color: 'var(--text-on-accent)',
      border: '1px solid var(--neon)',
      boxShadow: 'var(--glow-neon)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--neon)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'none'
    },
    gold: {
      background: 'var(--gold)',
      color: 'var(--black)',
      border: '1px solid var(--gold)',
      boxShadow: 'var(--glow-gold)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
      boxShadow: 'none'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-body)',
    fontSize: s.fontSize,
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), filter var(--dur) var(--ease-out)',
    whiteSpace: 'nowrap',
    ...(variants[variant] || variants.primary),
    ...style
  };
  const Tag = as === 'a' || href ? 'a' : 'button';
  const interactive = !disabled;
  const onEnter = e => {
    if (!interactive) return;
    e.currentTarget.style.transform = 'translateY(-2px)';
    if (variant === 'primary') e.currentTarget.style.boxShadow = 'var(--glow-neon-strong)';
    if (variant === 'gold') e.currentTarget.style.boxShadow = 'var(--glow-gold-strong)';
    if (variant === 'outline') {
      e.currentTarget.style.boxShadow = 'var(--glow-neon)';
      e.currentTarget.style.borderColor = 'var(--neon)';
    }
    if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-hover)';
  };
  const onLeave = e => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = base.boxShadow;
    if (variant === 'outline') e.currentTarget.style.borderColor = 'var(--border-strong)';
    if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: base,
    disabled: Tag === 'button' ? disabled : undefined,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dark surface container with a faint neon border. The default content block on a
 * $GRINCH page. Set `glow` for emphasis and `accent="gold"` for podium cards.
 */
function Card({
  children,
  glow = false,
  accent = 'neon',
  padding = 'var(--space-6)',
  style,
  ...rest
}) {
  const accents = {
    neon: {
      borderColor: glow ? 'var(--border-strong)' : 'var(--border)',
      boxShadow: glow ? 'var(--glow-neon)' : 'var(--shadow-card)'
    },
    gold: {
      borderColor: 'var(--border-gold)',
      boxShadow: glow ? 'var(--glow-gold)' : 'var(--shadow-card)'
    },
    none: {
      borderColor: 'var(--border)',
      boxShadow: 'var(--shadow-card)'
    }
  };
  const a = accents[accent] || accents.neon;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--surface-raised)',
      border: `1px solid ${a.borderColor}`,
      borderRadius: 'var(--radius-lg)',
      boxShadow: a.boxShadow,
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// ui_kits/contest/ContestLanding.jsx
try { (() => {
/* $GRINCH Content Contest — landing page recreation.
   Composes the design-system components from window.GRINCHDesignSystem_ee7d96.
   Mobile-first, single column. Final copy pasted verbatim from the build brief. */
(function () {
  const NS = window.GRINCHDesignSystem_ee7d96;
  const {
    Button,
    Badge,
    Card,
    ChecklistItem,
    PrizeRow,
    CountdownTimer
  } = NS;
  const e = React.createElement;

  // Asset URLs — resolve to inlined blobs in the standalone bundle, else relative paths.
  const RES = window.__resources || {};
  const LOGO = RES.grinchLogo || '../../assets/grinch-logo.png';
  const BANNER = RES.grinchBanner || '../../assets/grinch-banner.gif';

  // ---- contest config ----
  // Started 11 Jun 2026 01:00 ICT (Vietnam, UTC+7) — ends 11 Jul 2026 01:00 ICT.
  const DEADLINE = '2026-07-11T01:00:00+07:00';
  const PAIR = 'EQDPVWtQR53CWgAt_vcfSMrLeg5FbvSttJMRVyvprF_roC9z'; // DexScreener TON pair
  const POOL_TOKENS = 6000000;
  // TODO(Fabio): paste the real contest X post URL.
  const ENTRY_POST_URL = 'https://x.com/thegrinchpepe';
  const X_ACCOUNT_URL = 'https://x.com/thegrinchpepe';
  const TELEGRAM_URL = 'https://t.me/grinchgramCTO';

  // ---- live $GRINCH price from DexScreener ----
  function useGrinchPrice() {
    const [d, setD] = React.useState(null);
    React.useEffect(() => {
      let alive = true;
      const url = 'https://api.dexscreener.com/latest/dex/pairs/ton/' + PAIR;
      const load = () => fetch(url).then(r => r.json()).then(j => {
        if (!alive) return;
        const p = j.pair || j.pairs && j.pairs[0];
        if (p && p.priceUsd) setD({
          price: parseFloat(p.priceUsd),
          mcap: p.marketCap || p.fdv || null
        });
      }).catch(() => {});
      load();
      const id = setInterval(load, 30000);
      return () => {
        alive = false;
        clearInterval(id);
      };
    }, []);
    return d;
  }
  function fmtUsd(n) {
    if (n == null || !isFinite(n)) return null;
    if (n >= 1000) return '$' + Math.round(n).toLocaleString('en-US');
    return '$' + n.toLocaleString('en-US', {
      maximumFractionDigits: 2
    });
  }
  // Live USD value of a token amount, rendered inline.
  function LiveUsd({
    tokens,
    style,
    prefix
  }) {
    const d = useGrinchPrice();
    const usd = d ? fmtUsd(tokens * d.price) : null;
    return e('span', {
      style: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--gold)',
        ...style
      }
    }, usd ? (prefix || '\u2248 ') + usd : 'fetching live price\u2026');
  }

  // ---- shared style helpers (inline; tokens come from styles.css) ----
  const CONTAINER = {
    width: '100%',
    maxWidth: 'var(--container)',
    margin: '0 auto',
    padding: '0 var(--gutter)',
    boxSizing: 'border-box'
  };
  const SECTION = {
    padding: 'var(--section-pad-y) 0'
  };
  function Eyebrow({
    children,
    variant
  }) {
    return e('div', {
      style: {
        marginBottom: 'var(--space-5)'
      }
    }, e(Badge, {
      variant: variant || 'neon'
    }, children));
  }
  function SectionHeading({
    children
  }) {
    return e('h2', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 7vw, 44px)',
        lineHeight: 'var(--lh-snug)',
        margin: '0 0 var(--space-6)',
        color: 'var(--white)'
      }
    }, children);
  }

  // ---- Sticky top bar ----
  function TopBar() {
    return e('header', {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(5,5,5,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)'
      }
    }, e('div', {
      style: {
        ...CONTAINER,
        maxWidth: 'var(--container-wide)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64
      }
    }, e('a', {
      href: '#top',
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none'
      }
    }, e('img', {
      src: LOGO,
      alt: '$GRINCH',
      width: 36,
      height: 36,
      style: {
        borderRadius: '50%',
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--glow-neon)'
      }
    }), e('span', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        color: 'var(--neon)',
        textShadow: 'var(--text-glow-neon)'
      }
    }, '$GRINCH')), e(Button, {
      as: 'a',
      href: ENTRY_POST_URL,
      target: '_blank',
      rel: 'noopener',
      size: 'sm'
    }, 'Enter')));
  }

  // ---- Hero ----
  function Hero() {
    return e('section', {
      style: {
        ...SECTION,
        position: 'relative',
        paddingTop: 'var(--space-8)',
        overflow: 'hidden'
      }
    },
    // radial glow backdrop
    e('div', {
      'aria-hidden': true,
      style: {
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 680,
        height: 680,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(57,255,20,0.16), rgba(57,255,20,0) 62%)',
        pointerEvents: 'none',
        filter: 'blur(8px)'
      }
    }), e('div', {
      style: {
        ...CONTAINER,
        position: 'relative',
        textAlign: 'center'
      }
    }, e('img', {
      src: BANNER,
      alt: 'Pepe Grinch',
      style: {
        display: 'block',
        width: '100%',
        maxWidth: 560,
        height: 'auto',
        margin: '0 auto var(--space-6)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--glow-neon)'
      }
    }), e('div', {
      style: {
        marginBottom: 'var(--space-5)'
      }
    }, e(Badge, {
      variant: 'outline'
    }, 'Pepe Grinch on TON')), e('h1', {
      style: {
        fontFamily: 'var(--font-display)',
        color: 'var(--neon)',
        fontSize: 'clamp(44px, 13vw, 88px)',
        lineHeight: 'var(--lh-tight)',
        margin: '0 0 var(--space-5)',
        textShadow: 'var(--text-glow-neon)',
        textWrap: 'balance'
      }
    }, '$GRINCH Contest'), e('div', {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '10px 22px',
        marginBottom: 'var(--space-3)',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-pill)',
        background: 'rgba(255,212,59,0.06)'
      }
    }, e('span', {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, 'Total Prize Pool'), e('span', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: 18,
        color: 'var(--gold)',
        textShadow: 'var(--text-glow-gold)'
      }
    }, '6M $GRINCH')), e('div', {
      style: {
        marginBottom: 'var(--space-6)',
        fontSize: 14
      }
    }, e(LiveUsd, {
      tokens: POOL_TOKENS
    }), e('span', {
      style: {
        color: 'var(--text-dim)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, '  \u00b7 live at current price')), e('p', {
      style: {
        maxWidth: 600,
        margin: '0 auto var(--space-7)',
        fontSize: 'var(--fs-lg)',
        lineHeight: 'var(--lh-normal)',
        color: 'var(--text-muted)',
        textWrap: 'pretty'
      }
    }, 'We are looking for the best writers, researchers, storytellers, meme creators, and community builders. Create an original post, article, thread, thesis, meme analysis, arts and animations or deep dive about $GRINCH.'), e('div', {
      id: 'enter'
    }, e(Button, {
      as: 'a',
      href: ENTRY_POST_URL,
      target: '_blank',
      rel: 'noopener',
      size: 'lg'
    }, 'Enter the Contest →')), e('div', {
      style: {
        marginTop: 'var(--space-6)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center'
      }
    }, ['1 · Follow $GRINCH on X', '2 · Requote the contest post with your entry', '3 · Comment your entry under the post'].map(s => e('span', {
      key: s,
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-muted)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-pill)',
        padding: '7px 14px'
      }
    }, s)))));
  }

  // ---- How it works (explainer + art + animation) ----
  function Explainer() {
    const metrics = [{
      k: 'Views',
      d: 'Reach as many eyes as possible. Impressions are the heartbeat of the contest.'
    }, {
      k: 'Virality',
      d: 'Content that spreads — reposts, quotes, and shares that travel across X and Telegram.'
    }, {
      k: 'Community action',
      d: 'Real engagement: comments, replies, new members, and people you bring into the ecosystem.'
    }];
    return e('section', {
      style: {
        ...SECTION,
        position: 'relative',
        overflow: 'hidden'
      }
    }, e('div', {
      style: CONTAINER
    }, e(Eyebrow, null, 'How it works'), e('div', {
      style: {
        display: 'grid',
        gap: 'var(--space-7)',
        gridTemplateColumns: '1fr',
        alignItems: 'center'
      }
    },
    // animated art emblem
    e('div', {
      className: 'grinch-art',
      style: {
        position: 'relative',
        height: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, e('div', {
      'aria-hidden': true,
      className: 'grinch-ring',
      style: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: '50%',
        border: '1px solid var(--border-strong)'
      }
    }), e('div', {
      'aria-hidden': true,
      className: 'grinch-ring grinch-ring-2',
      style: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: '50%',
        border: '1px solid var(--border-gold)'
      }
    }), e('div', {
      className: 'grinch-emblem',
      style: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '1px solid var(--border-strong)',
        boxShadow: 'var(--glow-neon-strong)'
      }
    }, e('img', {
      src: LOGO,
      alt: '$GRINCH',
      width: 120,
      height: 120,
      style: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }))), e('div', null, e('h2', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(26px, 6.5vw, 40px)',
        lineHeight: 'var(--lh-snug)',
        margin: '0 0 var(--space-5)',
        color: 'var(--white)'
      }
    }, 'Make $GRINCH impossible to ignore'), e('p', {
      style: {
        fontSize: 'var(--fs-lg)',
        lineHeight: 'var(--lh-normal)',
        color: 'var(--text-muted)',
        margin: '0 0 var(--space-6)'
      }
    }, 'A 30\u2011day sprint to spread the $GRINCH story across X and Telegram. Post, meme, write, and rally \u2014 this contest is measured in ', e('strong', {
      style: {
        color: 'var(--neon)'
      }
    }, 'views, virality, and community action'), '.'), e('div', {
      style: {
        display: 'grid',
        gap: 12,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
      }
    }, metrics.map((m, i) => e('div', {
      key: m.k,
      className: 'grinch-fade',
      style: {
        animationDelay: i * 120 + 'ms',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-5)'
      }
    }, e('div', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        color: 'var(--neon)',
        textShadow: 'var(--text-glow-neon)',
        marginBottom: 8
      }
    }, m.k), e('div', {
      style: {
        fontSize: 'var(--fs-base)',
        lineHeight: 'var(--lh-normal)',
        color: 'var(--text-muted)'
      }
    }, m.d))))))));
  }

  // ---- What we want ----
  function WhatWeWant() {
    const formats = ['Original post', 'Article', 'Thread', 'Thesis', 'Meme analysis', 'Art & animation', 'Deep dive'];
    return e('section', {
      style: SECTION
    }, e('div', {
      style: CONTAINER
    }, e(Eyebrow, null, 'What we want'), e(SectionHeading, null, 'Who should enter'), e('p', {
      style: {
        fontSize: 'var(--fs-lg)',
        lineHeight: 'var(--lh-normal)',
        color: 'var(--text-muted)',
        maxWidth: 560,
        margin: '0 0 var(--space-6)'
      }
    }, 'The best writers, researchers, storytellers, meme creators, and community builders. Create original content about $GRINCH — any of these formats:'), e('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12
      }
    }, formats.map(f => e(Badge, {
      key: f,
      variant: 'neon'
    }, f)))));
  }

  // ---- Duration ----
  function Duration() {
    return e('section', {
      style: SECTION
    }, e('div', {
      style: CONTAINER
    }, e(Eyebrow, null, 'Duration · live now'), e('div', {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 16,
        marginBottom: 'var(--space-6)',
        flexWrap: 'wrap'
      }
    }, e('span', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(36px,9vw,56px)',
        color: 'var(--neon)',
        textShadow: 'var(--text-glow-neon)',
        lineHeight: 1
      }
    }, 'Ends July 11')), e(CountdownTimer, {
      deadline: DEADLINE
    })));
  }

  // ---- Judging criteria ----
  function Judging() {
    const items = ['Likes', 'Bookmarks', 'Comments', 'Overall engagement quality', 'Contribution to the $GRINCH narrative', 'Effort and consistency throughout the contest'];
    return e('section', {
      style: SECTION
    }, e('div', {
      style: CONTAINER
    }, e(Eyebrow, null, 'Judging criteria'), e(SectionHeading, null, 'How winners are chosen'), e(Card, null, e('ul', {
      style: {
        margin: 0,
        padding: 0
      }
    }, items.map(it => e(ChecklistItem, {
      key: it
    }, it))))));
  }

  // ---- Bonus points ----
  function Bonus() {
    const items = ['Verified X accounts (Blue Checkmark)', 'Accounts with strong reach / influence (KOLs)', 'Active Telegram contributors', 'Community builders helping expand the ecosystem', 'Consistent daily posting throughout the 30 days', 'Original, high-effort content (not recycled or low-effort)', 'Bringing in new members and active referrals', 'Cross-platform presence (X + Telegram and beyond)', 'Correct use of the official $GRINCH cashtag and hashtag', 'Engaging with and amplifying other contributors'];
    return e('section', {
      style: SECTION
    }, e('div', {
      style: CONTAINER
    }, e(Eyebrow, {
      variant: 'gold'
    }, 'Bonus points'), e(SectionHeading, null, 'Skin in the game'), e('p', {
      style: {
        fontSize: 'var(--fs-lg)',
        lineHeight: 'var(--lh-normal)',
        color: 'var(--text-muted)',
        maxWidth: 560,
        margin: '0 0 var(--space-6)'
      }
    }, 'Extra weight goes to entrants who show real skin in the game and help the ecosystem grow:'), e(Card, {
      accent: 'gold'
    }, e('ul', {
      style: {
        margin: 0,
        padding: 0,
        columnGap: 'var(--space-7)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))'
      }
    }, items.map(it => e(ChecklistItem, {
      key: it,
      accent: 'gold',
      marker: 'dot'
    }, it))))));
  }

  // ---- Prize pool ----
  function Prizes() {
    const rows = [{
      rank: '1',
      place: '1st Place',
      reward: '2.0M $GRINCH',
      highlight: true
    }, {
      rank: '2',
      place: '2nd Place',
      reward: '1.25M $GRINCH',
      highlight: true
    }, {
      rank: '3',
      place: '3rd Place',
      reward: '750K $GRINCH',
      highlight: true
    }, {
      rank: '4',
      place: '4th Place',
      reward: '500K $GRINCH'
    }, {
      rank: '5',
      place: '5th Place',
      reward: '500K $GRINCH'
    }, {
      rank: '6',
      place: '6th Place',
      reward: '500K $GRINCH'
    }, {
      rank: '7',
      place: '7th Place',
      reward: '500K $GRINCH'
    }];
    return e('section', {
      style: SECTION
    }, e('div', {
      style: CONTAINER
    }, e(Eyebrow, {
      variant: 'gold'
    }, 'Prize pool'), e(SectionHeading, null, '6M $GRINCH · 7 places'), e('p', {
      style: {
        margin: '-12px 0 var(--space-6)',
        fontSize: 14
      }
    }, e(LiveUsd, {
      tokens: POOL_TOKENS,
      style: {
        fontWeight: 700
      }
    }), e('span', {
      style: {
        color: 'var(--text-dim)',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, '  \u00b7 total pool at current price')), e('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, rows.map(r => e(PrizeRow, {
      key: r.rank,
      ...r
    })))));
  }

  // ---- The spirit ----
  function Spirit() {
    return e('section', {
      style: SECTION
    }, e('div', {
      style: CONTAINER
    }, e(Eyebrow, null, 'The spirit'), e(Card, {
      glow: true,
      style: {
        padding: 'var(--space-8) var(--space-6)'
      }
    }, e('p', {
      style: {
        fontSize: 'var(--fs-lg)',
        lineHeight: 'var(--lh-normal)',
        color: 'var(--text-muted)',
        margin: '0 0 var(--space-5)'
      }
    }, 'The judges will remain anonymous (well known in the TON community) throughout the contest.'), e('p', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px,5vw,30px)',
        color: 'var(--white)',
        lineHeight: 'var(--lh-snug)',
        margin: '0 0 var(--space-5)'
      }
    }, 'This is not a giveaway.'), e('p', {
      style: {
        fontSize: 'var(--fs-lg)',
        lineHeight: 'var(--lh-normal)',
        color: 'var(--text-muted)',
        margin: '0 0 var(--space-6)'
      }
    }, 'This is a competition to find the people who can best explain why $GRINCH exists and why the character was here long before the token.'), e('p', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 24,
        color: 'var(--neon)',
        textShadow: 'var(--text-glow-neon)',
        margin: 0
      }
    }, 'Good luck.'), e('p', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 24,
        color: 'var(--neon)',
        textShadow: 'var(--text-glow-neon)',
        margin: '6px 0 0'
      }
    }, "Don't get Grinched."))));
  }

  // ---- Footer ----
  function Footer() {
    return e('footer', {
      id: 'submit',
      style: {
        ...SECTION,
        borderTop: '1px solid var(--border)',
        textAlign: 'center'
      }
    }, e('div', {
      style: CONTAINER
    }, e('h2', {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px,8vw,48px)',
        color: 'var(--neon)',
        textShadow: 'var(--text-glow-neon)',
        margin: '0 0 var(--space-6)'
      }
    }, 'Ready to enter?'), e('div', {
      style: {
        marginBottom: 'var(--space-7)'
      }
    }, e(Button, {
      as: 'a',
      href: ENTRY_POST_URL,
      target: '_blank',
      rel: 'noopener',
      size: 'lg'
    }, 'Enter the Contest →')), e('div', {
      style: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 'var(--space-6)'
      }
    }, e(Button, {
      as: 'a',
      href: X_ACCOUNT_URL,
      target: '_blank',
      rel: 'noopener',
      variant: 'outline',
      size: 'sm'
    }, 'X / Twitter'), e(Button, {
      as: 'a',
      href: TELEGRAM_URL,
      target: '_blank',
      rel: 'noopener',
      variant: 'outline',
      size: 'sm'
    }, 'Telegram')), e('p', {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-dim)',
        margin: 0
      }
    }, 'grinchpepe.vip/contest • $GRINCH — Pepe Grinch on TON • Don\u2019t get Grinched')));
  }

  // ---- Sticky mobile CTA ----
  function StickyCTA() {
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
      const onScroll = () => setShow(window.scrollY > 600);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return e('div', {
      style: {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        padding: '12px var(--gutter) calc(12px + env(safe-area-inset-bottom))',
        background: 'linear-gradient(to top, rgba(5,5,5,0.96), rgba(5,5,5,0))',
        transform: show ? 'translateY(0)' : 'translateY(120%)',
        transition: 'transform var(--dur) var(--ease-out)',
        pointerEvents: show ? 'auto' : 'none'
      }
    }, e('div', {
      style: {
        maxWidth: 'var(--container)',
        margin: '0 auto'
      }
    }, e(Button, {
      as: 'a',
      href: ENTRY_POST_URL,
      target: '_blank',
      rel: 'noopener',
      size: 'lg',
      fullWidth: true
    }, 'Enter the Contest →')));
  }
  function ContestLanding() {
    return e(React.Fragment, null, e(TopBar), e(Hero), e(Explainer), e(WhatWeWant), e(Duration), e(Judging), e(Bonus), e(Prizes), e(Spirit), e(Footer), e(StickyCTA));
  }
  window.ContestLanding = ContestLanding;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/contest/ContestLanding.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ChecklistItem = __ds_scope.ChecklistItem;

__ds_ns.CountdownTimer = __ds_scope.CountdownTimer;

__ds_ns.PrizeRow = __ds_scope.PrizeRow;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

})();
