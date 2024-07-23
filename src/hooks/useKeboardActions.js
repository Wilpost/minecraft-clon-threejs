import { useEffect, useState } from 'react'
import { ACTIONS_KEYBOARD_MAP } from '../const/playerActions'

export function useKeyboardAction() {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirtTexture: false,
    grassTexture: false,
    glassTexture: false,
    woodTexture: false,
    logTexture: false
  })

  useEffect(() => {
    const eventAction = (event, variant) => {
      const code = event.code
      const action = ACTIONS_KEYBOARD_MAP[code]

      if (action) {
        setActions(prevState => {
          return {
            ...prevState,
            [action]:
              (variant === 'DOWN' && true) || (variant !== 'DOWN' && false)
          }
        })
      }
    }

    document.addEventListener('keydown', e => {
      eventAction(e, 'DOWN')
    })

    document.addEventListener('keyup', e => {
      eventAction(e, 'UP')
    })

    return () => {
      document.removeEventListener('keydown', e => {
        eventAction(e)
      })

      document.removeEventListener('keyup', e => {
        eventAction(e)
      })
    }
  }, [])

  return actions
}
