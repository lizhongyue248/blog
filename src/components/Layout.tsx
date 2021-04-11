import { FC, ReactElement, useEffect } from 'react'
import sal, { Options } from 'sal.js'
import { useRecoilValue } from 'recoil'
import { navigate } from 'gatsby'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { createMuiTheme, MuiThemeProvider, CssBaseline, Container, Paper, Divider, IconButton } from '@material-ui/core'
import Seo from './Seo'
import Nav from './Nav'
import Banner from './Banner'
import { getYear } from '../util'
import { darkState } from '../store/base'
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
  const dark = useRecoilValue(darkState)
  const darkTheme = createMuiTheme({ palette: { type: 'dark' } })
  const lightTheme = createMuiTheme({ palette: { type: 'light' } })
  useEffect(() => {
    const documentTitle = document.title
    let titleTime: ReturnType<typeof setTimeout>
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.title = '(つェ⊂) 看不到我~ ' + documentTitle
        clearTimeout(titleTime)
      } else {
        document.title = '(*´∇｀*) 被发现啦~ ' + documentTitle
        titleTime = setTimeout(() => { document.title = documentTitle }, 2000)
      }
    })
    const salOption: Options = {
      root: null,
      threshold: 0.00000000000000000001,
      once: true,
      disabled: false
    }
    sal(salOption)
  }, [])
  return (
    <div>
      <Seo post={postMeta} />
      <MuiThemeProvider theme={dark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Nav actions={actions} />
        <Banner banner={banner} title={title} other={other} />
        <div id='container' className='w-full flex justify-center'>
          <Container maxWidth='lg' className='text-gray-800'>
            <Paper
              elevation={10}
              className='py-8 mb-10 mt-16 px-4 mx-0 md:mx-5 md:px-16 lg:px-24'
            >
              {children}
            </Paper>
          </Container>
        </div>
        <footer
          className='w-full text-center py-9'
          data-sal='fade'
          data-sal-duration='1000'
          data-sal-repeat='true'
        >
          <div>
            总访问量 <span id='busuanzi_value_site_pv' /> 次
            <FavoriteBorderIcon className='align-middle text-xl mx-2 px-1 animate-ping' />
            总访客数 <span id='busuanzi_value_site_uv' /> 人
            <Divider variant='inset' className='my-1' />
          </div>
          <div>Copyright © 2017 - {getYear()} z-yue. All Rights Reserved.</div>
          <div className='my-1'>
            {/*  <a href='https://beian.miit.gov.cn' target='_blank' rel='noreferrer'>黔 ICP 备 17008630 号-2</a> */}
            <IconButton size='medium' color='primary' aria-label='RSS' onClick={() => navigate('/rss.xml')}>
              <RssFeedIcon />
            </IconButton>
          </div>
        </footer>
      </MuiThemeProvider>
    </div>
  )
}

export default Layout
