import { siteConfig } from '@/lib/config';
import { useEffect } from 'react';

export default function ChatBase() {
  useEffect(() => {
    if (!siteConfig('CHATBASE_ID')) return;

    // 加载外部脚本
    const script = document.createElement('script');
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js';
    script.async = true;
    script.onload = () => {
      // 确保 CozeWebSDK 已加载
      if (typeof window.CozeWebSDK !== 'undefined') {
        // 创建 WebChatClient 实例，但不保存到变量中
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

    document.body.appendChild(script);

    // 清理副作用
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!siteConfig('CHATBASE_ID')) {
    return <></>;
  }

  return (
    <div id="coze-chat-container" style={{ width: '100%', height: '100%', minHeight: '700px' }}>
      {/* 这个 div 将是 Coze Web SDK 挂载的位置 */}
    </div>
  );
}
