import { FC, ReactElement, ReactNode } from 'react'
import { useLocalStorageState } from 'ahooks'
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import Nav from './Nav'

interface LayoutProps {
  children: NonNullable<ReactNode>
}

const Layout: FC<LayoutProps> = (props: LayoutProps): ReactElement => {
  const [dark] = useLocalStorageState('palette-dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
  const theme = createMuiTheme({
    palette: { type: dark ? 'light' : 'light' }
  })
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav />
        {props.children}
      </ThemeProvider>
    </div>
  )
}

export default Layout
