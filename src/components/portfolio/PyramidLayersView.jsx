import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { pyramidLayers } from './pyramidData';

function useScrollTriggeredInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return undefined;

    let observer;
    const handleScroll = () => {
      if (!('IntersectionObserver' in window)) {
        const bounds = element.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
        if (visibleHeight / bounds.height >= 0.25) {
          setVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
        return;
      }

      window.removeEventListener('scroll', handleScroll);
      observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio >= 0.25) {
          setVisible(true);
          observer.disconnect();
        }
      }, { threshold: 0.25 });
      observer.observe(element);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer?.disconnect();
    };
  }, [visible]);

  return [ref, visible];
}

function tierWidths(config, width) {
  const total = config.heights.reduce((sum, height) => sum + height, 0) + config.gap * (config.heights.length - 1);
  const widthAt = (y) => width * (config.topFrac + (1 - config.topFrac) * (y / total));
  let y = 0;
  return config.heights.map((height) => {
    const topWidth = widthAt(y);
    const bottomWidth = widthAt(y + height);
    y += height + config.gap;
    return { topWidth, bottomWidth };
  });
}

function roundedTierPath(points, radius) {
  let path = '';
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index + points.length - 1) % points.length];
    const point = points[index];
    const next = points[(index + 1) % points.length];
    const incoming = [previous[0] - point[0], previous[1] - point[1]];
    const outgoing = [next[0] - point[0], next[1] - point[1]];
    const incomingLength = Math.hypot(...incoming);
    const outgoingLength = Math.hypot(...outgoing);
    const cornerRadius = Math.min(radius, incomingLength / 2, outgoingLength / 2);
    const start = [
      point[0] + (incoming[0] / incomingLength) * cornerRadius,
      point[1] + (incoming[1] / incomingLength) * cornerRadius,
    ];
    const end = [
      point[0] + (outgoing[0] / outgoingLength) * cornerRadius,
      point[1] + (outgoing[1] / outgoingLength) * cornerRadius,
    ];
    path += `${index === 0 ? 'M' : 'L'}${start[0].toFixed(2)},${start[1].toFixed(2)} Q${point[0]},${point[1]} ${end[0].toFixed(2)},${end[1].toFixed(2)} `;
  }
  return `${path}Z`;
}

function usePyramidWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const updateWidth = () => setWidth(element.getBoundingClientRect().width);
    updateWidth();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateWidth);
    observer?.observe(element);
    return () => observer?.disconnect();
  }, []);

  return [ref, width];
}

function PyramidDirectionArrow({ label, direction, visible }) {
  const isUpward = direction === 'up';
  const description = isUpward
    ? `${label} increases towards Conviction`
    : 'Portfolio allocation increases towards Defensive and Income';
  const path = isUpward
    ? 'M5 398V12 M1.5 18L5 12L8.5 18'
    : 'M5 12V398 M1.5 392L5 398L8.5 392';

  return (
    <div className={`pyramid-direction-arrow flex min-w-0 items-stretch justify-center gap-0.5 ${visible ? 'is-visible' : ''}`}>
      <span aria-hidden="true" className="self-center text-[10px] font-semibold tracking-[0.12em] text-[#526FAE] [writing-mode:vertical-rl] rotate-180">
        {label}
      </span>
      <svg
        role="img"
        aria-label={description}
        className="h-full w-[8px] shrink-0 overflow-visible text-[#6F8DF0]"
        viewBox="0 0 10 410"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default function PyramidLayersView() {
  const [layersRef, layersVisible] = useScrollTriggeredInView();
  const [pyramidRef, pyramidWidth] = usePyramidWidth();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const desktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  const config = desktop
    ? { heights: [250, 104, 104, 104], gap: 8, topFrac: 0.05, radius: 22 }
    : { heights: [280, 82, 84, 84], gap: 5, topFrac: 0.1, radius: 16 };
  const widths = pyramidWidth ? tierWidths(config, pyramidWidth) : [];
  const pyramidHeight = config.heights.reduce((sum, height) => sum + height, 0) + config.gap * (config.heights.length - 1);

  return (
    <div ref={layersRef} className="pyramid-display mx-auto mt-10 grid w-full max-w-[1080px] grid-cols-[28px_minmax(0,1fr)_28px] items-stretch gap-1 sm:grid-cols-[48px_minmax(0,1fr)_48px] sm:gap-2 xl:mt-14 xl:grid-cols-[68px_minmax(0,1fr)_68px] xl:gap-4">
      <div role="group" aria-label="Potential return increases towards the top" className="grid grid-cols-1 items-stretch">
        <PyramidDirectionArrow label="RETURN" direction="up" visible={layersVisible} />
      </div>
      <div ref={pyramidRef} className={`pyramid-assembly mx-auto ${layersVisible ? 'is-visible' : ''}`} style={{ height: pyramidHeight }}>
        {pyramidWidth > 0 && (
          <ol aria-label="The four layers of the pyramid, from boldest to safest" className="flex h-full flex-col" style={{ gap: config.gap }}>
            {pyramidLayers.map((layer, index) => {
              const Icon = layer.icon;
              const height = config.heights[index];
              const { topWidth, bottomWidth } = widths[index];
              const center = pyramidWidth / 2;
              const points = [
                [center - topWidth / 2, 0],
                [center + topWidth / 2, 0],
                [center + bottomWidth / 2, height],
                [center - bottomWidth / 2, height],
              ];
              const path = roundedTierPath(points, config.radius);
              const gradientId = `${uid}-${layer.key}`;
              const highlightId = `${uid}-${layer.key}-highlight`;
              const ink = layer.key === 'conviction' || layer.key === 'smart-beta' ? '#FFFFFF' : '#0F1B45';
              const delay = `${(pyramidLayers.length - index - 1) * 110}ms`;
              const usableWidth = topWidth + (bottomWidth - topWidth) * 0.45;
              const sideInset = layer.key === 'conviction'
                ? 0
                : Math.max((pyramidWidth - usableWidth) / 2 + (desktop ? 18 : 10), desktop ? 12 : 8);

              return (
                <li
                  key={layer.key}
                  className={`pyramid-segment pyramid-segment--${layer.key} ${layersVisible ? 'is-visible' : ''}`}
                  style={{
                    height,
                    '--layer-delay': delay,
                    '--tier-top-width': `${topWidth}px`,
                    '--tier-bottom-width': `${bottomWidth}px`,
                  }}
                >
                  <svg aria-hidden="true" width={pyramidWidth} height={height} viewBox={`0 0 ${pyramidWidth} ${height}`} className="absolute left-0 top-0 overflow-visible" style={{ filter: 'drop-shadow(0 8px 16px rgba(33,80,232,0.14))' }}>
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={layer.colors.frontStart} />
                        <stop offset="100%" stopColor={layer.colors.frontEnd} />
                      </linearGradient>
                      <linearGradient id={highlightId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity={layer.key === 'conviction' || layer.key === 'smart-beta' ? 0.26 : 0.55} />
                        <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d={path} fill={`url(#${gradientId})`} />
                    <path d={path} fill={`url(#${highlightId})`} />
                    <path d={path} fill="none" stroke={layer.key === 'conviction' || layer.key === 'smart-beta' ? '#FFFFFF' : '#B5C3EE'} strokeOpacity={layer.key === 'conviction' || layer.key === 'smart-beta' ? 0.22 : 0.7} strokeWidth="1" />
                  </svg>

                  <div
                    className={`pyramid-segment-copy ${layer.key === 'conviction' ? 'pyramid-segment-copy--conviction' : 'pyramid-segment-copy--regular'}`}
                    style={{
                      color: ink,
                      paddingLeft: sideInset,
                      paddingRight: sideInset,
                      paddingBottom: layer.key === 'conviction' ? (desktop ? 20 : 14) : 0,
                    }}
                  >
                    {layer.key === 'conviction' ? (
                      <div className="pyramid-conviction-content">
                        <div className="pyramid-segment-heading">
                          <Icon aria-hidden="true" className="pyramid-conviction-icon" strokeWidth={1.9} />
                          <h3>{layer.name}</h3>
                        </div>
                        <ul>
                          {layer.bullets.map((bullet) => (
                            <li key={bullet}><span aria-hidden="true" />{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="pyramid-segment-content">
                        <div className="pyramid-segment-heading">
                          <Icon aria-hidden="true" className="pyramid-segment-icon" strokeWidth={1.9} />
                          <h3>{layer.name}</h3>
                        </div>
                        <p>{layer.desc}</p>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
      <div className="flex items-stretch justify-center">
        <PyramidDirectionArrow label="ALLOCATION %" direction="down" visible={layersVisible} />
      </div>
    </div>
  );
}
