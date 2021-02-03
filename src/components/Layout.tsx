import { FC, ReactElement, ReactNode } from 'react'
import { createMuiTheme, ThemeProvider, Container, CssBaseline } from '@material-ui/core'

interface LayoutProps {
  children: NonNullable<ReactNode>
}

const Layout: FC<LayoutProps> = (props: LayoutProps): ReactElement => {
  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {props.children}
      </Container>
    </ThemeProvider>
  )
}

export default Layout
