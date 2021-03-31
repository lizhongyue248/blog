import { FC, ReactElement, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { Helmet } from 'react-helmet'
import { useLocalStorageState } from 'ahooks'
import { createMuiTheme, ThemeProvider, CssBaseline, Container, Paper } from '@material-ui/core'
import Nav from './Nav'
import Banner from './Banner'
import { isBrowser } from '../util/constant'
import { LayoutProps } from '../interface/page'

const Layout: FC<LayoutProps> = ({ title = '阿月很乖', children, actions, other }): ReactElement => {
  const [dark] = useLocalStorageState('palette-dark', isBrowser() ? window.matchMedia('(prefers-color-scheme: dark)').matches : true)
  const theme = createMuiTheme({
    palette: { type: dark ? 'light' : 'light' }
  })
  useEffect(() => {
    const documentTitle = document.title
    let titleTime: ReturnType<typeof setTimeout>
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.title = '🙈 (つェ⊂)看不到我~ ' + documentTitle
        clearTimeout(titleTime)
      } else {
        document.title = '🙉 (*´∇｀*) 被发现啦~ ' + documentTitle
        titleTime = setTimeout(function () {
          document.title = documentTitle
        }, 2000)
      }
    })
  }, [])
  return (
    <RecoilRoot>
      <Helmet>
        <script async src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' />
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav actions={actions} />
        <Banner title={title} other={other} />
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
        <footer className='w-full text-center'>
          1
        </footer>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default Layout
