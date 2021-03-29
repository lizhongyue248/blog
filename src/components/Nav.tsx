import { FC, ReactElement, cloneElement } from 'react'
import { Link, navigate } from 'gatsby'
import SpeedDial from '@material-ui/lab/SpeedDial'
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import HomeIcon from '@material-ui/icons/Home'
import EventNoteIcon from '@material-ui/icons/EventNote'
import EjectIcon from '@material-ui/icons/Eject'
import CategoryIcon from '@material-ui/icons/Category'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { createStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'

interface Props {
  children: ReactElement;
}

interface ArrayProps {
  actions?: ReactElement[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scroll: {
      background: 'rgba(47, 65, 84, .7) !important',
      height: '50px !important'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    }
  })
)

const Bar = (props: Props): ReactElement => {
  const { children } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window
  })
  return cloneElement(children, {
    className: `${children.props.className} ${trigger ? classes.scroll : ''}`
  })
}

const Nav: FC<ArrayProps> = ({ actions: actionProps = [] }): ReactElement => {
  const classes = useStyles()
  const toHref = async (url: string) => {
    await navigate(url)
  }
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const shouldToTop = !useScrollTrigger({
    disableHysteresis: true,
    threshold: window.screen.availHeight,
    target: window
  })
  const actions = [(
    <SpeedDial
      ariaLabel='返回顶上'
      key='top'
      icon={<EjectIcon />}
      onClick={toTop}
      open={false}
      hidden={shouldToTop}
    />)]
  actions.unshift(...actionProps)
  return (
    <div>
      <Bar>
        <AppBar elevation={4} className={`min-h-0 h-16 bg-transparent transition-all duration-700 ${classes.appBar}`}>
          <Toolbar className='h-full min-h-0 max-w-7xl w-full flex justify-between mx-auto'>
            <Link to='/blog' className='no-underline'>
              <Typography className='font-bold text-white cursor-pointer' variant='h6'>A Yue's Blog</Typography>
            </Link>
            <div className='space-x-1'>
              <Button
                className='text-white'
                startIcon={<HomeIcon />}
                onClick={() => toHref('/')}
              >
                首页
              </Button>
              <Button
                className='text-white'
                startIcon={<EventNoteIcon />}
                onClick={() => toHref('/archive')}
              >
                归档
              </Button>
              <Button
                className='text-white'
                startIcon={<CategoryIcon />}
                onClick={() => toHref('/category')}
              >
                分类
              </Button>
              <Button
                className='text-white'
                startIcon={<InsertLinkIcon />}
                onClick={() => toHref('/link')}
              >
                友链
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Bar>
      <div className='fixed right-4 bottom-4 z-50'>
        {actions.map(ele => cloneElement(ele, { hidden: shouldToTop }))}
      </div>
    </div>
  )
}

export default Nav
