import { useEffect } from 'react';
import { siteConfig } from '@/lib/config';

export default function DifyChatbot() {
  useEffect(() => {
    // 加载 Coze Web SDK 脚本
    const script = document.createElement('script');
    script.src = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js";
    script.defer = true;

    script.onload = () => {
      // 初始化 Coze Web SDK
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7404668511764611111', // 设置 bot_id
        },
        componentProps: {
          title: 'Coze', // 设置标题
        },
      });
    };

    document.body.appendChild(script);

    return () => {
      // 在组件卸载时清理 script 标签
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []); // 注意依赖数组为空，意味着脚本将仅在加载页面时执行一次

  return null;
}
