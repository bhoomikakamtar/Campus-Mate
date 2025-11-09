import { useState, forwardRef } from "react";
import { Button, Input } from "@/components/ui";
import { MessageCircle, Send, Loader2 } from "lucide-react";

const ChatWidget = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage = { role: "user", text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await props.sendMessage(inputValue); // call your API/AI agent
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Error sending message." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-xl overflow-hidden`}>
      <div className="bg-green-600 text-white p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <MessageCircle className="inline w-5 h-5 mr-2" /> Chat
      </div>
      {isOpen && (
        <div className="p-3 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
                <span className={`inline-block p-2 rounded-lg ${msg.role === "user" ? "bg-green-100" : "bg-gray-100"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <Input value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Type a message..." />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

export default ChatWidget;
