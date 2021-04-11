import { FC, ReactElement, useEffect, useRef } from 'react'
import { isBrowser } from '../util/constant'
import { BackgroundProps } from '../interface/page'

interface Particles {
  x: number
  y: number
  r: number
  d: number
}

const Background: FC<BackgroundProps> = (
  {
    color = 'rgba(255, 255, 255, 0.8)',
    classesName = 'fixed',
    style = { zIndex: -1 }
  }
): ReactElement => {
  const ref = useRef<HTMLCanvasElement>(null)
  let interval: ReturnType<typeof setInterval>
  const W = isBrowser() ? window.innerWidth : 0
  const H = isBrowser() ? window.innerHeight : 0
  useEffect(() => {
    clearInterval(interval)
    const canvas = ref.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    canvas.width = W
    canvas.height = H
    const mp = 50
    const particles: Particles[] = []
    for (let i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 4 + 1,
        d: Math.random() * mp
      })
    }
    let angle = 0.0
    const draw = () => {
      context.clearRect(0, 0, W, H)
      context.fillStyle = color
      context.beginPath()
      for (let i = 0; i < mp; i++) {
        const p = particles[i]
        context.moveTo(p.x, p.y)
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2, true)
      }
      context.fill()
      update()
    }
    const update = () => {
      angle += 0.01
      for (let i = 0; i < mp; i++) {
        const p = particles[i]
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2
        p.x += Math.sin(angle) * 2
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d }
            continue
          }
          if (Math.sin(angle) > 0) {
            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d }
            continue
          }
          particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d }
        }
      }
    }
    interval = setInterval(draw, 33)
  }, [color, W, H])
  return <canvas ref={ref} id='canvas' className={classesName} style={style} />
}

export default Background
