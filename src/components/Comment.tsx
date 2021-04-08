import { useRef, useEffect, FC, ReactElement } from 'react'

const Comment: FC = (): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const scriptEl = document.createElement('script')
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js')
    scriptEl.setAttribute('crossorigin', 'anonymous')
    scriptEl.setAttribute('async', 'true')
    scriptEl.setAttribute('repo', 'lizhongyue248/blog')
    scriptEl.setAttribute('issue-term', 'title')
    scriptEl.setAttribute('theme', 'github-light')
    ref.current && ref.current.appendChild(scriptEl)
  }, [])
  return (
    <div ref={ref} className='comments'>
      <div />
    </div>
  )
}

export default Comment
