import { siteConfig } from '@/lib/config'

/**
 * 这是一个嵌入组件，可以在任意位置全屏显示您的chat-base对话框
 * 暂时没有页面引用
 * 因为您可以直接用内嵌网页的方式放入您的notion中 https://www.chatbase.co/chatbot-iframe/${siteConfig('CHATBASE_ID')}
 */
export default function ChatBase() {
  if (!siteConfig('CHATBASE_ID')) {
    return <></>
  }

  return (
    <>
      <Script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/0.1.0-beta.5/libs/cn/index.js" />
      <Script id="chatbase-config">
        {`
          new CozeWebSDK.WebChatClient({
            config: {
              bot_id: '7404668511764611111',
            },
            componentProps: {
              title: '羊语AI',
            },
          });
        `}
      </Script>
    </>
  );

}
