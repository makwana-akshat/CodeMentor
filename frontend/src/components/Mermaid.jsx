import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

export default function Mermaid({ chart }) {
  const ref = useRef(null);

  useEffect(() => {
    let isMounted = true;
    if (ref.current && chart) {
      const id = `mermaid-${Math.random().toString(36).substring(7)}`;
      mermaid.render(id, chart)
        .then(({ svg }) => {
          if (isMounted && ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch(err => {
          console.error('Mermaid render error:', err);
          if (isMounted && ref.current) {
            ref.current.innerHTML = `<div class="text-red-500 text-sm">Failed to render diagram.</div>`;
          }
        });
    }
    return () => { isMounted = false; };
  }, [chart]);

  return (
    <div 
      ref={ref} 
      className="mermaid flex justify-center py-6 overflow-x-auto bg-[#0D1117] rounded-xl border border-border my-4" 
    />
  );
}
