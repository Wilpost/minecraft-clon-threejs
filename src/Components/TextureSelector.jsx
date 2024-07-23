import { useEffect, useState } from 'react'
import { useKeyboardAction } from '../hooks/useKeboardActions'
import * as images from '../utils/texture_images'
import { useStore } from '../hooks/useStores'
import { ACTIONS_KEYBOARD_MAP_TEXTURE_BOARD } from '../const/playerActions'

export function TextureSelector() {
  const [isActive, setIsActive] = useState(false)
  const [texture, setTexture] = useStore(state => [
    state.texture,
    state.setTexture
  ])

  const textures = Object.entries(images)
  const { dirtTexture, grassTexture, glassTexture, logTexture, woodTexture } =
    useKeyboardAction()

  useEffect(() => {
    const textureFound = Object.entries({
      dirtTexture,
      grassTexture,
      glassTexture,
      logTexture,
      woodTexture
    }).find(([_, isEnabled]) => isEnabled)

    if (textureFound) {
      const [textureName, isSelected] = textureFound

      if (isSelected) {
        setTexture(textureName)
      }
    }

    const handleKeyEvent = e => {
      e.stopPropagation()
      const action = ACTIONS_KEYBOARD_MAP_TEXTURE_BOARD[e.code]

      if (action || e.code === 'KeyB') {
        setIsActive(true)
      }
    }

    document.addEventListener('keypress', handleKeyEvent)

    return () => {
      document.removeEventListener('keypress', handleKeyEvent)
    }
  }, [
    dirtTexture,
    grassTexture,
    glassTexture,
    logTexture,
    woodTexture,
    setTexture,
    setIsActive,
    isActive
  ])

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false)
      }, 7000)
    }
  }, [isActive, setIsActive])

  return (
    <>
      <article className={isActive ? 'texture_selector' : 'not-selected'}>
        {textures.map(([name, image], index) => {
          return (
            <div className='texture_container' key={index}>
              <img
                className={`${
                  name === texture && 'texture_selected'
                } image_texture`}
                src={image}
                alt='Imagen de la textura que se va a utilizar'
              />
              <span>{index + 1}</span>
            </div>
          )
        })}
      </article>
    </>
  )
}
