import { FC, ReactElement } from 'react'
import Typed from 'react-typed'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { createStyles } from '@material-ui/core/styles'
import { makeStyles, Typography } from '@material-ui/core'
import { isBrowser } from '../util/constant'
import { BannerProps } from '../interface/page'

const useStyles = makeStyles(() =>
  createStyles({
    banner: {
      background: 'url("https://rmt.dogedoge.com/fetch/fluid/storage/bg/vdysjx.png?w=1920&fmt=webp") center center / cover no-repeat',
      height: '100vh',
      width: '100%'
    },
    mask: {
      backgroundColor: 'rgba(0, 0, 0, .3)'
    }
  })
)

const Banner: FC<BannerProps> = ({ title }): ReactElement => {
  const classes = useStyles()
  const handleScrollContent = () => {
    isBrowser() && window.scrollTo({ top: screen.height - 100, behavior: 'smooth' })
  }
  return (
    <div className={classes.banner}>
      <div className={`${classes.mask} w-full h-full flex flex-col justify-center items-center justify-between`}>
        <Typography className='flex flex-col justify-center items-center pt-2 text-white h-5/6 text-center mx-8' variant='h4'>
          <Typed
            strings={[title]}
            typeSpeed={40}
            backSpeed={50}
            cursorChar='_'
            shuffle
          />
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
