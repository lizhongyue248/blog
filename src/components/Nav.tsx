import { FC, ReactElement, cloneElement } from 'react'
import InsertLinkIcon from '@material-ui/icons/InsertLink'
import HomeIcon from '@material-ui/icons/Home'
import EventNoteIcon from '@material-ui/icons/EventNote'
import CategoryIcon from '@material-ui/icons/Category'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { createStyles } from '@material-ui/core/styles'
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'

interface Props {
  children: ReactElement;
}
const useStyles = makeStyles(() =>
  createStyles({
    scroll: {
      background: 'rgba(47, 65, 84, .7) !important',
      height: '50px !important'
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

const Nav: FC = (): ReactElement => {
  return (
    <Bar>
      <AppBar elevation={4} className='min-h-0 h-16 bg-transparent transition-all duration-700'>
        <Toolbar className='h-full min-h-0 max-w-7xl w-full flex justify-between mx-auto'>
          <Typography variant='h6'>A Yue's Blog</Typography>
          <div className='space-x-1'>
            <Button
              className='text-white'
              startIcon={<HomeIcon />}
            >
              首页
            </Button>
            <Button
              className='text-white'
              startIcon={<EventNoteIcon />}
            >
              归档
            </Button>
            <Button
              className='text-white'
              startIcon={<CategoryIcon />}
            >
              分类
            </Button>
            <Button
              className='text-white'
              startIcon={<InsertLinkIcon />}
            >
              友链
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Bar>
  )
}

export default Nav
