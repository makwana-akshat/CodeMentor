import React from 'react'
import { X, ShieldAlert, Bug, Activity, Search, ShieldCheck, Zap, BookOpen, GitMerge, Sparkles } from 'lucide-react'

export default function AnalysisArtifact({ data, onClose, onAskAI }) {
  if (!data) return null;

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <h2 className="text-lg font-semibold text-primary-text flex items-center gap-2">
          <Activity size={20} className="text-accent" />
          Code Analysis Report
        </h2>
        <button 
          onClick={onClose}
          className="p-2 text-secondary-text hover:text-primary-text hover:bg-white/10 rounded-full transition-colors"
          title="Close Report"
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Security & Bugs Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <AnalysisCard 
            title={`Security Risks (${data.security?.length || 0})`}
            icon={<ShieldAlert size={18} className="text-red-500" />}
            items={data.security}
            topBorder="border-t-red-500"
            onAskAI={onAskAI}
          />
          <AnalysisCard 
            title={`Bugs Found (${data.bugs?.length || 0})`}
            icon={<Bug size={18} className="text-orange-500" />}
            items={data.bugs}
            topBorder="border-t-orange-500"
            onAskAI={onAskAI}
          />
        </div>

        {/* Complexity & Best Practices Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 border-t-2 border-t-yellow-500 rounded-xl p-4 flex flex-col shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-yellow-500" />
              <h3 className="font-medium text-primary-text text-sm">Complexity</h3>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="bg-surface/50 rounded-md px-3 py-1.5 border border-border/50 flex-1">
                <span className="text-xs text-secondary-text block mb-0.5">Time</span>
                <span className="text-sm font-mono text-primary-text">{data.complexity?.time}</span>
              </div>
              <div className="bg-surface/50 rounded-md px-3 py-1.5 border border-border/50 flex-1">
                <span className="text-xs text-secondary-text block mb-0.5">Space</span>
                <span className="text-sm font-mono text-primary-text">{data.complexity?.space}</span>
              </div>
            </div>
            <p className="text-xs text-secondary-text leading-relaxed">
              {data.complexity?.description}
            </p>
          </div>

          <AnalysisCard 
            title="Best Practices"
            icon={<ShieldCheck size={18} className="text-green-500" />}
            items={data.best_practices}
            topBorder="border-t-green-500"
            onAskAI={onAskAI}
          />
        </div>

        {/* Smells & Optimizations */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <AnalysisCard 
            title={`Code Smells (${data.smells?.length || 0})`}
            icon={<Search size={18} className="text-purple-500" />}
            items={data.smells}
            topBorder="border-t-purple-500"
            onAskAI={onAskAI}
          />
          <AnalysisCard 
            title="Optimizations"
            icon={<Zap size={18} className="text-blue-500" />}
            items={data.optimizations}
            topBorder="border-t-blue-500"
            onAskAI={onAskAI}
          />
        </div>

        {/* Execution Flow */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 border-t-2 border-t-cyan-500 rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <GitMerge size={18} className="text-cyan-500" />
            <h3 className="font-medium text-primary-text text-sm">Execution Flow</h3>
          </div>
          <div className="bg-surface/50 border border-border/50 rounded-lg p-3 font-mono text-xs text-secondary-text max-h-60 overflow-y-auto scrollbar-thin">
            {data.flow}
          </div>
        </div>

        {/* Learning Path */}
        {data.learning && data.learning.length > 0 && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 border-t-2 border-t-indigo-500 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-indigo-500" />
              <h3 className="font-medium text-primary-text text-sm">Recommended Learning</h3>
            </div>
            <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin pr-2">
              {data.learning.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-sm text-primary-text hover:text-accent hover:underline transition-colors line-clamp-2">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

function AnalysisCard({ title, icon, items, topBorder = "border-t-transparent", onAskAI }) {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 border-t-2 ${topBorder} rounded-xl p-4 shadow-lg flex flex-col`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-medium text-primary-text text-sm">{title}</h3>
      </div>
      {(!items || items.length === 0) ? (
        <div className="text-sm text-secondary-text py-2">No issues found.</div>
      ) : (
        <ul className="space-y-3 flex-1 max-h-60 overflow-y-auto scrollbar-thin pr-2">
          {items.map((item, idx) => (
            <li key={idx} className="group relative bg-surface/50 border border-border/50 rounded-lg p-3 hover:border-white/20 transition-colors">
              <div className="pr-8">
                <h4 className="text-sm font-medium text-primary-text mb-1">{item.title}</h4>
                <p className="text-xs text-secondary-text leading-relaxed line-clamp-2">{item.description}</p>
              </div>
              <button 
                onClick={() => onAskAI && onAskAI(`Explain the '${item.title}' issue and how to fix it.`)}
                className="absolute top-2 right-2 p-1.5 bg-surface border border-border rounded-md text-accent opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-hover shadow-sm"
                title="Ask AI to explain"
              >
                <Sparkles size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
