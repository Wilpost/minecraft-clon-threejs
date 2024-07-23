import { usePlane } from '@react-three/cannon'
import { useStore } from '../hooks/useStores'
import { groundTexture } from '../utils/textures'

export function Ground() {
  const [ref] = usePlane(() => ({
    position: [0, -0.5, 0],
    rotation: [-Math.PI / 2, 0, 0]
  }))

  const [addCube, texture] = useStore(state => [state.addCube, state.texture])

  groundTexture.repeat.set(200, 200)

  return (
    <mesh
      onClick={e => {
        e.stopPropagation()

        const [x, y, z] = Object.values(e.point).map(item => Math.ceil(item))
        addCube([x, y, z], texture)
      }}
      ref={ref}>
      <planeGeometry attach='geometry' args={[300, 300]} />
      <meshStandardMaterial attach='material' map={groundTexture} />
    </mesh>
  )
}
