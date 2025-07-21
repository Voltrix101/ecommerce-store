import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can we help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'Thank you for your message! Our team will get back to you soon.' }]);
    }, 1000);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-110 transition-all duration-200"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-end"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-full max-w-xs bg-white dark:bg-background rounded-2xl shadow-2xl p-4 m-6 border border-gray-100 dark:border-gray-800 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="font-semibold text-lg mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Chat with us</div>
              <div className="flex-1 overflow-y-auto mb-2 space-y-2 max-h-60">
                {messages.map((msg, i) => (
                  <div key={i} className={`text-sm px-3 py-2 rounded-xl ${msg.from === 'bot' ? 'bg-indigo-50 dark:bg-gray-800 text-indigo-700 dark:text-indigo-200 self-start' : 'bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-purple-200 self-end'}`}>{msg.text}</div>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">Send</button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 