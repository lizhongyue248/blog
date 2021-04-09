import { useRef, useEffect, FC, ReactElement } from 'react'
import { useRecoilValue } from 'recoil'
import _ from 'lodash'
import { darkState } from '../store/base'

const Comment: FC = (): ReactElement => {
  const dark = useRecoilValue(darkState)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const utterances = document.getElementsByClassName('utterances') || []
    _.range(utterances.length).forEach(index => utterances[index].remove())
    const scriptEl = document.createElement('script')
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js')
    scriptEl.setAttribute('crossorigin', 'anonymous')
    scriptEl.setAttribute('async', 'true')
    scriptEl.setAttribute('repo', 'lizhongyue248/blog')
    scriptEl.setAttribute('issue-term', 'title')
    scriptEl.setAttribute('theme', `github-${dark ? 'dark' : 'light'}`)
    ref.current && ref.current.appendChild(scriptEl)
  }, [dark])
  return (
    <div ref={ref} className='comments'>
      <div />
    </div>
  )
}

export default Comment
