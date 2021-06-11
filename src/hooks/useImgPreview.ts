import { useRecoilState } from 'recoil'
import { imgPreviewState } from '../store/base'
import { UseImgPreview } from '../interface/site'

const useImgPreview = (): UseImgPreview => {
  const [imgPreview, setImgPreview] = useRecoilState(imgPreviewState)
  const { open, src, alt } = imgPreview
  const handleClose = () =>
    setImgPreview(currVal => ({
      ...currVal,
      open: false
    }))
  const handleOpen = (src: string, alt: string) =>
    setImgPreview({
      open: true,
      src,
      alt
    })
  const reset = () =>
    setImgPreview({
      open: false,
      src: '',
      alt: ''
    })
  return {
    open, src, alt, handleClose, handleOpen, reset
  }
}

export default useImgPreview
