import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'
import { GlobalStyle } from './GlobalStyle'
import LA51 from './LA51'
import TianLiGPT from './TianliGPT'
import WebWhiz from './Webwhiz'

import { convertInnerUrl } from '@/lib/notion/convertInnerUrl'
import { isBrowser, loadExternalResource } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { initGoogleAdsense } from './GoogleAdsense'

/**
 * 各种插件脚本
 * @param {*} props
 * @returns
 */
const ExternalPlugin = props => {
  const DISABLE_PLUGIN = siteConfig('DISABLE_PLUGIN')
  const THEME_SWITCH = siteConfig('THEME_SWITCH')
  const DEBUG = siteConfig('DEBUG')
  const ANALYTICS_ACKEE_TRACKER = siteConfig('ANALYTICS_ACKEE_TRACKER')
  const ANALYTICS_VERCEL = siteConfig('ANALYTICS_VERCEL')
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')
  const ADSENSE_GOOGLE_ID = siteConfig('ADSENSE_GOOGLE_ID')
  const FACEBOOK_APP_ID = siteConfig('FACEBOOK_APP_ID')
  const FACEBOOK_PAGE_ID = siteConfig('FACEBOOK_PAGE_ID')
  const FIREWORKS = siteConfig('FIREWORKS')
  const SAKURA = siteConfig('SAKURA')
  const STARRY_SKY = siteConfig('STARRY_SKY')
  const MUSIC_PLAYER = siteConfig('MUSIC_PLAYER')
  const NEST = siteConfig('NEST')
  const FLUTTERINGRIBBON = siteConfig('FLUTTERINGRIBBON')
  const COMMENT_TWIKOO_COUNT_ENABLE = siteConfig('COMMENT_TWIKOO_COUNT_ENABLE')
  const RIBBON = siteConfig('RIBBON')
  const CUSTOM_RIGHT_CLICK_CONTEXT_MENU = siteConfig(
    'CUSTOM_RIGHT_CLICK_CONTEXT_MENU'
  )
  const CAN_COPY = siteConfig('CAN_COPY')
  const WEB_WHIZ_ENABLED = siteConfig('WEB_WHIZ_ENABLED')
  const AD_WWADS_BLOCK_DETECT = siteConfig('AD_WWADS_BLOCK_DETECT')
  const CHATBASE_ID = siteConfig('CHATBASE_ID')
  const COMMENT_DAO_VOICE_ID = siteConfig('COMMENT_DAO_VOICE_ID')
  const AD_WWADS_ID = siteConfig('AD_WWADS_ID')
  const COMMENT_ARTALK_SERVER = siteConfig('COMMENT_ARTALK_SERVER')
  const COMMENT_ARTALK_JS = siteConfig('COMMENT_ARTALK_JS')
  const COMMENT_TIDIO_ID = siteConfig('COMMENT_TIDIO_ID')
  const COMMENT_GITTER_ROOM = siteConfig('COMMENT_GITTER_ROOM')
  const ANALYTICS_BAIDU_ID = siteConfig('ANALYTICS_BAIDU_ID')
  const ANALYTICS_CNZZ_ID = siteConfig('ANALYTICS_CNZZ_ID')
  const ANALYTICS_GOOGLE_ID = siteConfig('ANALYTICS_GOOGLE_ID')
  const MATOMO_HOST_URL = siteConfig('MATOMO_HOST_URL')
  const MATOMO_SITE_ID = siteConfig('MATOMO_SITE_ID')
  const ANALYTICS_51LA_ID = siteConfig('ANALYTICS_51LA_ID')
  const ANALYTICS_51LA_CK = siteConfig('ANALYTICS_51LA_CK')
  const DIFY_CHATBOT_ENABLED = siteConfig('DIFY_CHATBOT_ENABLED')
  const TIANLI_KEY = siteConfig('TianliGPT_KEY')
  const GLOBAL_JS = siteConfig('GLOBAL_JS')
  const CLARITY_ID = siteConfig('CLARITY_ID')
  const IMG_SHADOW = siteConfig('IMG_SHADOW')
  const ANIMATE_CSS_URL = siteConfig('ANIMATE_CSS_URL')
  const MOUSE_FOLLOW = siteConfig('MOUSE_FOLLOW')
  const CUSTOM_EXTERNAL_CSS = siteConfig('CUSTOM_EXTERNAL_CSS')
  const CUSTOM_EXTERNAL_JS = siteConfig('CUSTOM_EXTERNAL_JS')

  // 自定义样式css和js引入
  if (isBrowser) {
    // 初始化AOS动画
    // 静态导入本地自定义样式
    loadExternalResource('/css/custom.css', 'css')
    loadExternalResource('/js/custom.js', 'js')

    // 自动添加图片阴影
    if (IMG_SHADOW) {
      loadExternalResource('/css/img-shadow.css', 'css')
    }

    if (ANIMATE_CSS_URL) {
      loadExternalResource(ANIMATE_CSS_URL, 'css')
    }

    // 导入外部自定义脚本
    if (CUSTOM_EXTERNAL_JS && CUSTOM_EXTERNAL_JS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_JS) {
        loadExternalResource(url, 'js')
      }
    }

    // 导入外部自定义样式
    if (CUSTOM_EXTERNAL_CSS && CUSTOM_EXTERNAL_CSS.length > 0) {
      for (const url of CUSTOM_EXTERNAL_CSS) {
        loadExternalResource(url, 'css')
      }
    }
  }

  const router = useRouter()
  useEffect(() => {
    // 异步渲染谷歌广告
    if (ADSENSE_GOOGLE_ID) {
      setTimeout(() => {
        initGoogleAdsense(ADSENSE_GOOGLE_ID)
      }, 1000)
    }

    // 映射url
    convertInnerUrl(props?.allNavPages)
  }, [router])

  useEffect(() => {
    // 执行注入脚本
    // eslint-disable-next-line no-eval
    eval(GLOBAL_JS)
  }, [])

  if (DISABLE_PLUGIN) {
    return null
  }

  return (
    <>
      {/* 全局样式嵌入 */}
      <GlobalStyle />
      {MOUSE_FOLLOW && <MouseFollow />}
      {THEME_SWITCH && <ThemeSwitch />}
      {DEBUG && <DebugPanel />}
      {ANALYTICS_ACKEE_TRACKER && <Ackee />}
      {ANALYTICS_GOOGLE_ID && <Gtag />}
      {ANALYTICS_VERCEL && <Analytics />}
      {ANALYTICS_BUSUANZI_ENABLE && <Busuanzi />}
      {FACEBOOK_APP_ID && FACEBOOK_PAGE_ID && <Messenger />}
      {FIREWORKS && <Fireworks />}
      {SAKURA && <Sakura />}
      {STARRY_SKY && <StarrySky />}
      {MUSIC_PLAYER && <MusicPlayer />}
      {NEST && <Nest />}
      {FLUTTERINGRIBBON && <FlutteringRibbon />}
      {COMMENT_TWIKOO_COUNT_ENABLE && <TwikooCommentCounter {...props} />}
      {RIBBON && <Ribbon />}
      {DIFY_CHATBOT_ENABLED && <DifyChatbot />}
      {CUSTOM_RIGHT_CLICK_CONTEXT_MENU && <CustomContextMenu {...props} />}
      {!CAN_COPY && <DisableCopy />}
      {WEB_WHIZ_ENABLED && <WebWhiz />}
      {AD_WWADS_BLOCK_DETECT && <AdBlockDetect />}
      {TIANLI_KEY && <TianLiGPT />}
      <VConsole />
      <LoadingProgress />
      <AosAnimation />
      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && <LA51 />}

      {ANALYTICS_51LA_ID && ANALYTICS_51LA_CK && (
        <>
          <script id='LA_COLLECT' src='//sdk.51.la/js-sdk-pro.min.js' defer />
          {/* <script async dangerouslySetInnerHTML={{
              __html: `
                    LA.init({id:"${ANALYTICS_51LA_ID}",ck:"${ANALYTICS_51LA_CK}",hashMode:true,autoTrack:true})
                    `
            }} /> */}
        </>
      )}

      {CHATBASE_ID && (
        <>
          <script
            src="https://share.fastgpt.in/js/iframe.js"
            id="chatbot-iframe"
            data-bot-src={`https://share.fastgpt.in/chat/share?shareId=${CHATBASE_ID}`}
            data-default-open="true"
            data-drag="true"
            data-open-icon="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzI0NDgwMzczMjI4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjcyMjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiI+PHBhdGggZD0iTTAgMG0yMDQuOCAwbDYxNC40IDBxMjA0LjggMCAyMDQuOCAyMDQuOGwwIDYxNC40cTAgMjA0LjgtMjA0LjggMjA0LjhsLTYxNC40IDBxLTIwNC44IDAtMjA0LjgtMjA0LjhsMC02MTQuNHEwLTIwNC44IDIwNC44LTIwNC44WiIgZmlsbD0iI2JmYmZiZiIgcC1pZD0iNzIyOSIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTguNDMzNjNhODFFV3hNUG4iIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJNODE5LjIgMEg1MzQuMjcyQTc1Ni40OCA3NTYuNDggMCAwIDAgMCA0ODMuNTg0VjgxOS4yYTIwNC44IDIwNC44IDAgMCAwIDIwNC44IDIwNC44aDYxNC40YTIwNC44IDIwNC44IDAgMCAwIDIwNC44LTIwNC44VjIwNC44YTIwNC44IDIwNC44IDAgMCAwLTIwNC44LTIwNC44eiIgZmlsbD0iIzcwNzA3MCIgcC1pZD0iNzIzMCIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTYuNDMzNjNhODFFV3hNUG4iIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJNODE5LjIgMGgtMy44NGE3NTUuMiA3NTUuMiAwIDAgMC01MzkuMzkyIDEwMjRIODE5LjJhMjA0LjggMjA0LjggMCAwIDAgMjA0LjgtMjA0LjhWMjA0LjhhMjA0LjggMjA0LjggMCAwIDAtMjA0LjgtMjA0Ljh6IiBmaWxsPSIjNTE1MTUxIiBwLWlkPSI3MjMxIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxNS40MzM2M2E4MUVXeE1QbiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGQ9Ik00OTcuMTUyIDcyMS4xNTJBNzUyLjM4NCA3NTIuMzg0IDAgMCAwIDU2MC4zODQgMTAyNEg4MTkuMmEyMDQuOCAyMDQuOCAwIDAgMCAyMDQuOC0yMDQuOFYyMDQuOGEyMDQuOCAyMDQuOCAwIDAgMC04OS4wODgtMTY4Ljk2IDc1NS4yIDc1NS4yIDAgMCAwLTQzNy43NiA2ODUuMzEyeiIgZmlsbD0iIzJjMmMyYyIgcC1pZD0iNzIzMiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTQuNDMzNjNhODFFV3hNUG4iIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBkPSJNNTEyIDIwNC44YTMwNy4yIDMwNy4yIDAgMCAwLTIwNC44IDUzNS44MDhWNzkzLjZhMjUuNiAyNS42IDAgMCAwIDI1LjYgMjUuNmgxNzkuMmEzMDcuMiAzMDcuMiAwIDAgMCAwLTYxNC40eiIgZmlsbD0iI2RiZGJkYiIgcC1pZD0iNzIzMyIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTkuNDMzNjNhODFFV3hNUG4iIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjxwYXRoIGQ9Ik03NDIuNCA1MTJBMzA3LjIgMzA3LjIgMCAwIDAgNDczLjYgMjA3LjM2IDMwNy4yIDMwNy4yIDAgMCAwIDMwNy4yIDc0MC42MDhWNzkzLjZhMjUuNiAyNS42IDAgMCAwIDI1LjYgMjUuNmgxMDIuNGEzMDcuMiAzMDcuMiAwIDAgMCAzMDcuMi0zMDcuMnoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjcyMzQiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTE3LjQzMzYzYTgxRVd4TVBuIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0iTTQ4Ni40IDQ3My42bTI1LjYgMGwwIDBxMjUuNiAwIDI1LjYgMjUuNmwwIDI1LjZxMCAyNS42LTI1LjYgMjUuNmwwIDBxLTI1LjYgMC0yNS42LTI1LjZsMC0yNS42cTAtMjUuNiAyNS42LTI1LjZaIiBmaWxsPSIjMmMyYzJjIiBwLWlkPSI3MjM1IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkyMi40MzM2M2E4MUVXeE1QbiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGQ9Ik0zODQgNDczLjZtMjUuNiAwbDAgMHEyNS42IDAgMjUuNiAyNS42bDAgMjUuNnEwIDI1LjYtMjUuNiAyNS42bDAgMHEtMjUuNiAwLTI1LjYtMjUuNmwwLTI1LjZxMC0yNS42IDI1LjYtMjUuNloiIGZpbGw9IiMyYzJjMmMiIHAtaWQ9IjcyMzYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTIzLjQzMzYzYTgxRVd4TVBuIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0iTTU4OC44IDQ3My42bTI1LjYgMGwwIDBxMjUuNiAwIDI1LjYgMjUuNmwwIDI1LjZxMCAyNS42LTI1LjYgMjUuNmwwIDBxLTI1LjYgMC0yNS42LTI1LjZsMC0yNS42cTAtMjUuNiAyNS42LTI1LjZaIiBmaWxsPSIjMmMyYzJjIiBwLWlkPSI3MjM3IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkyMS40MzM2M2E4MUVXeE1QbiIgY2xhc3M9IiI+PC9wYXRoPjwvc3ZnPg=="
            data-close-icon="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzI0NDgwODEwNTMwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjkyNTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiI+PHBhdGggZD0iTTg3NC4wNTcxNDMgMTQ5Ljk0Mjg1N2E1MTIgNTEyIDAgMSAwIDAgNzI0LjExNDI4NiA1MTIgNTEyIDAgMCAwIDAtNzI0LjExNDI4NnpNNjg3LjkwODU3MSA2MzYuMTZhMjUuNzgyODU3IDI1Ljc4Mjg1NyAwIDAgMSAwIDM2LjU3MTQyOWwtMTUuNTQyODU3IDE1LjU0Mjg1N2EyNS43ODI4NTcgMjUuNzgyODU3IDAgMCAxLTM2LjU3MTQyOCAwTDUxMiA1NjMuNzQ4NTcxbC0xMjQuMTYgMTI0LjE2YTI1Ljc4Mjg1NyAyNS43ODI4NTcgMCAwIDEtMzYuNTcxNDI5IDBsLTE1LjU0Mjg1Ny0xNS41NDI4NTdhMjUuNzgyODU3IDI1Ljc4Mjg1NyAwIDAgMSAwLTM2LjU3MTQyOEw0NjAuMjUxNDI5IDUxMmwtMTI0LjE2LTEyNC4xNmEyNS43ODI4NTcgMjUuNzgyODU3IDAgMCAxIDAtMzYuNTcxNDI5bDE1LjU0Mjg1Ny0xNS41NDI4NTdhMjUuNzgyODU3IDI1Ljc4Mjg1NyAwIDAgMSAzNi41NzE0MjggMEw1MTIgNDYwLjI1MTQyOWwxMjQuMTYtMTI0LjE2YTI1Ljc4Mjg1NyAyNS43ODI4NTcgMCAwIDEgMzYuNTcxNDI5IDBsMTUuNTQyODU3IDE1LjU0Mjg1N2EyNS43ODI4NTcgMjUuNzgyODU3IDAgMCAxIDAgMzYuNTcxNDI4TDU2My43NDg1NzEgNTEyeiIgZmlsbD0iIzJjMmMyYyIgcC1pZD0iOTI2MCIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMjkuNDMzNjNhODFFV3hNUG4iIGNsYXNzPSIiPjwvcGF0aD48L3N2Zz4="
            defer
          />
          <script>
            console.log(&quot;Chat box loaded&quot;)
          </script>
        </>
      )}

      {CLARITY_ID && (
        <>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
                `
            }}
          />
        </>
      )}

      {COMMENT_DAO_VOICE_ID && (
        <>
          {/* DaoVoice 反馈 */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              (function(i,s,o,g,r,a,m){i["DaoVoiceObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.charset="utf-8";m.parentNode.insertBefore(a,m)})(window,document,"script",('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/daf1a94b.js","daovoice")
              `
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
             daovoice('init', {
                app_id: "${COMMENT_DAO_VOICE_ID}"
              });
              daovoice('update');
              `
            }}
          />
        </>
      )}

      {AD_WWADS_ID && (
        <script
          type='text/javascript'
          src='https://cdn.wwads.cn/js/makemoney.js'
          async></script>
      )}

      {/* {COMMENT_TWIKOO_ENV_ID && <script defer src={COMMENT_TWIKOO_CDN_URL} />} */}

      {COMMENT_ARTALK_SERVER && <script defer src={COMMENT_ARTALK_JS} />}

      {COMMENT_TIDIO_ID && (
        <script async src={`//code.tidio.co/${COMMENT_TIDIO_ID}.js`} />
      )}

      {/* gitter聊天室 */}
      {COMMENT_GITTER_ROOM && (
        <>
          <script
            src='https://sidecar.gitter.im/dist/sidecar.v1.js'
            async
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
            ((window.gitter = {}).chat = {}).options = {
              room: '${COMMENT_GITTER_ROOM}'
            };
            `
            }}
          />
        </>
      )}

      {/* 百度统计 */}
      {ANALYTICS_BAIDU_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${ANALYTICS_BAIDU_ID}";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
          `
          }}
        />
      )}

      {/* 站长统计 */}
      {ANALYTICS_CNZZ_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
          document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_${ANALYTICS_CNZZ_ID}'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D${ANALYTICS_CNZZ_ID}' type='text/javascript'%3E%3C/script%3E"));
          `
          }}
        />
      )}

      {/* 谷歌统计 */}
      {ANALYTICS_GOOGLE_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_GOOGLE_ID}`}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ANALYTICS_GOOGLE_ID}', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />
        </>
      )}

      {/* Matomo 统计 */}
      {MATOMO_HOST_URL && MATOMO_SITE_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//${MATOMO_HOST_URL}/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `
          }}
        />
      )}
    </>
  )
}

const TwikooCommentCounter = dynamic(
  () => import('@/components/TwikooCommentCounter'),
  { ssr: false }
)
const DebugPanel = dynamic(() => import('@/components/DebugPanel'), {
  ssr: false
})
const ThemeSwitch = dynamic(() => import('@/components/ThemeSwitch'), {
  ssr: false
})
const Fireworks = dynamic(() => import('@/components/Fireworks'), {
  ssr: false
})
const MouseFollow = dynamic(() => import('@/components/MouseFollow'), {
  ssr: false
})
const Nest = dynamic(() => import('@/components/Nest'), { ssr: false })
const FlutteringRibbon = dynamic(
  () => import('@/components/FlutteringRibbon'),
  { ssr: false }
)
const Ribbon = dynamic(() => import('@/components/Ribbon'), { ssr: false })
const Sakura = dynamic(() => import('@/components/Sakura'), { ssr: false })
const StarrySky = dynamic(() => import('@/components/StarrySky'), {
  ssr: false
})
const DifyChatbot = dynamic(() => import('@/components/DifyChatbot'), {
  ssr: false
})
const Analytics = dynamic(
  () =>
    import('@vercel/analytics/react').then(async m => {
      return m.Analytics
    }),
  { ssr: false }
)
const MusicPlayer = dynamic(() => import('@/components/Player'), { ssr: false })
const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false })
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false })
const Busuanzi = dynamic(() => import('@/components/Busuanzi'), { ssr: false })
const Messenger = dynamic(() => import('@/components/FacebookMessenger'), {
  ssr: false
})
const VConsole = dynamic(() => import('@/components/VConsole'), { ssr: false })
const CustomContextMenu = dynamic(
  () => import('@/components/CustomContextMenu'),
  { ssr: false }
)
const DisableCopy = dynamic(() => import('@/components/DisableCopy'), {
  ssr: false
})
const AdBlockDetect = dynamic(() => import('@/components/AdBlockDetect'), {
  ssr: false
})
const LoadingProgress = dynamic(() => import('@/components/LoadingProgress'), {
  ssr: false
})
const AosAnimation = dynamic(() => import('@/components/AOSAnimation'), {
  ssr: false
})

export default ExternalPlugin
