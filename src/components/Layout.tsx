import { FC, ReactElement, useEffect } from 'react'
import sal, { Options } from 'sal.js'
import { useRecoilValue } from 'recoil'
import { blue, purple } from '@material-ui/core/colors'
import { createMuiTheme, MuiThemeProvider, CssBaseline, Container, Paper } from '@material-ui/core'
import Seo from './Seo'
import Nav from './Nav'
import Footer from './Footer'
import Banner from './Banner'
import Background from './Background'
import { darkState } from '../store/base'
import { LayoutProps } from '../interface/page'

const Layout: FC<LayoutProps> = (
  {
    title = '阿月很乖',
    postMeta,
    banner = 'https://resources.echocow.cn/blog/bg/bg5.jpg',
    children,
    actions,
    other
  }
): ReactElement => {
  const dark = useRecoilValue(darkState)
  const theme = createMuiTheme(
    {
      palette: {
        type: dark ? 'dark' : 'light',
        divider: '#BDBDBD',
        primary: blue,
        secondary: purple
      }
    }
  )
  useEffect(() => {
    const documentTitle = document.title
    let titleTime: ReturnType<typeof setTimeout>
    document.addEventListener('visibilitychange', () => {
      document.title = document.hidden ? `(つェ⊂) 看不到我~ ${documentTitle}` : `(*´∇｀*) 被发现啦~ ${documentTitle}`
      if (document.hidden) { clearTimeout(titleTime) } else { titleTime = setTimeout(() => { document.title = documentTitle }, 2000) }
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
      <MuiThemeProvider theme={theme}>
        <Background color={dark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17,135,250,0.8)'} />
        <CssBaseline />
        <Nav actions={actions} banner={banner !== null} />
        {banner && <Banner banner={banner} title={title} other={other} />}
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
        <Footer />
      </MuiThemeProvider>
    </div>
  )
}

export default Layout
