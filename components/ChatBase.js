import React, { useEffect } from 'react';
import Script from 'next/script';

export default function ChatBase() {
  useEffect(() => {
    // Initialize Coze Web SDK after the script has loaded
    const initCozeSDK = () => {
      if (window.CozeWebSDK) {
        // eslint-disable-next-line no-new
        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: '7404668511764611111',
          },
          componentProps: {
            title: 'Coze',
          },
        });
      }
    };

    // Check if the SDK is already loaded
    if (window.CozeWebSDK) {
      initCozeSDK();
    } else {
      // If not, set up a listener for when it's loaded
      window.addEventListener('CozeWebSDKLoaded', initCozeSDK);
    }

    // Cleanup function
    return () => {
      window.removeEventListener('CozeWebSDKLoaded', initCozeSDK);
    };
  }, []);

  return (
    <>
      <Script
        src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event('CozeWebSDKLoaded'));
        }}
      />
      <div id="coze-chat-container" style={{ width: '100%', height: '100%', minHeight: '700px' }} />
    </>
  );
}
