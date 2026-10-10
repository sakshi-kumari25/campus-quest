import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function LabDiscussion({ comments, activeTopicId, currentComment, setCurrentComment, onAddComment }) {
  const activeComments = comments[activeTopicId] || [];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col h-[350px] shadow-xs text-left transition-colors duration-300">
      <div className="flex items-center gap-2 mb-3 border-b border-zinc-100 dark:border-zinc-800 pb-2">
        <MessageSquare className="w-4 h-4 text-violet-500" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Lab Discussion</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1 max-h-[220px]">
        {activeComments.length === 0 ? (
          <div className="text-xs text-zinc-400 italic text-center py-6">No threads yet. Be the first to ask!</div>
        ) : (
          activeComments.map((c, i) => (
            <div key={i} className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 font-sans">
              <div className="flex justify-between items-center text-[10px] mb-1">
                <span className="font-bold text-violet-600 dark:text-violet-400">{c.user}</span>
                <span className="text-zinc-400 font-mono">{c.time}</span>
              </div>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">{c.text}</p>
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={onAddComment} className="flex gap-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <input 
          type="text" 
          value={currentComment} 
          onChange={(e) => setCurrentComment(e.target.value)} 
          placeholder="Ask a question..." 
          className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-900 dark:text-slate-200 placeholder-zinc-400 focus:outline-none focus:border-violet-500" 
        />
        <button type="submit" className="p-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors cursor-pointer">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}