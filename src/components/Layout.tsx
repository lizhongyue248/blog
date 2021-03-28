import { FC, ReactElement } from 'react'
import { useLocalStorageState } from 'ahooks'
import { createMuiTheme, ThemeProvider, CssBaseline, Container, Paper } from '@material-ui/core'
import Nav from './Nav'
import Banner from './Banner'
import { LayoutProps } from '../interface/page'

const Layout: FC<LayoutProps> = ({ title = '阿月很乖', children, actions }): ReactElement => {
  const [dark] = useLocalStorageState('palette-dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  const theme = createMuiTheme({
    palette: { type: dark ? 'light' : 'light' }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav actions={actions} />
      <Banner title={title} />
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
  )
}

export default Layout
