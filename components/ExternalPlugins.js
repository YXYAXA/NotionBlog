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
            data-open-icon="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzI0MTM3Mzc4OTMzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NDAiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guY29sbGVjdGlvbnNfZGV0YWlsLjAuaTMuMTBhZDNhODE5eFRYZTQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk2Ni4zOTIgNDQ4Ljc0MUw4NTEuNzQ1IDI0OS42ODlhMjcuMDM5IDI3LjAzOSAwIDAgMC0yMy40MzEtMTMuNTQ0aC00Mi4xMjZsLTc4LjM4Ni0xMzUuNzY5YTI3LjA0IDI3LjA0IDAgMCAwLTIzLjQxNy0xMy41Mkg0NTQuNTM5YTI3LjAzOSAyNy4wMzkgMCAwIDAtMjMuNCAxMy40OWwtMjAuOTkgMzYuMjQ5LTE1Ni43MjkgMC4wMjVhMjcuMDQgMjcuMDQgMCAwIDAtMjMuNDEzIDEzLjUyTDExNS4wODQgMzQ5LjE5MWEyNy4wNDEgMjcuMDQxIDAgMCAwIDAgMjcuMDRsMjAuOTI1IDM2LjI0My03OC4zODYgMTM1Ljc2OWEyNy4wNDEgMjcuMDQxIDAgMCAwIDAgMjcuMDRsMTE0LjkyMyAxOTkuMDUyYTI3LjA0IDI3LjA0IDAgMCAwIDIzLjQxNyAxMy41Mmg0MS44NWw3OC4zODYgMTM1Ljc2OWEyNy4wNCAyNy4wNCAwIDAgMCAyMy40MTcgMTMuNTJoMjI5Ljg0NWEyNy4wNCAyNy4wNCAwIDAgMCAyMy40MTctMTMuNTJsMjAuOTI1LTM2LjI0M2gxNTYuNzczYTI3LjA0IDI3LjA0IDAgMCAwIDIzLjQxNy0xMy41MmwxMTQuOTIzLTE5OS4wNTJhMjcuMDQxIDI3LjA0MSAwIDAgMCAwLTI3LjA0bC0yMC45MjUtMzYuMjQzIDc4LjM4Ni0xMzUuNzY5YTI3LjA0IDI3LjA0IDAgMCAwIDAuMDE1LTI3LjAxNnpNNzY3Ljk2IDU1Ny4yODJsLTIxOS40MjQtMC4wMjYgODIuMjkxLTE0Mi41MjlhNC41MTcgNC41MTcgMCAwIDAgMC00LjUwN0w0NjIuMzQ1IDExOC40MDNoMjE5LjQzOWw4NC44ODkgMTQ3LjAzNSAwLjAwMyAwLjAwNCA4NC44ODggMTQ3LjAzMi04My42MDQgMTQ0LjgwOHogbTYyLjY4LTkwLjUzOGgxMDQuNTE2bC03OC4zODggMTM1Ljc2N0w4MDQuNTEgNTEybDI2LjEzLTQ1LjI1NnogbS0yMDguOTIxLTU0LjI3TDU0MC43MyA1NTIuNzQ4IDUxNy4yMDQgNTEybDI3LjQyOS00Ny41MDljMC4wMzEtMC4wNTQgMC4wNDItMC4xMTUgMC4wNy0wLjE3IDAuMTI1LTAuMjQgMC4yMjgtMC40OSAwLjMxLTAuNzUzIDAuMDI4LTAuMDkxIDAuMDYyLTAuMTc5IDAuMDg0LTAuMjcxIDAuMDgyLTAuMzQxIDAuMTM5LTAuNjkzIDAuMTM5LTEuMDU5YTQuNDYgNC40NiAwIDAgMC0wLjEzOS0xLjA1OWMtMC4wMjItMC4wOTItMC4wNTYtMC4xODEtMC4wODQtMC4yNzJhNC41NjUgNC41NjUgMCAwIDAtMC4zMS0wLjc1M2MtMC4wMjktMC4wNTUtMC4wMzktMC4xMTYtMC4wNy0wLjE3TDQyOS43MTEgMjYwLjkzMmE0LjUwOSA0LjUwOSAwIDAgMC0zLjkwNC0yLjI1NGgtNDkuNjUzbDc4LjM4NC0xMzUuNzY4IDE2Ny4xODEgMjg5LjU2NHpNMzY1Ljc0NCAyNTguNjc4aC01Mi4yNTVsLTUyLjI1OS05MC41MTQgMTU2Ljc4Ny0wLjAyNC01Mi4yNzMgOTAuNTM4eiBtLTYyLjY2NCAwaC00OS42NTVhNC41MDggNC41MDggMCAwIDAtMy45MDQgMi4yNTRsLTgyLjI5IDE0Mi41MjgtMjMuNTI2LTQwLjc0OCAxMDkuNzE5LTE5MC4wMzggNDkuNjU2IDg2LjAwNHogbS0xMzEuOTQ2IDE1Ni4wNWw4NC44OTEtMTQ3LjAzNmg1NC44NTZsMC4wMDkgMC4wMDEgMC4wMDktMC4wMDFoMTEyLjMwN2wxMDkuNzE4IDE5MC4wMzlIMzY4LjM0N2E0LjUwOCA0LjUwOCAwIDAgMC0zLjkwNCAyLjI1NEwxOTUuOTYxIDc1MS44MDIgODYuMjQ0IDU2MS43NjNsODQuODktMTQ3LjAzNXogbTE5OS44MTQgNTIuMDE2aDE2MS45NzVsLTIzLjUyNyA0MC43NDloLTU0Ljg1OWMtMC4wMzcgMC0wLjA3MyAwLjAxNC0wLjExIDAuMDE1YTQuNDg0IDQuNDg0IDAgMCAwLTIuMDQ0IDAuNTQ4Yy0wLjA4IDAuMDQ0LTAuMTU0IDAuMDkzLTAuMjMxIDAuMTQyYTQuNDU0IDQuNDU0IDAgMCAwLTAuNjUyIDAuNDk5Yy0wLjA2OCAwLjA2My0wLjEzOSAwLjEyMi0wLjIwMyAwLjE4OWE0LjQzOSA0LjQzOSAwIDAgMC0wLjY2MiAwLjg2TDMzNS43MTIgNzA4Ljc5OWE0LjUxNSA0LjUxNSAwIDAgMCAwIDQuNTA2bDI0LjgyOCA0My4wMDNIMjAzLjc2OWwxNjcuMTc5LTI4OS41NjR6IG0tNS4yMDUgMjk4LjU3OGwyNi4xMjkgNDUuMjU3LTUyLjI1OCA5MC41MTEtNzguMzg0LTEzNS43NjhoMTA0LjUxM3ogbTMxLjMzNCA1NC4yNzJsMjQuODI2IDQzLjAwMWE0LjUwOCA0LjUwOCAwIDAgMCAzLjkwNCAyLjI1M2gxNjQuNTc5bC0yMy41MjQgNDAuNzQ5aC0yMTkuNDRsNDkuNjU1LTg2LjAwM3ogbTMxLjMzMSAzNi4yNDFMMzQ0LjgyIDcxMS4wNTJsMTA5LjcxOS0xOTAuMDM4IDgyLjI4OCAxNDIuNTI4YTQuNTA4IDQuNTA4IDAgMCAwIDMuOTA0IDIuMjUzaDMzNi45NjNsLTEwOS43MTggMTkwLjA0SDQyOC40MDh6IG0xMTQuOTIzLTE5OS4wNTNsLTgwLjk4Ny0xNDAuMjc2aDQ3LjA1NWwyNy40MjcgNDcuNTFjMC4wNDQgMC4wNzYgMC4xMDMgMC4xMzcgMC4xNTIgMC4yMSAwLjA4NyAwLjEzNCAwLjE3NyAwLjI2NCAwLjI3OSAwLjM4OSAwLjA5NSAwLjExNSAwLjE5NyAwLjIyMSAwLjMwMSAwLjMyNiAwLjEgMC4xIDAuMiAwLjE5NyAwLjMxMSAwLjI4OCAwLjEzIDAuMTA3IDAuMjY2IDAuMjAxIDAuNDA2IDAuMjkyIDAuMDY5IDAuMDQ2IDAuMTI4IDAuMTAyIDAuMiAwLjE0NCAwLjAzNCAwLjAyIDAuMDczIDAuMDI1IDAuMTA3IDAuMDQ0IDAuMzE0IDAuMTcgMC42NCAwLjMxNSAwLjk4NCAwLjQwNiAwLjAzNSAwLjAxIDAuMDcxIDAuMDA5IDAuMTA3IDAuMDE4IDAuMzAyIDAuMDcyIDAuNjEgMC4xMSAwLjkyIDAuMTE5IDAuMDQ0IDAuMDAxIDAuMDg4IDAuMDE3IDAuMTMyIDAuMDE3IDAuMDUxIDAgMC4wOTktMC4wMTggMC4xNS0wLjAxOSAwLjA2MiAwLjAwMiAwLjExOSAwLjAxOCAwLjE4IDAuMDE4bDIyOS41MDUgMC4wMjdhNC41MDkgNC41MDkgMCAwIDAgMy45MDQtMi4yNTNsMjQuODQxLTQzLjAyNyA1My41NTYgOTIuNzU5IDAuMDAxIDAuMDAzIDI0LjgzIDQzLjAwNUg1NDMuMzMxeiBtMjkyLjUxMi0xOTkuMDUxbDI0LjgyOC00My4wMDNhNC41MTcgNC41MTcgMCAwIDAgMC00LjUwN2wtODIuMjg5LTE0Mi41MjloNDcuMzI1bDEwOS40NTcgMTkwLjAzOWgtOTkuMzIxeiIgcC1pZD0iMTk0MSIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5jb2xsZWN0aW9uc19kZXRhaWwuMC5pMS4xMGFkM2E4MTl4VFhlNCIgZmlsbD0iIzRmNjVmMCIgY2xhc3M9IiI+PC9wYXRoPjwvc3ZnPg=="
            data-close-icon="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzI0MTM3NDI4NzQ0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg1MTgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiA2NGMyNDcuMDQgMCA0NDggMjAwLjk2IDQ0OCA0NDhTNzU5LjA0IDk2MCA1MTIgOTYwIDY0IDc1OS4wNCA2NCA1MTIgMjY0Ljk2IDY0IDUxMiA2NHogbS0xMTAuOCAyOTEuOTUyYTMyIDMyIDAgMSAwLTQ1LjI0OCA0NS4yNDhsMTE4LjggMTE4LjgtMTE4LjggMTE4LjhhMzIgMzIgMCAxIDAgNDUuMjQ4IDQ1LjI0OGwxMTguOC0xMTguOCAxMTguOCAxMTguOGEzMiAzMiAwIDEgMCA0NS4yNDgtNDUuMjQ4TDU2NS4yNDggNTIwbDExOC44LTExOC44YTMyIDMyIDAgMSAwLTQ1LjI0OC00NS4yNDhMNTIwIDQ3NC43NTJsLTExOC44LTExOC44eiIgZmlsbD0iIzRmNjVmMCIgcC1pZD0iODUxOSIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMjQuNDMzNjNhODE0RFZFMWciIGNsYXNzPSIiPjwvcGF0aD48L3N2Zz4="
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
