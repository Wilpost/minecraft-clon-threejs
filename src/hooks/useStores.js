import { create } from 'zustand'

const worldSaved = localStorage.getItem('world')

const stateInitialized = () => {
  if (worldSaved) {
    return JSON.parse(worldSaved)
  }

  return { cubes: [], texture: 'logTexture' }
}

export const useStore = create(set => ({
  ...stateInitialized(),
  addCube: ([x, y, z], texture) => {
    set(state => ({
      cubes: [
        ...state.cubes,
        {
          id: crypto.randomUUID(),
          texture,
          position: [x, y, z]
        }
      ]
    }))
  },

  removeCube: ([x, y, z]) => {
    set(state => ({
      cubes: state.cubes.filter(cube => {
        const cubeSelected = state.cubes.find(
          item =>
            item.position[0] === x &&
            item.position[1] === y &&
            item.position[2] === z
        )

        return cube.id !== cubeSelected.id
      })
    }))
  },

  setTexture: texture => {
    set(() => ({ texture }))
  },

  reset: () => {
    set(() => ({ cubes: [], texture: 'logTexture' }))
  }
}))
