import { useStore } from '../hooks/useStores'
import { Cube } from './Cube'
import * as textures from '../utils/textures'

export function Cubes() {
  const { cubes } = useStore(state => state)

  return cubes.map(cube => {
    const textureSelect = textures[cube.texture]

    return (
      <Cube key={cube.id} position={cube.position} texture={textureSelect} />
    )
  })
}
