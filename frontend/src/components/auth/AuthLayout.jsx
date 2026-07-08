import React, { useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import { Terminal } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

function AnimatedCodeHero() {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    const codeString = `function optimizeCode(ast) {
  const visitor = new PatternVisitor();
  ast.traverse(visitor);
  
  if (visitor.foundInefficiencies) {
    return applyHeuristics(ast, {
      level: 'expert',
      analyzeComplexity: true
    });
  }
  return { optimized: true, ast };
}`;

    // Blink cursor
    gsap.to(cursorRef.current, { opacity: 0, ease: "power2.inOut", repeat: -1 });

    // Type text
    gsap.to(textRef.current, {
      text: codeString,
      duration: 4,
      ease: "none",
      delay: 0.5
    });
  }, []);

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-accent/20 p-3 rounded-2xl border border-accent/30">
          <Terminal size={32} className="text-accent" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">CodeMentor AI</h1>
      </div>
      <p className="text-secondary-text text-lg mb-8 max-w-sm">
        Your Pro-Max AI pair programmer. Understand, refactor, and visualize complex architectures in seconds.
      </p>
      
      <div className="bg-sidebar border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 py-3 bg-background border-b border-border">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-xs text-secondary-text font-mono ml-4">optimizer.ts</div>
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed text-[#569CD6]">
          <span ref={textRef}></span>
          <span ref={cursorRef} className="inline-block w-2.5 h-4 ml-0.5 align-middle bg-white"></span>
        </div>
      </div>
    </div>
  )
}

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <LoadingScreen />;
  }

  // If user is already authenticated, don't let them see login/register
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex w-full h-full">
      <div className="hidden md:flex flex-col w-1/2 bg-sidebar items-center justify-center p-12 border-r border-border">
        <AnimatedCodeHero />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-4 bg-background">
        <Outlet />
      </div>
    </div>
  );
}
