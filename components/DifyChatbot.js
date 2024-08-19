import { useEffect } from 'react';

export default function DifyChatbot() {
  useEffect(() => {
    // Load the Coze Web SDK script
    const script = document.createElement('script');
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js';
    script.async = true;
    script.onload = () => {
      // Initialize the Coze Web SDK after the script has loaded
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7404668511764611111',
        },
        componentProps: {
          title: 'Coze',
        },
      });
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the script tag when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
