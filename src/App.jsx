import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Ground } from './Components/Ground'
import { FPV } from './Components/FPV'
import { Player } from './Components/Player'
import { Cubes } from './Components/Cubes'
import { TextureSelector } from './Components/TextureSelector'
import { useGameFeatures } from './hooks/useGameFeatures'

function App() {
  const { reset, saveDeparture } = useGameFeatures()
  return (
    <>
      <div className='game_state_contianer'>
        <button className='save_button' onClick={saveDeparture}>
          Save
        </button>
        <button onClick={reset} className='reset_button'>
          Reset
        </button>
      </div>
      <Canvas>
        <Sky />
        <ambientLight />
        <FPV />
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      <div className='pointer'>+</div>
      <TextureSelector />

      <div className='mobile_actions_tabler'>
        <div>left</div>
        <div>down</div>
        <div>rigth</div>
        <div>up</div>
      </div>
    </>
  )
}

export default App
