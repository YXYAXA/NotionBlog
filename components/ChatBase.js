import { useEffect, useRef } from 'react';

export default function ChatBase() {
  const clientRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js';
    script.async = true;
    script.onload = () => {
      if (window.CozeWebSDK) {
        clientRef.current = window.CozeWebSDK.WebChatClient({
          config: {
            bot_id:'7404668511764611111',
          },
          componentProps: {
            title: 'Coze',
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (clientRef.current && clientRef.current.destroy) {
        clientRef.current.destroy();
      }
    };
  }, []);

  return null;
}
