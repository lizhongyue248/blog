import { FC, ReactElement, useEffect } from 'react'
import Ping from 'ping-url'
import { graphql } from 'gatsby'
import { useSetState } from 'ahooks'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import CachedIcon from '@material-ui/icons/Cached'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail'
import {
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  Grid,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Button
} from '@material-ui/core'
import { isBrowser, getBgColors } from '../util/constant'
import Layout from '../components/Layout'
import Comment from '../components/Comment'

interface LinkStatusProps {
  status: string
}

interface LinkProps {
  data: {
    allLinksJson: {
      nodes: {
        id: string
        name: string
        description: string
        link: string
        tag: string
      }[]
    }
  }
}

const LinkStatus: FC<LinkStatusProps> = ({ status }): ReactElement => {
  let tip = '测试链接中'
  let info = <CachedIcon className='animate-spin' />
  if (status.startsWith('success')) {
    info = <CheckCircleIcon className='text-green-600' />
    tip = `链接正常 ${status.substring(7)}ms`
  }
  if (status === 'unknown') {
    info = <ErrorIcon className='text-amber-500' />
    tip = '链接未知状态'
  }
  if (status.startsWith('error')) {
    info = <CancelIcon color='error' />
    tip = '链接失效'
  }
  return (
    <Tooltip title={tip} placement='top'>
      <IconButton size='small'>
        {info}
      </IconButton>
    </Tooltip>
  )
}

interface Check {
  [key: string]: string
}

const LinkPage: FC<LinkProps> = ({ data }): ReactElement => {
  const nodes = data.allLinksJson.nodes
  const [checks, setChecks] = useSetState<Check>(nodes.map(node => node.id).reduce((acc, curr) => ({
    ...acc,
    [curr]: 'loading'
  }), {}))
  useEffect(() => {
    nodes.forEach(node => {
      const link = new URL(node.link)
      checks[`${node.id}-avatar`] = `${link.origin}/favicon.ico`
      setTimeout(() => {
        Ping.check(link.origin).then(res => {
          if (res.status) {
            setChecks({ [node.id]: `success ${res.time}` })
          } else {
            setChecks({ [node.id]: 'error' })
          }
        }).catch(err => {
          console.debug(err)
          setChecks({ [node.id]: 'unknown' })
        })
      }, 1500)
    })
  }, [])
  return (
    <Layout title='友链'>
      <Grid container spacing={3} className='py-4 mt-6'>
        {
          nodes.map((node, index) => (
            <Grid
              key={node.id} item xs={12} md={6} lg={4}
              data-sal='slide-up'
              data-sal-duration='1000'
              data-sal-repeat='true'
            >
              <Card className='relative top-0 transition-all duration-700 hover:shadow-image hover:-top-4'>
                <CardContent className='p-0'>
                  <CardActionArea
                    className={`px-4 pt-4 pb-2 text-white ${getBgColors(index)}`}
                    onClick={() => isBrowser() && window.open(node.link, '_blank')}
                  >
                    <div className='text-white text-xl'>
                      <Avatar
                        className='w-6 h-6 inline-block bg-gray-100 align-middle text-center text-sm mr-1 leading-relaxed'
                        alt={node.name}
                        src={checks[`${node.id}-avatar`]}
                      />
                      {node.name}
                    </div>
                    <Typography
                      href={node.link} className='mt-3 text-white no-underline' color='textSecondary'
                      target='_blank'
                      component='a'
                    >
                      {node.link}
                    </Typography>
                  </CardActionArea>
                  <Typography className='py-5 h-20 px-4 bg-gray-100 dark:bg-gray-500' variant='body2' component='p'>
                    {node.description}
                  </Typography>
                </CardContent>
                <CardActions className='flex px-4 justify-between bg-gray-100 dark:bg-gray-500 text-gray-400'>
                  <div>
                    <Button disabled startIcon={<AlternateEmailIcon className='text-xs' />}>
                      <span>{node.tag}</span>
                    </Button>
                  </div>
                  <div>
                    <LinkStatus status={checks[node.id] || 'unknown'} />
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <div>
        <div className='text-2xl my-5 font-bold'>欢迎申请添加友链哦~🔥🔥🔥 只需要名称、地址和描述即可！</div>
      </div>
      <Comment />
    </Layout>
  )
}

export const query = graphql`
  {
    allLinksJson {
      nodes {
        id
        name
        description
        link
        tag
      }
    }
  }
`

export default LinkPage
