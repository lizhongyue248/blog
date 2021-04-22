import { FC, ReactElement } from 'react'
import { navigate } from 'gatsby'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import GitHubIcon from '@material-ui/icons/GitHub'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Chip, Divider, IconButton, Tooltip } from '@material-ui/core'
import { isBrowser } from '../util/constant'
import { getYear } from '../util'
import packageJson from '../../package.json'

const Footer: FC = (): ReactElement => {
  const actions = [
    {
      label: 'Github',
      icon: <GitHubIcon />,
      onClick: () => isBrowser() && window.open('https://github.com/lizhongyue248/blog', '_blank')
    },
    {
      label: 'RSS',
      icon: <RssFeedIcon />,
      onClick: () => navigate('/rss.xml')
    }
  ]
  return (
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
      <div>Copyright © 2017 - {getYear()}.
        <br className='sm:hidden' />
        <Chip
          className='mx-2 h-full'
          size='small'
          label={`z-yue ${packageJson.version}`}
          clickable
          color='primary'
        />
        All Rights Reserved.
      </div>
      <div className='my-1'>
        {/*  <a href='https://beian.miit.gov.cn' target='_blank' rel='noreferrer'>黔 ICP 备 17008630 号-2</a> */}
        {
          actions.map(action => (
            <Tooltip
              key={action.label}
              title={action.label}
              placement='top'
              arrow
            >
              <IconButton
                size='medium'
                color='primary'
                aria-label={action.label}
                onClick={() => action.onClick()}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          ))
        }
      </div>
    </footer>
  )
}

export default Footer
