import { FC, ReactElement, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { Helmet } from 'react-helmet'
import { useLocalStorageState } from 'ahooks'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { createMuiTheme, ThemeProvider, CssBaseline, Container, Paper, Divider } from '@material-ui/core'
import Seo from './Seo'
import Nav from './Nav'
import Banner from './Banner'
import { isBrowser } from '../util/constant'
import { getYear } from '../util'
import { LayoutProps } from '../interface/page'

const Layout: FC<LayoutProps> = (
  {
    title = '阿月很乖',
    postMeta,
    banner = 'https://rmt.dogedoge.com/fetch/fluid/storage/bg/vdysjx.png?w=1920&fmt=webp',
    children,
    actions,
    other
  }
): ReactElement => {
  const [dark] = useLocalStorageState('palette-dark', isBrowser() ? window.matchMedia('(prefers-color-scheme: dark)').matches : true)
  const theme = createMuiTheme({ palette: { type: dark ? 'light' : 'light' } })
  useEffect(() => {
    const documentTitle = document.title
    let titleTime: ReturnType<typeof setTimeout>
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.title = '(つェ⊂)看不到我~ ' + documentTitle
        clearTimeout(titleTime)
      } else {
        document.title = '(*´∇｀*) 被发现啦~ ' + documentTitle
        titleTime = setTimeout(function () {
          document.title = documentTitle
        }, 2000)
      }
    })
  }, [])
  return (
    <RecoilRoot>
      <Helmet>
        {isBrowser() && <script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' />}
      </Helmet>
      <Seo post={postMeta} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav actions={actions} />
        <Banner banner={banner} title={title} other={other} />
        <div className='w-full flex justify-center bg-gray-100'>
          <Container maxWidth='lg' className='text-gray-800'>
            <Paper
              elevation={10}
              className='py-8 mb-10 mt-16 px-4 mx-0 md:mx-5 md:px-16 lg:px-24'
            >
              {children}
            </Paper>
          </Container>
        </div>
        <footer className='w-full text-center py-9 bg-gray-100'>
          <div>
            总访问量 <span id='busuanzi_value_site_pv' /> 次
            <FavoriteBorderIcon className='align-middle text-xl mx-2 px-1 animate-ping' />
            总访客数 <span id='busuanzi_value_site_uv' /> 人
            <Divider variant='inset' className='my-1' />
          </div>
          <div>Copyright © 2017 - {getYear()} z-yue. All Rights Reserved.</div>
          {/* <div className='my-1'> */}
          {/*  <a href='https://beian.miit.gov.cn' target='_blank' rel='noreferrer'>黔 ICP 备 17008630 号-2</a> */}
          {/* </div> */}
        </footer>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default Layout
