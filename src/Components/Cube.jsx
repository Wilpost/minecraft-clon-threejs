import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import { useStore } from '../hooks/useStores'

// eslint-disable-next-line react/prop-types
export function Cube({ position, texture }) {
  const [isHovered, setIsHovered] = useState(false)
  const [removeCube, addCube, currentTexture] = useStore(state => [
    state.removeCube,
    state.addCube,
    state.texture
  ])

  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  return (
    <mesh
      onClick={e => {
        e.stopPropagation()
        const [x, y, z] = Object.values(ref.current.position).map(item =>
          Math.ceil(item)
        )

        const faceOfCube = Math.floor(e.faceIndex / 2)

        if (e.altKey) {
          removeCube([x, y, z])
          return
        }

        if (faceOfCube === 0) {
          addCube([x + 1, y, z], currentTexture)
          return
        } else if (faceOfCube === 1) {
          addCube([x - 1, y, z], currentTexture)
          return
        } else if (faceOfCube === 2) {
          addCube([x, y + 1, z], currentTexture)
          return
        } else if (faceOfCube === 3) {
          addCube([x - 1, y, z], currentTexture)
          return
        } else if (faceOfCube === 4) {
          addCube([x, y, z + 1], currentTexture)
          return
        } else if (faceOfCube === 5) {
          addCube([x, y, z - 1], currentTexture)
          return
        }
      }}
      onPointerMove={e => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={e => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      ref={ref}>
      <boxGeometry attach='geometry' />
      <meshStandardMaterial
        attach='material'
        map={texture}
        color={isHovered ? 'rgb(204, 204, 204)' : 'white'}
      />
    </mesh>
  )
}
