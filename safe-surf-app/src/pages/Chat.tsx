import { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ChatMessage } from '../types';

const SUGGESTIONS = [
  'Best spot right now?',
  'Reef-safe sunscreen?',
  'Join a cleanup near me',
  'When to surf Uluwatu?',
];

const RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['best', 'spot', 'now', 'today', 'where', 'go'],
    reply: 'Balangan is your call today. Empty lineup, crystal water, peeling lefts at 1.4m. Don\'t overthink it — just go before 9 AM.',
  },
  {
    keywords: ['sunscreen', 'reef', 'safe'],
    reply: 'Use a **mineral-based** sunscreen with zinc oxide or titanium dioxide. Brands like Raw Elements, Badger, or Stream2Sea are solid choices. Most chemical sunscreens contain oxybenzone — it bleaches coral within 96 hours.',
  },
  {
    keywords: ['cleanup', 'mission', 'join', 'volunteer'],
    reply: 'The Canggu Sunrise Patrol tomorrow at 6 AM is your best option — you\'re already signed up. It\'s only 2 hours and you\'ll be back in the water by 9 AM. The Kuta Mega Cleanup on Sunday is also worth it if you\'re serious about impact.',
  },
  {
    keywords: ['uluwatu', 'when'],
    reply: 'Uluwatu is best before 7 AM — before the tour buses arrive. It only really turns on with a solid SW swell (today there\'s one). The Cave section is best at mid-tide, the temple steps at low.',
  },
  {
    keywords: ['crowd', 'tourist', 'busy', 'avoid'],
    reply: 'Kuta and Seminyak are packed today — avoid. For surf: Balangan and Dreamland are quiet. For chill beach time: Nusa Dua is calm and clean. The key is always before 9 AM or after 5 PM.',
  },
  {
    keywords: ['pollut', 'water', 'quality', 'bacteria', 'clean'],
    reply: 'Main culprits in Bali\'s coastal water: plastic runoff, hotel/restaurant wastewater, and sunscreen chemicals. After heavy rain, bacteria spikes — I\'d wait 48 hours before swimming. Today\'s worst: Kuta (4.1/10). Best: Balangan (9.2/10).',
  },
];

const FALLBACK = [
  'Good question. Bali\'s surf season peaks April–October with SE trade winds giving offshore conditions. Right now, the south-facing breaks are lighting up.',
  'Honestly? The best local tip: go at sunrise. Any beach in Bali is better at 6 AM than at noon. The ocean, the light, the crowd — everything is different.',
  'The cleanup missions are a game-changer. You get to know the water you\'re surfing in a completely different way. Surfrider Foundation Bali is the best NGO to connect with.',
];

let fallbackIdx = 0;

async function getReply(message: string): Promise<string> {
  await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
  const lower = message.toLowerCase();
  for (const { keywords, reply } of RESPONSES) {
    if (keywords.some(k => lower.includes(k))) return reply;
  }
  return FALLBACK[fallbackIdx++ % FALLBACK.length];
}

function renderText(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className={i > 0 ? 'mt-1' : ''}>
        {parts.map((p, j) =>
          p.startsWith('**') ? <strong key={j}>{p.slice(2, -2)}</strong> : p
        )}
      </p>
    );
  });
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '0',
    role: 'assistant',
    content: 'Morning, Pablo. Three good options today — Balangan, Dreamland, and Padang Padang are all looking solid. What do you need?',
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setInput('');

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const reply = await getReply(text);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    }]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100svh - 72px)', background: '#F6F1EA' }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-4 flex items-center gap-3"
        style={{ background: '#fff', borderBottom: '1px solid rgba(11,31,46,0.06)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0D9488, #134E4A)' }}>
          <span className="text-xl">🌊</span>
        </div>
        <div>
          <h1 className="text-subtitle font-bold" style={{ color: '#0B1F2E' }}>Mark</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#059669' }} />
            <p className="text-caption" style={{ color: '#94A3B8' }}>Your Bali surf guide</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 text-sm"
                style={{ background: 'linear-gradient(135deg, #0D9488, #134E4A)' }}>
                🌊
              </div>
            )}
            <div className={msg.role === 'assistant' ? '' : 'max-w-[82%]'}>
              {msg.role === 'assistant' && (
                <p className="text-micro uppercase tracking-widest mb-1.5 ml-1" style={{ color: '#94A3B8' }}>SURFI</p>
              )}
              <div
                className={`text-body leading-relaxed ${msg.role === 'user' ? 'px-4 py-3 rounded-xl rounded-br-xs' : 'px-4 py-3 rounded-xl rounded-bl-xs'}`}
                style={{
                  background: msg.role === 'user' ? '#CCFBF1' : '#fff',
                  color: msg.role === 'user' ? '#134E4A' : '#0B1F2E',
                  boxShadow: msg.role === 'assistant' ? '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)' : 'none',
                  maxWidth: msg.role === 'assistant' ? 280 : undefined,
                }}
              >
                {msg.role === 'assistant' ? renderText(msg.content) : msg.content}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-2 items-start">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0D9488, #134E4A)' }}>
              🌊
            </div>
            <div>
              <p className="text-micro uppercase tracking-widest mb-1.5 ml-1" style={{ color: '#94A3B8' }}>SURFI</p>
              <div className="px-4 py-3.5 rounded-xl rounded-bl-xs" style={{ background: '#fff', boxShadow: '0 1px 3px rgba(11,31,46,0.04)' }}>
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#0D9488' }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* First-time suggestions */}
        {messages.length === 1 && !loading && (
          <div className="space-y-2 mt-2">
            <p className="text-caption text-center" style={{ color: '#94A3B8' }}>Try asking</p>
            {SUGGESTIONS.map(s => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.97 }}
                onClick={() => send(s)}
                className="w-full text-left text-body px-4 py-3 rounded-xl"
                style={{ background: '#fff', color: '#0B1F2E', boxShadow: '0 1px 3px rgba(11,31,46,0.04), 0 4px 12px rgba(11,31,46,0.05)' }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length > 1 && (
        <div className="px-5 py-2 flex gap-2 overflow-x-auto scrollbar-hide" style={{ background: '#F6F1EA' }}>
          {['Best spot now', 'Nearest cleanup', 'Reef-safe tips', 'Tomorrow forecast'].map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex-shrink-0 text-caption font-semibold px-3 py-1.5 rounded-full"
              style={{ background: '#fff', color: '#0D9488', border: '1px solid #CCFBF1' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        className="px-4 py-3 flex gap-2.5 items-center"
        style={{ background: '#fff', borderTop: '1px solid rgba(11,31,46,0.06)' }}
      >
        <button className="p-2 rounded-full" style={{ background: '#F0FDFA' }}>
          <Plus size={18} color="#0D9488" />
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask Mark anything..."
          className="flex-1 px-4 py-2.5 rounded-full text-body outline-none"
          style={{ background: '#F6F1EA', color: '#0B1F2E', border: 'none' }}
        />
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-full transition-all"
          style={{ background: input.trim() ? '#F97456' : '#EDE6D9' }}
        >
          <Send size={17} color={input.trim() ? '#fff' : '#94A3B8'} />
        </motion.button>
      </div>
    </div>
  );
}
