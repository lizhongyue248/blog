import { FC, ReactElement } from 'react'
import Typed from 'react-typed'
import { useTitle } from 'ahooks'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { createStyles } from '@material-ui/core/styles'
import { makeStyles, Typography } from '@material-ui/core'
import { isBrowser } from '../util/constant'
import { BannerProps } from '../interface/page'

const useStyles = makeStyles(() =>
  createStyles({
    banner: {
      background: 'center center / cover no-repeat',
      height: '100vh',
      width: '100%'
    },
    mask: {
      backgroundColor: 'rgba(0, 0, 0, .3)'
    }
  })
)

const Banner: FC<BannerProps> = ({ banner, title, other = <div /> }): ReactElement => {
  const classes = useStyles()
  useTitle(title)
  const handleScrollContent = () => { isBrowser() && window.scrollTo({ top: screen.height - 100, behavior: 'smooth' }) }
  return (
    <div className={classes.banner} style={{ backgroundImage: `url("${banner}")` }}>
      <div className={`${classes.mask} w-full h-full flex flex-col justify-center items-center justify-between`}>
        <Typography className='flex flex-col justify-center items-center pt-2 text-white h-5/6 text-center mx-8' variant='h4'>
          <Typed
            className='text-3xl md:text-4xl lg:text-5xl'
            strings={[title]}
            typeSpeed={40}
            backSpeed={50}
            shuffle
          />
          <div
            className='mt-2 md:mt-4 lg:mt-8 text-sm text-base lg:text-xl font-normal'
            data-sal='slide-up'
            data-sal-delay='1000'
            data-sal-duration='1000'
          >
            {other}
          </div>
        </Typography>
        <KeyboardArrowDownIcon
          className='text-white w-full mt-3 cursor-pointer animate-bounce-opacity'
          fontSize='large'
          onClick={handleScrollContent}
        />
      </div>
    </div>
  )
}

export default Banner
