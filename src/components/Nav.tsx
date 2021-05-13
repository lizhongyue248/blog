import { FC, ReactElement, cloneElement, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Link, navigate } from 'gatsby'
import { useBoolean } from 'ahooks'
import SpeedDial from '@material-ui/lab/SpeedDial'
import MenuIcon from '@material-ui/icons/Menu'
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import HomeIcon from '@material-ui/icons/Home'
import EventNoteIcon from '@material-ui/icons/EventNote'
import EjectIcon from '@material-ui/icons/Eject'
import CategoryIcon from '@material-ui/icons/Category'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import AlbumIcon from '@material-ui/icons/Album'
import { SearchOutlined } from '@material-ui/icons'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { createStyles, Theme } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core'
import Search from './Search'
import { isBrowser } from '../util/constant'
import { darkState, searchState } from '../store/base'

interface Props {
  children: ReactElement
  banner: boolean
}

interface ArrayProps {
  actions?: ReactElement[]
  banner?: boolean
}

interface Menu {
  name: string
  icon: ReactElement
  href?: string
  handler?: () => void
  type?: 'icon'
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
  const { children, banner } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: isBrowser() ? window : undefined
  })
  return cloneElement(children, {
    className: `${children.props.className} ${!banner || trigger ? classes.scroll : ''}`
  })
}

const Nav: FC<ArrayProps> = ({ actions: actionProps = [], banner = true }): ReactElement => {
  // const [dark, setDark] = useLocalStorageState('palette-dark', isBrowser() ? window.matchMedia('(prefers-color-scheme: dark)').matches : true)
  const [dark, setDark] = useRecoilState(darkState)
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

  const setSearch = useSetRecoilState(searchState)
  const menus: Menu[] = [
    { name: '首页', icon: <HomeIcon />, href: '/' },
    { name: '归档', icon: <EventNoteIcon />, href: '/archive' },
    { name: '分类', icon: <CategoryIcon />, href: '/category' },
    { name: '友链', icon: <InsertLinkIcon />, href: '/link' },
    { name: '关于', icon: <AlbumIcon />, href: '/about' },
    { name: '搜索', icon: <SearchOutlined />, handler: () => setSearch(true), type: 'icon' }
  ]

  const menuHandler = (menu: Menu) => {
    (menu.href && toHref(menu.href)) || (menu.handler && menu.handler())
  }

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

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    const html = document.getElementsByTagName('html')[0]
    if (dark) {
      body.classList.add('dark')
      html.classList.add('dark')
    } else {
      body.classList.remove('dark')
      html.classList.remove('dark')
    }
  }, [dark])

  return (
    <div>
      <Bar banner={banner}>
        <AppBar elevation={4} className={`min-h-0 h-16 bg-transparent transition-all duration-700 ${classes.appBar}`}>
          <Toolbar className='h-full min-h-0 max-w-7xl w-full flex justify-between mx-auto'>
            <div className='flex'>
              <Link to='/blog' className='no-underline'>
                <div className='font-bold cursor-pointer text-white text-2xl'>A Yue's Blog
                </div>
              </Link>
            </div>
            <div className='space-x-1'>
              {
                menus.map(menu => (
                  menu.type
                    ? (
                      <IconButton key={menu.name} className='hidden sm:inline-block text-white' size='medium' aria-label='menus' onClick={() => menuHandler(menu)}>
                        {menu.icon}
                      </IconButton>
                      )
                    : (
                      <Button
                        key={menu.name}
                        className='text-white hidden sm:inline-block'
                        startIcon={menu.icon}
                        onClick={() => menuHandler(menu)}
                      >{menu.name}
                      </Button>
                      )
                ))
              }
              <IconButton className='text-white' aria-label='切换主题' onClick={() => setDark(!dark)}>
                {dark ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <IconButton className='sm:hidden text-white' size='medium' aria-label='menus' onClick={() => show()}>
                <MenuIcon />
              </IconButton>
              <Search />
            </div>
          </Toolbar>
        </AppBar>
      </Bar>
      <Drawer className='sm:hidden' open={open} onClose={() => hide()} anchor='top' variant='temporary'>
        <List>
          {menus.map(menu => (
            <div key={menu.name}>
              {menu.type && <Divider variant='middle' />}
              <ListItem button onClick={() => menuHandler(menu)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText>{menu.name}</ListItemText>
              </ListItem>
            </div>
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
