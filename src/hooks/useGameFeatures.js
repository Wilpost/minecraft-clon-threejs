import { useStore } from './useStores'

export function useGameFeatures() {
  const [currentState, reset] = useStore(state => [state, state.reset])

  const saveDeparture = () => {
    localStorage.setItem('world', JSON.stringify(currentState))
  }

  return { saveDeparture, reset }
}
