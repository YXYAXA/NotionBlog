import { useEffect, useRef } from 'react';

export default function DifyChatbot() {
  const chatClientRef = useRef(null);

  useEffect(() => {
    let scriptElement = null;

    const initializeChatbot = () => {
      if (window.CozeWebSDK && !chatClientRef.current) {
        chatClientRef.current = window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7404668511764611111',
          },
          componentProps: {
            title: 'Coze',
          },
        });
      }
    };

    const loadScript = () => {
      scriptElement = document.createElement('script');
      scriptElement.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js';
      scriptElement.async = true;
      scriptElement.onload = initializeChatbot;
      document.body.appendChild(scriptElement);
    };

    if (window.CozeWebSDK) {
      initializeChatbot();
    } else {
      loadScript();
    }

    return () => {
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
      if (chatClientRef.current && typeof chatClientRef.current.destroy === 'function') {
        chatClientRef.current.destroy();
      }
    };
  }, []);

  return null;
}
