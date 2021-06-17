import { FC, ReactElement } from 'react'
import request from 'umi-request'
import { navigate } from 'gatsby'
import { useRequest } from 'ahooks'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import GitHubIcon from '@material-ui/icons/GitHub'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Chip, Divider, IconButton, Tooltip } from '@material-ui/core'
import { isBrowser, requestOptions } from '../util/constant'
import { getYear } from '../util'
import { ResultNumber, UserIp } from '../interface/site'
import { pagesView, userView } from '../api/page-view'
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
  const { data: view = { number: 0 } } = useRequest<ResultNumber>(() => pagesView(), requestOptions)
  const { data: users = { number: 0 } } = useRequest<ResultNumber>(async () => {
    let data:UserIp
    try {
      data = await request.get('https://api.ipify.org/?format=json')
    } catch (e) {
      data = { ip: '0.0.0.0' }
    }
    return userView(data.ip)
  }, requestOptions)
  return (
    <footer
      className='w-full text-center py-9'
      data-sal='fade'
      data-sal-duration='1000'
      data-sal-repeat='true'
    >
      <Chip
        className='mx-2 h-full mb-3'
        size='small'
        label={`z-yue ${packageJson.version}`}
        clickable
        color='primary'
      />
      <div>
        总访问量 {view.number}  次
        <FavoriteBorderIcon className='align-middle text-xl mx-2 px-1 animate-ping' />
        总访客数 {users.number} 人
        <Divider variant='inset' className='my-1' />
      </div>
      <div>Copyright © 2017 - {getYear()}.
        <br className='sm:hidden' />
        &nbsp;&nbsp;All Rights Reserved.
      </div>
      {
        [
          { href: 'https://beian.miit.gov.cn', img: 'https://resources.echocow.cn/icon/ICP.ico', alt: 'ICP', text: '黔 ICP 备 17008630 号-3' },
          { href: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=52042102000068', img: 'https://resources.echocow.cn/icon/GA.png', alt: '贵公网安备', text: '贵公网安备 52042102000068 号' }
        ].map(link => (
          <div key={link.alt} className='py-1'>
            <a href={link.href} className='no-underline hover:underline align-middle' target='_blank' rel='noreferrer'>
              <img alt={link.alt} className='inline-block pr-2 w-7' src={link.img} />
              {link.text}
            </a>
          </div>
        ))
      }
      <div className='my-1'>
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
