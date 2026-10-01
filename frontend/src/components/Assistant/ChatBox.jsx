import ChatMessage from "./ChatMessage";

export default function ChatBox({ messages }) {
  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          sender={message.sender}
          text={message.text}
        />
      ))}
    </>
  );
}