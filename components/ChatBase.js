import { useEffect, useRef } from 'react';
import { siteConfig } from '@/lib/config';

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
            bot_id: siteConfig('COZE_BOT_ID'),
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
