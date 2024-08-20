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
            data-open-icon="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzI0MTM4MTU0NzYxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwNDQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMyNjUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAzLjkwNjI1IiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTQ5Ny45MzM1NTUgNTA5LjExOTk0Mm0tMTEwLjMyMjQ3MyA0NjcuNDI1NjRhNDgwLjI2ODQ0MyA0ODAuMjY4NDQzIDAgMSAwIDIyMC42NDQ5NDctOTM0Ljg1MTI4IDQ4MC4yNjg0NDMgNDgwLjI2ODQ0MyAwIDEgMC0yMjAuNjQ0OTQ3IDkzNC44NTEyOFoiIGZpbGw9IiMxMzIyN2EiIHAtaWQ9IjMyNjYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTE3LjZiNjQzYTgxQ1Foa1lrIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggZD0iTTEwMDkuNzMyMzE1IDMyNi4yMjc1NjRjMzQuMzQ3MTg4LTU3LjE4ODkxNC0xNzMuNDI3OTIxLTM1Ni41MDAxMjctNDE4LjY4MDM4MS0zMjMuMzM3MzI0QzQzOC45NDI5NTcgMjMuNzAxNTkgMjk1LjI5Mzg3OSAxNjkuNjM0ODQxIDMwNS4yNzY1NiAyODYuMTI3NjQ1YzYuMzQ0OTI0IDc0LjEwODcxMiA3MS4wNjMxNDggOTAuOTQzOTEgNjIuNjAzMjQ5IDE0NS40MjU2NTZDMzUwLjc5MDgxNCA1NDMuMzA4NTYyIDcxLjEwNjU2NyA1MjAuOTc0NDMgMTIuMDU2NDc0IDY2OS42MTQ4NDhjLTI3LjY2Mzg2OCA2OS45NjMzNjEtMi44NzYzNjYgMTY2Ljc0NDYwMSA1Mi42MjA1NyAyMDMuMDM3NTY2QzE4Ni44Mzc5NzkgOTUyLjUxMzg1NyA1MTkuNjUwMzkgNzgwLjM1NDkyMSA1ODYuMDYwNTk0IDU0Ni44NjE3MTljMjguOTMyODUzLTEwMS41MTg3ODMtNy43ODMxMDctMTYxLjgzNzg2IDQyLjI5OTQ5My0yMTMuMTA0ODQ1IDEwMi40NDkzNzItMTAzLjg4NzU1NSAzNDkuMzA5MjEzIDQ1Ljc2ODA1MSAzODEuMzcyMjI4LTcuNTI5MzF6IiBmaWxsPSIjNGY2NWYwIiBwLWlkPSIzMjY3IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxOS42YjY0M2E4MUNRaGtZayIgY2xhc3M9InNlbGVjdGVkIj48L3BhdGg+PHBhdGggZD0iTTEwMzAuMDM2MDcyIDUyOS4yNjUxM2MtNDcuODgzMDI2LTczLjYwMTExOC0yMjQuODY0MTA1LTc2LjEzOTA4Ny0yNjMuNTI1ODQxLTE1LjA1ODYxOS0xOS43OTYxNjMgMzEuNDcwODIzIDQuNTY4MzQ1IDY3LjY3OTE4OSAyMC4xMzQ1NTkgMTI3LjkxMzY2NiA1Mi4yODIxNzMgMjAzLjcxNDM1OC03Ny42NjE4NjkgMzY2LjY1MjAwNS01Mi43MDUxNjkgMzgwLjY5NTQzNyAzOS4wODQ3MzIgMjIuNjcyNTI4IDM4NC4wNzkzOTYtMzU4LjE5MjEwNiAyOTYuMDk2NDUxLTQ5My41NTA0ODR6IiBmaWxsPSIjNGY2NWYwIiBwLWlkPSIzMjY4IiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmkxOC42YjY0M2E4MUNRaGtZayIgY2xhc3M9InNlbGVjdGVkIj48L3BhdGg+PHBhdGggZD0iTTQzMC4zMTM4NjEgMzQ5LjY2MTQ4M2wzNDQuMjMzMjc0IDM3LjEzODk1NWE1Mi4xOTc1NzQgNTIuMTk3NTc0IDAgMCAxIDQ2LjI3NTY0NSA1Ny41MjczMWwtMjMuMzQ5MzIgMjE2Ljc0MjYwMmE1Mi4xMTI5NzUgNTIuMTEyOTc1IDAgMCAxLTU3LjUyNzMxMSA0Ni4yNzU2NDZsLTM1LjYxNjE3My0zLjgwNjk1NWExOC4xMDQxODMgMTguMTA0MTgzIDAgMCAwLTE5Ljk2NTM2IDE2LjA3MzgwOGwtMy43MjIzNTYgMzQuNzcwMTgzLTgzLjY2ODM5Ny01Ny44NjU3MDdhMzcuNjQ2NTQ5IDM3LjY0NjU0OSAwIDAgMC0xNi45MTk3OTctNi40Mjk1MjJMMzk1Ljc5NzQ3NSA2NzAuMjkxNjRhNTIuMjgyMTczIDUyLjI4MjE3MyAwIDAgMS00Ni4zNjAyNDUtNTcuNjExOTFMMzcyLjk1NTc0OCAzOTYuMDIxNzI3YTUyLjI4MjE3MyA1Mi4yODIxNzMgMCAwIDEgNTcuMzU4MTEzLTQ2LjM2MDI0NHoiIGZpbGw9IiNGRkQzMzUiIHAtaWQ9IjMyNjkiPjwvcGF0aD48cGF0aCBkPSJNMzYwLjY4ODg5NSAzOTQuNDE0MzQ3bC0yMy4zNDkzMiAyMTYuNzQyNjAyYTUyLjI4MjE3MyA1Mi4yODIxNzMgMCAwIDAgNDYuMzYwMjQ1IDU3LjUyNzMxbDIwMS45Mzc3NzkgMjIuNTg3OTI5IDEyOS4zNTE4NDktMTQuMTI4MDNjMzMuMjQ3NDAxLTYuMzQ0OTI0IDU4LjAzNDkwNC01OS44MTE0ODMgNTEuNjg5OTgxLTkzLjA1ODg4NUw3MjguMjcxNDg5IDM4MS40NzA3MDJsLTMxMC4wNTUyODMtMzMuMzMyMDAxYTUyLjE5NzU3NCA1Mi4xOTc1NzQgMCAwIDAtNTcuNTI3MzExIDQ2LjI3NTY0NnoiIGZpbGw9IiNGRkJCMDAiIHAtaWQ9IjMyNzAiPjwvcGF0aD48cGF0aCBkPSJNNjQwLjAzNDc0NyAyOTguMzk0NDk4bC00MDMuMDI5NTY5IDU0LjkwNDc0MmE2MS4zMzQyNjUgNjEuMzM0MjY1IDAgMCAwLTUyLjUzNTk3IDY5LjAzMjc3MmwzNC41MTYzODYgMjUzLjc5Njk1OGE2MS4zMzQyNjUgNjEuMzM0MjY1IDAgMCAwIDY5LjM3MTE2OCA1Mi40NTEzNzFsNDEuMzY4OTA1LTUuOTIxOTI5YTIxLjMxODk0NCAyMS4zMTg5NDQgMCAwIDEgMjQuMDI2MTEyIDE4LjI3MzM4MWw1LjQ5ODkzNCA0MC42MDc1MTNMNDU1LjYwODk1OCA3MTAuODk5MTUzYTQ0Ljc1Mjg2NCA0NC43NTI4NjQgMCAwIDEgMjAuMTM0NTU4LTguNDU5ODk5bDIxNS4zMDQ0MTktMjguNjc5MDU2YTYxLjMzNDI2NSA2MS4zMzQyNjUgMCAwIDAgNTIuNTM1OTcxLTY5LjAzMjc3MmwtMzQuNTE2Mzg3LTI1My43OTY5NThhNjEuMzM0MjY1IDYxLjMzNDI2NSAwIDAgMC02OS4wMzI3NzItNTIuNTM1OTd6IiBmaWxsPSIjRkZEOTc4IiBwLWlkPSIzMjcxIj48L3BhdGg+PHBhdGggZD0iTTYzNi45ODkxODMgMjc2LjIyOTU2M0wyMzMuOTU5NjE0IDMzMS4wNDk3MDZhNjEuMzM0MjY1IDYxLjMzNDI2NSAwIDAgMC01Mi41MzU5NyA2OS4wMzI3NzNsMzQuNTE2Mzg2IDI1My43OTY5NThhNjEuNDE4ODY0IDYxLjQxODg2NCAwIDAgMCA2OS4xMTczNzIgNTIuNDUxMzcxbDQxLjYyMjcwMS01LjY2ODEzMmEyMS40MDM1NDMgMjEuNDAzNTQzIDAgMCAxIDI0LjAyNjExMiAxOC4yNzMzODFsNS4zMjk3MzYgNDAuNjkyMTEyIDk2LjUyNzQ0My03MC44MDkzNTFhNDMuODIyMjc1IDQzLjgyMjI3NSAwIDAgMSAyMC4yMTkxNTgtOC40NTk4OTlsMjE1LjIxOTgyLTI5LjI3MTI0OWE2MS4zMzQyNjUgNjEuMzM0MjY1IDAgMCAwIDUyLjUzNTk3LTY5LjAzMjc3M2wtMzQuNTE2Mzg2LTI1My43OTY5NTdhNjEuMzM0MjY1IDYxLjMzNDI2NSAwIDAgMC02OS4wMzI3NzMtNTIuMDI4Mzc3eiIgZmlsbD0iI0ZDRkNGMSIgcC1pZD0iMzI3MiI+PC9wYXRoPjxwYXRoIGQ9Ik0yNDIuMTU4ODMgNDE2Ljg2OTIwMW0zNC4zMzk1NDktNC44ODcyNDJsMTA5LjgwMjgwMi0xNS42MjcyNTNxMzQuMzM5NTQ5LTQuODg3MjQyIDM5LjIyNjc5IDI5LjQ1MjMwOGwyMC4xNTY4OTIgMTQxLjYyOTcwMXE0Ljg4NzI0MiAzNC4zMzk1NDktMjkuNDUyMzA4IDM5LjIyNjc5bC0xMDkuODAyODAxIDE1LjYyNzI1M3EtMzQuMzM5NTQ5IDQuODg3MjQyLTM5LjIyNjc5MS0yOS40NTIzMDdsLTIwLjE1Njg5MS0xNDEuNjI5NzAxcS00Ljg4NzI0Mi0zNC4zMzk1NDkgMjkuNDUyMzA3LTM5LjIyNjc5MVoiIGZpbGw9IiNGRkVBQUYiIHAtaWQ9IjMyNzMiPjwvcGF0aD48cGF0aCBkPSJNNDU5LjQxNTkxMiAzOTguNDMyNzk4bDE4NC40MjU3ODktMjUuMTAwNTE5IDIuODUwOTg2IDIwLjk1NTE2OS0xODQuNDI1Nzg5IDI1LjEwMDUxOXpNNDY4LjM5MTg2NCA0NjQuMTIzOTExbDExNy4zNTU3MTQtMTUuOTYzODI5IDIuODQyNTI2IDIwLjg3MDU3LTExNy4zNTU3MTQgMTUuOTcyMjg5ek00NzcuMzMzOTc3IDUyOS43ODExODRsMTQ1LjI3MzM3OS0xOS43NzA3ODMgMi44ODQ4MjUgMjEuMjA4OTY2LTE0NS4yNzMzNzggMTkuNzcwNzgzeiIgZmlsbD0iI0ZGREQ5QiIgcC1pZD0iMzI3NCI+PC9wYXRoPjxwYXRoIGQ9Ik04MTIuODcwNDc1IDUxMC4zMTQ5NTdhNDkuNjU5NjA1IDQ5LjY1OTYwNSAwIDAgMS01LjkyMTkyOSAwLjU5MjE5MyA0LjIyOTk0OSA0LjIyOTk0OSAwIDEgMSAwLTguNDU5ODk4czMzLjgzOTU5NC0xLjM1MzU4NCA0OC4zOTA2Mi0yNS4zNzk2OTZjMTIuMDk3NjU1LTE5Ljc5NjE2MyA5LjEzNjY5LTQ5LjIzNjYxLTguNDU5ODk4LTg3LjY0NDU1YTQuMjM4NDA5IDQuMjM4NDA5IDAgMCAxIDcuNjk4NTA3LTMuNTUzMTU3YzE5LjI4ODU2OSA0MS4xMTUxMDcgMjIuMDgwMzM1IDczLjM0NzMyMSA4LjQ1OTg5OSA5NS41OTY4NTRBNjguMjcxMzgyIDY4LjI3MTM4MiAwIDAgMSA4MTIuODcwNDc1IDUxMC4zMTQ5NTd6IiBmaWxsPSIjRkZEMzM1IiBwLWlkPSIzMjc1Ij48L3BhdGg+PHBhdGggZD0iTTg0NS4zNTY0ODYgMzc5LjUyNDkyNW0tMTkuMjAzOTcgMGExOS4yMDM5NyAxOS4yMDM5NyAwIDEgMCAzOC40MDc5NCAwIDE5LjIwMzk3IDE5LjIwMzk3IDAgMSAwLTM4LjQwNzk0IDBaIiBmaWxsPSIjRkZEMzM1IiBwLWlkPSIzMjc2Ij48L3BhdGg+PHBhdGggZD0iTTgxMy4zODY5MjEgMzUzLjcyMjIyNW0zLjg2MzIyNC0zLjQyMTVsLTAuMDYzMzMyIDAuMDU2MDkxcTMuODYzMjI0LTMuNDIxNDk5IDcuMjg0NzIzIDAuNDQxNzI0bDExLjgzNTAyMiAxMy4zNjI5NTRxMy40MjE0OTkgMy44NjMyMjQtMC40NDE3MjQgNy4yODQ3MjJsMC4wNjMzMzItMC4wNTYwOXEtMy44NjMyMjQgMy40MjE0OTktNy4yODQ3MjMtMC40NDE3MjRsLTExLjgzNTAyMi0xMy4zNjI5NTRxLTMuNDIxNDk5LTMuODYzMjI0IDAuNDQxNzI0LTcuMjg0NzIzWiIgZmlsbD0iI0ZGRDMzNSIgcC1pZD0iMzI3NyI+PC9wYXRoPjxwYXRoIGQ9Ik04NTAuNzk2OTY2IDM2OC43ODMxNzltLTUuMTYwMDcyIDAuMDY5MzUxbDAuMDg0NTkxLTAuMDAxMTM3cS01LjE2MDA3MiAwLjA2OTM1MS01LjIyOTQyMi01LjA5MDcyMmwtMC4yMzk4ODUtMTcuODQ4Nzc0cS0wLjA2OTM1MS01LjE2MDA3MiA1LjA5MDcyMS01LjIyOTQyMmwtMC4wODQ1OTEgMC4wMDExMzZxNS4xNjAwNzItMC4wNjkzNTEgNS4yMjk0MjMgNS4wOTA3MjJsMC4yMzk4ODUgMTcuODQ4Nzc0cTAuMDY5MzUxIDUuMTYwMDcyLTUuMDkwNzIyIDUuMjI5NDIzWiIgZmlsbD0iI0ZGRDMzNSIgcC1pZD0iMzI3OCI+PC9wYXRoPjxwYXRoIGQ9Ik02NzIuNTgyNDAzIDIyOS41OTkwMzhtNC42OTgyOTggMC42MDg1MzVsLTAuMDgzODk4LTAuMDEwODY3cTQuNjk4Mjk4IDAuNjA4NTM1IDQuMDg5NzYzIDUuMzA2ODMzbC0yLjUyMTA3MyAxOS40NjQzNzZxLTAuNjA4NTM1IDQuNjk4Mjk4LTUuMzA2ODMyIDQuMDg5NzYzbDAuMDgzODk4IDAuMDEwODY3cS00LjY5ODI5OC0wLjYwODUzNS00LjA4OTc2My01LjMwNjgzM2wyLjUyMTA3Mi0xOS40NjQzNzZxMC42MDg1MzUtNC42OTgyOTggNS4zMDY4MzMtNC4wODk3NjNaIiBmaWxsPSIjRkNGQ0YxIiBwLWlkPSIzMjc5Ij48L3BhdGg+PHBhdGggZD0iTTcyMS4wMDk5MiAyMzQuNDg3OTY5bTMuMzczMjU0IDMuMzI2NDgxbC0wLjA2MDIzNy0wLjA1OTQwMnEzLjM3MzI1NCAzLjMyNjQ4IDAuMDQ2Nzc0IDYuNjk5NzM1bC0yMi4yMTYxMzcgMjIuNTI4NTE5cS0zLjMyNjQ4IDMuMzczMjU0LTYuNjk5NzM1IDAuMDQ2NzczbDAuMDYwMjM3IDAuMDU5NDAycS0zLjM3MzI1NC0zLjMyNjQ4LTAuMDQ2Nzc0LTYuNjk5NzM1bDIyLjIxNjEzOC0yMi41Mjg1MTlxMy4zMjY0OC0zLjM3MzI1NCA2LjY5OTczNC0wLjA0Njc3M1oiIGZpbGw9IiNGQ0ZDRjEiIHAtaWQ9IjMyODAiPjwvcGF0aD48cGF0aCBkPSJNMjIyLjM2OTU1MyA1NzUuOTYzNzdjMy4xMzAxNjItMS4yNjg5ODUgNS4wNzU5MzktMi4yODQxNzMgNS40MTQzMzUtMi40NTMzN2E0LjMxNDU0OCA0LjMxNDU0OCAwIDAgMCAxLjY5MTk4LTUuNzUyNzMxIDQuMTQ1MzUgNC4xNDUzNSAwIDAgMC01LjY2ODEzMi0xLjY5MTk4cy0yOS43Nzg4NDMgMTUuNjUwODEyLTU0LjY1MDk0NSAyLjExNDk3NWMtMjAuMzg4MzU2LTEwLjk5Nzg2OC0zMi41NzA2MS0zNy45ODQ5NDUtMzYuMjkyOTY1LTgwLjE5OTgzOWE0LjE0NTM1IDQuMTQ1MzUgMCAwIDAtNC41NjgzNDUtMy44MDY5NTQgNC4wNjA3NTEgNC4wNjA3NTEgMCAwIDAtMy44MDY5NTQgNC41NjgzNDVjMy44OTE1NTMgNDUuMjYwNDU3IDE3LjU5NjU4OSA3NC41MzE3MDcgNDAuNjkyMTEyIDg2Ljk2Nzc1OGE2OC4yNzEzODIgNjguMjcxMzgyIDAgMCAwIDU3LjE4ODkxNCAwLjI1Mzc5NnoiIGZpbGw9IiNGQ0ZDRjEiIHAtaWQ9IjMyODEiPjwvcGF0aD48cGF0aCBkPSJNMTI5LjA1Njg3MiA0NzguODQ0MTM1bS0xOS4yMDM5NyAwYTE5LjIwMzk3IDE5LjIwMzk3IDAgMSAwIDM4LjQwNzk0IDAgMTkuMjAzOTcgMTkuMjAzOTcgMCAxIDAtMzguNDA3OTQgMFoiIGZpbGw9IiNGQ0ZDRjEiIHAtaWQ9IjMyODIiPjwvcGF0aD48cGF0aCBkPSJNMzQxLjczODcyMyAzMjUuODA0NTY5Yy0zMC41NDAyMzQtMTIuNDM2MDUxLTU4LjIwNDEwMi0xNS4zMTI0MTYtNjEuNzU3MjYtNi41MTQxMjJsLTg5LjA4MjczMiAyMTkuOTU3MzY0Yy0zLjU1MzE1NyA4LjQ1OTg5OSAxOC4yNzMzODEgMjUuODg3MjkgNDguODk4MjEzIDM4LjMyMzM0czU4LjIwNDEwMiAxNS4zMTI0MTYgNjEuNzU3MjYgNi41MTQxMjJsODkuMDgyNzMyLTIxOS45NTczNjNjMy41NTMxNTctOC43OTgyOTUtMTguMjczMzgxLTI1Ljk3MTg4OS00OC44OTgyMTMtMzguMzIzMzQxeiIgZmlsbD0iI0ZGQjcwMCIgZmlsbC1vcGFjaXR5PSIuMyIgcC1pZD0iMzI4MyI+PC9wYXRoPjxwYXRoIGQ9Ik0yNTUuNjE2OTU1IDI3MS41NzY2MTljLTQxLjUzODEwMi0xNi45MTk3OTctNzguMzM4NjYxLTIyLjg0MTcyNi04Mi4xNDU2MTUtMTMuNTM1ODM4TDc4LjU1MTI3NyA0OTIuMzc5OTcyYy0zLjgwNjk1NCA5LjM5MDQ4NyAyNi44MTc4NzkgMzAuNjI0ODMzIDY4LjM1NTk4MSA0Ny40NjAwMzFzNzguMjU0MDYyIDIyLjg0MTcyNiA4Mi4wNjEwMTYgMTMuNTM1ODM4bDk0LjkyMDA2My0yMzQuMzM5MTkxYzMuODA2OTU0LTkuMzkwNDg3LTI3LjA3MTY3NS0zMC42MjQ4MzMtNjguMjcxMzgyLTQ3LjQ2MDAzMXoiIGZpbGw9IiNGRkI3MDAiIGZpbGwtb3BhY2l0eT0iLjgiIHAtaWQ9IjMyODQiPjwvcGF0aD48cGF0aCBkPSJNMjU1LjYxNjk1NSAyNzEuNTc2NjE5Yy00MS41MzgxMDItMTYuOTE5Nzk3LTc4LjMzODY2MS0yMi44NDE3MjYtODIuMTQ1NjE1LTEzLjUzNTgzOGwtMTYuOTE5Nzk4IDQyLjgwNzA4N2MzLjgwNjk1NC05LjM5MDQ4NyA0MC41MjI5MTQtMy4yOTkzNiA4Mi4wNjEwMTcgMTMuNTM1ODM4czcyLjE2MjkzNSAzOC4wNjk1NDQgNjguMzU1OTggNDcuMzc1NDMybDE2LjkxOTc5OC00Mi43MjI0ODhjMy44MDY5NTQtOS4zOTA0ODctMjcuMDcxNjc1LTMwLjYyNDgzMy02OC4yNzEzODItNDcuNDYwMDMxeiIgZmlsbD0iI0ZERjFDOSIgcC1pZD0iMzI4NSI+PC9wYXRoPjxwYXRoIGQ9Ik0xNjguODE4Mzk1IDQ4NS43ODEyNTFjLTQxLjE5OTcwNi0xNi45MTk3OTctNzIuMTYyOTM1LTM4LjA2OTU0NC02OC4zNTU5OC00Ny40NjAwMzFMNzguNTUxMjc3IDQ5Mi4zNzk5NzJjLTMuODA2OTU0IDkuMzkwNDg3IDI2LjgxNzg3OSAzMC42MjQ4MzMgNjguMzU1OTgxIDQ3LjQ2MDAzMXM3OC4yNTQwNjIgMjIuODQxNzI2IDgyLjA2MTAxNiAxMy41MzU4MzhsMjEuOTExMTM4LTU0LjE0MzM1MWMtMy44MDY5NTQgOS4zOTA0ODctNDAuNTIyOTE0IDMuNDY4NTU4LTgyLjA2MTAxNy0xMy40NTEyMzl6IiBmaWxsPSIjRkZBNDAwIiBmaWxsLW9wYWNpdHk9Ii43NSIgcC1pZD0iMzI4NiI+PC9wYXRoPjxwYXRoIGQ9Ik0xODIuMzU0MjMzIDI2MS42Nzg1MzhMODcuNDM0MTcxIDQ5NS45MzMxM2MtMy44MDY5NTQgOS4zOTA0ODcgMjMuMDEwOTI0IDI5LjAxNzQ1MiA2MC4wNjUyOCA0NC4xNjA2N2gtMC41OTIxOTNjLTQxLjUzODEwMi0xNi45MTk3OTctNzIuMTYyOTM1LTM4LjA2OTU0NC02OC4zNTU5ODEtNDcuNDYwMDMxbDk0LjkyMDA2My0yMzQuMzM5MTkxTTMxNy4yMDUwMTcgMzE2LjU4MzI4TDIyMi4yODQ5NTQgNTUwLjY2ODY3NGMtMy40Njg1NTggOC40NTk4OTktMzEuNTU1NDIyIDUuMzI5NzM2LTY0LjgwMjgyMy02Ljc2NzkxOSAzNi45Njk3NTcgMTMuNjIwNDM3IDY4LjAxNzU4NSAxOC4wMTk1ODQgNzEuNjU1MzQxIDkuNTU5Njg1bDk0Ljc1MDg2NS0yMzQuNDIzNzkiIGZpbGw9IiNGRUU0NEIiIHAtaWQ9IjMyODciPjwvcGF0aD48cGF0aCBkPSJNMzAwLjYyMzYxNSAyOTQuMDc5OTQ5YTYuNDI5NTIzIDYuNDI5NTIzIDAgMCAxIDAgNC44MjIxNDNMMTk4LjQyODA0IDU1MS43Njg0NjFhNi44NTI1MTggNi44NTI1MTggMCAwIDEtMy41NTMxNTcgMy4yOTkzNmMxOC42OTYzNzYgMy44OTE1NTMgMzEuODkzODE4IDMuNzIyMzU1IDMzLjgzOTU5NC0xLjY5MTk4bDk1LjE3Mzg2LTIzNC4zMzkxOTFjMi4xOTk1NzQtNS40MTQzMzUtNy4wMjE3MTYtMTQuODA0ODIzLTIzLjI2NDcyMi0yNC45NTY3MDF6IiBmaWxsPSIjRkZBMDAwIiBwLWlkPSIzMjg4Ij48L3BhdGg+PHBhdGggZD0iTTMyNC4yMjY3MzIgMzE2LjU4MzI4di0wLjY3Njc5MmE3LjUyOTMxIDcuNTI5MzEgMCAwIDAtMC41MDc1OTMtMS42OTE5OCAzLjk3NjE1MiAzLjk3NjE1MiAwIDAgMCAwLTAuODQ1OTlsLTEuNTIyNzgyLTEuNTIyNzgyLTAuNjc2NzkyLTAuODQ1OTg5YTIwLjIxOTE1OCAyMC4yMTkxNTggMCAwIDAtMS43NzY1NzktMi4xOTk1NzRsLTAuOTMwNTg5LTAuNjc2NzkyLTIuNzkxNzY2LTIuNzA3MTY4LTAuNDIyOTk1LTAuNDIyOTk0YTEyNi4zMDYyODYgMTI2LjMwNjI4NiAwIDAgMC0xNC45NzQwMjEtMTAuODI4NjcxIDYuNDI5NTIzIDYuNDI5NTIzIDAgMCAxIDAgNC44MjIxNDNsLTE1LjgyMDAxIDM5LjA4NDczMWMxNS4xNDMyMTggOS43Mjg4ODMgMjMuNjg3NzE2IDE4LjYxMTc3NyAyMS41NzI3NDEgMjMuNzcyMzE1bDE2LjkxOTc5OC00Mi43MjI0ODhhNC40ODM3NDYgNC40ODM3NDYgMCAwIDAgMC45MzA1ODgtMi41Mzc5Njl6IiBmaWxsPSIjRkZFNDU1IiBwLWlkPSIzMjg5Ij48L3BhdGg+PHBhdGggZD0iTTE5My4wNjAwMjUgMjgwLjk2MDA3NW03LjM3MDEyNSAyLjk4NjcwNWwwIDBxNy4zNzAxMjUgMi45ODY3MDUgNC4zODM0MTkgMTAuMzU2ODNsLTM0LjUwNTk3OSA4NS4xNDg0NjRxLTIuOTg2NzA1IDcuMzcwMTI1LTEwLjM1NjgzIDQuMzgzNDJsMCAwcS03LjM3MDEyNS0yLjk4NjcwNS00LjM4MzQyLTEwLjM1NjgzbDM0LjUwNTk4LTg1LjE0ODQ2NHEyLjk4NjcwNS03LjM3MDEyNSAxMC4zNTY4My00LjM4MzQyWiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMzI5MCI+PC9wYXRoPjxwYXRoIGQ9Ik0xNDkuNDkyMDM4IDM4OC42NjU4NjRtNy4zNzAxMjUgMi45ODY3MDVsMCAwcTcuMzcwMTI1IDIuOTg2NzA1IDQuMzgzNDE5IDEwLjM1NjgzMWwwIDBxLTIuOTg2NzA1IDcuMzcwMTI1LTEwLjM1NjgzIDQuMzgzNDE5bDAgMHEtNy4zNzAxMjUtMi45ODY3MDUtNC4zODM0MTktMTAuMzU2ODNsMCAwcTIuOTg2NzA1LTcuMzcwMTI1IDEwLjM1NjgzLTQuMzgzNDJaIiBmaWxsPSIjRkZGRkZGIiBwLWlkPSIzMjkxIj48L3BhdGg+PHBhdGggZD0iTTE3My45Nzg5MzMgMjU4Ljg4Njc3MWE0LjQ4Mzc0NiA0LjQ4Mzc0NiAwIDAgMS0xLjk0NTc3Ni04LjQ1OTg5OCAxMTIuMjYyODU0IDExMi4yNjI4NTQgMCAwIDEgOTUuNTEyMjU1LTguNDU5ODk5YzQ2Ljk1MjQzNyAxOS4wMzQ3NzIgNjcuNjc5MTg5IDUwLjc1OTM5MiA1OS4yMTkyOSA3NC44NzAxMDNzLTIxLjk5NTczNi0yNi42NDg2ODEtMzUuNzg1MzcxLTI1LjM3OTY5Ni0yMS4yMzQzNDUgMzEuMzAxNjI1LTIyLjU4NzkyOSA0Mi4wNDU2OTYtMjguNTA5ODU4IDIyLjg0MTcyNi0yNy40OTQ2NzEtNy4yNzU1MTMgMjAuOTgwNTQ5LTU0Ljk4OTM0MS0xLjE4NDM4Ni02MC41NzI4NzRhNTg2LjI3MDk3MyA1ODYuMjcwOTczIDAgMCAwLTY1LjczMzQxMi02Ljc2NzkxOXoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjMyOTIiPjwvcGF0aD48cGF0aCBkPSJNMzYzLjk4ODI1NiAyNTQuNzQxNDIxbDguNDU5ODk4IDE5LjAzNDc3MiA4LjQ1OTg5OS0yMS40MDM1NDQgMTEuMjUxNjY1LTEuNTIyNzgxdjMyLjE0NzYxNGwtOS42NDQyODQgMS4zNTM1ODR2LTE2LjkxOTc5N2wtNS44MzczMyAxNS4zMTI0MTYtOC40NTk4OTkgMS4xODQzODYtNi4yNjAzMjUtMTMuMzY2NjR2MTYuMzI3NjA1bC05LjY0NDI4NCAxLjM1MzU4M3YtMzAuMDMyNjRsLTIuNDUzMzcxLTEuODYxMTc3ek00MjguNjIxODgxIDI2OC4xMDgwNjFsLTE2LjkxOTc5NyAyLjQ1MzM3djQuMzE0NTQ5bDE1LjA1ODYxOS0yLjAzMDM3NiAyLjM2ODc3Mi0yLjUzNzk3LTAuNTkyMTkzIDcuNjk4NTA4LTIzLjUxODUxOCAzLjI5OTM2YTIuODc2MzY2IDIuODc2MzY2IDAgMCAxLTIuNjIyNTY5LTAuNzYxMzkgNC40ODM3NDYgNC40ODM3NDYgMCAwIDEtMS4xODQzODUtMi41Mzc5N3YtMjAuMjE5MTU4bDI3LjkxNzY2NS0zLjg5MTU1M3ogbS0xNi45MTk3OTctNi4zNDQ5MjR2My4yMTQ3NjFsNi40Mjk1MjMtMC44NDU5OXYtMy4yOTkzNnpNNDUyLjM5NDE5NiAyNjkuMjA3ODQ3di0zLjM4Mzk1OWwtMTYuMDczODA3IDIuMTk5NTc0di0xNC43MjAyMjRsMjUuMzc5Njk2LTMuNjM3NzU2djcuMTA2MzE1bC04Ljg4Mjg5NCAwLjU5MjE5MnYtMS41MjI3ODFsLTYuNDI5NTIzIDAuODQ1OTl2My44MDY5NTRsMTUuNTY2MjE0LTIuMTE0OTc1djEwLjgyODY3YTQuNTY4MzQ1IDQuNTY4MzQ1IDAgMCAxLTEuMzUzNTg0IDIuOTYwOTY1IDQuNDgzNzQ2IDQuNDgzNzQ2IDAgMCAxLTIuODc2MzY2IDEuNDM4MTgzbC0yMS40ODgxNDIgMy4wNDU1NjN2LTcuNDQ0NzExbDEuODYxMTc4IDEuOTQ1Nzc3ek00ODUuODEwNzk2IDI2NC41NTQ5MDN2LTMuODA2OTU0bC0xNi4wNzM4MDggMi4xOTk1NzR2LTE0LjcyMDIyNGwyNS4zNzk2OTYtMy42Mzc3NTZ2Ny4xMDYzMTRsLTkuMzA1ODg4IDEuMjY4OTg1di0xLjUyMjc4MmwtNi40Mjk1MjMgMC44NDU5OXYzLjgwNjk1NWwxNS42NTA4MTItMi4xMTQ5NzV2MTAuODI4NjdhNC42NTI5NDQgNC42NTI5NDQgMCAwIDEtMS40MzgxODMgMi45NjA5NjUgNC40ODM3NDYgNC40ODM3NDYgMCAwIDEtMi44NzYzNjUgMS40MzgxODJsLTIxLjQwMzU0NCAzLjA0NTU2NHYtNy42OTg1MDhsMS45NDU3NzcgMS45NDU3Nzd6TTUxOS4zMTE5OTQgMjQ2Ljc4OTExNmwtNS43NTI3MzEgMC43NjEzOTF2Mi4xOTk1NzRsLTEwLjc0NDA3MSAxLjUyMjc4MSAwLjU5MjE5My03LjY5ODUwNyAyNi4yMjU2ODUtMy42Mzc3NTd2MjEuMzE4OTQ1bDIuNjIyNTY5IDIuMzY4NzcxLTI1LjM3OTY5NiAzLjQ2ODU1OWEzLjA0NTU2MyAzLjA0NTU2MyAwIDAgMS0yLjYyMjU2OC0wLjY3Njc5MiA0Ljk5MTM0IDQuOTkxMzQgMCAwIDEtMS4xODQzODYtMi42MjI1Njl2LTEwLjQwNTY3NWwxNi4wNzM4MDctMi4xOTk1NzR6IG0tNS45MjE5MjkgMTAuNTc0ODczdjMuMzgzOTZsNS4zMjk3MzYtMC43NjEzOTF2LTMuMjk5MzZ6TTU1NS41MjAzNiAyNjYuNzU0NDc3di02LjUxNDEyMmwtMTYuOTE5Nzk3IDIuNDUzMzcxdi0yNC4wMjYxMTJsMjcuODMzMDY2LTMuODkxNTU0djMyLjE0NzYxNWE0LjQ4Mzc0NiA0LjQ4Mzc0NiAwIDAgMS0xLjA5OTc4NyAyLjg3NjM2NSA0LjMxNDU0OCA0LjMxNDU0OCAwIDAgMS0yLjcwNzE2NyAxLjQzODE4M2wtMjQuMTEwNzExIDMuMzgzOTZ2LTcuNjEzOTA5bDIuNDUzMzcgMS43NzY1Nzl6IG0tNi4wOTExMjctMjQuMTk1MzF2MTMuMTEyODQzbDYuMzQ0OTI0LTAuOTMwNTg5di0xMy4wMjgyNDR6TTYwMS4zNzMwMSAyNDQuMDgxOTQ5bC0xNi45MTk3OTcgMi4zNjg3NzF2NC4zOTkxNDhsMTQuNjM1NjI1LTEuOTQ1Nzc3IDIuNDUzMzctMi40NTMzNzEtMC4xNjkxOTggNy41MjkzMS0yNC4wMjYxMTIgMy4zODM5NTlhMi44NzYzNjYgMi44NzYzNjYgMCAwIDEtMi41Mzc5NjktMC43NjEzOSAzLjk3NjE1MiAzLjk3NjE1MiAwIDAgMS0xLjE4NDM4Ni0yLjUzNzk3di0yMC4zMDM3NTdsMjcuNzQ4NDY3LTMuODkxNTUzeiBtLTE2LjkxOTc5Ny02LjM0NDkyNHYzLjIxNDc2MWw2LjQyOTUyMy0wLjg0NTk5di0zLjI5OTM2eiIgZmlsbD0iI0ZGRkFEQyIgcC1pZD0iMzI5MyI+PC9wYXRoPjwvc3ZnPg=="
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
