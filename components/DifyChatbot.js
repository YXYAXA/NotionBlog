import { useEffect } from 'react';

export default function DifyChatbot() {
  useEffect(() => {
    // 加载 Coze Web SDK 脚本
    const script = document.createElement('script');
    script.src = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js";
    script.defer = true;

    script.onload = () => {
      // eslint-disable-next-line no-undef
      const webChatClient = new CozeWebSDK.WebChatClient({  // eslint-disable-line no-new
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
      // 在组件卸载时清理 script 标签
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []); // 注意依赖数组为空，意味着脚本将仅在加载页面时执行一次

  return null;
}
