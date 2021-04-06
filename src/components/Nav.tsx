import { FC, ReactElement, cloneElement } from 'react'
import { Link, navigate } from 'gatsby'
import { useBoolean } from 'ahooks'
import SpeedDial from '@material-ui/lab/SpeedDial'
import MenuIcon from '@material-ui/icons/Menu'
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import HomeIcon from '@material-ui/icons/Home'
import EventNoteIcon from '@material-ui/icons/EventNote'
import EjectIcon from '@material-ui/icons/Eject'
import CategoryIcon from '@material-ui/icons/Category'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { createStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core'
import { isBrowser } from '../util/constant'

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
    target: isBrowser() ? window : undefined
  })
  return cloneElement(children, {
    className: `${children.props.className} ${trigger ? classes.scroll : ''}`
  })
}

const menus = [
  { name: '首页', icon: <HomeIcon />, href: '/' },
  { name: '归档', icon: <EventNoteIcon />, href: '/archive' },
  { name: '分类', icon: <CategoryIcon />, href: '/category' },
  { name: '友链', icon: <InsertLinkIcon />, href: '/link' }
]

const Nav: FC<ArrayProps> = ({ actions: actionProps = [] }): ReactElement => {
  const [open, { setTrue: show, setFalse: hide }] = useBoolean(false)
  const classes = useStyles()
  const toHref = async (url: string) => {
    await navigate(url)
  }
  const toTop = () => {
    isBrowser() && window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const shouldToTop = !useScrollTrigger({
    disableHysteresis: true,
    threshold: isBrowser() ? window.screen.availHeight : 0,
    target: isBrowser() ? window : undefined
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
            <div className='space-x-1 hidden sm:block'>
              {
                menus.map(menu => (
                  <Button
                    key={menu.name}
                    className='text-white'
                    startIcon={menu.icon}
                    onClick={() => toHref(menu.href)}
                  >{menu.name}
                  </Button>
                ))
              }
            </div>
            <div className='block sm:hidden'>
              <IconButton className='text-white' size='medium' aria-label='menus' onClick={() => show()}>
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Bar>
      <Drawer className='sm:hidden' open={open} onClose={() => hide()} anchor='top' variant='temporary'>
        <List>
          {menus.map(menu => (
            <ListItem button key={menu.name} onClick={() => toHref(menu.href)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText>{menu.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className='fixed right-4 bottom-4 z-50'>
        {actions.map(ele => cloneElement(ele, { hidden: shouldToTop }))}
      </div>
    </div>
  )
}

export default Nav
