import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboardAction } from '../hooks/useKeboardActions'

export function Player() {
  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboardAction()

  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 0.5, 0]
  }))

  const positionSphere = useRef([0, 0, 0])
  const velocitySphere = useRef([0, 0, 0])

  useEffect(() => {
    api.position.subscribe(p => {
      positionSphere.current = p
    })
  }, [api.position])

  useEffect(() => {
    api.velocity.subscribe(vel => {
      velocitySphere.current = vel
    })
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        positionSphere.current[0], // x
        positionSphere.current[1], // y
        positionSphere.current[2] // z
      )
    )

    const direction = new Vector3()

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )

    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(4)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocitySphere.current[1], direction.z)

    if (jump && Math.abs(velocitySphere.current[1]) < 0.05) {
      api.velocity.set(velocitySphere.current[0], 4, velocitySphere.current[2])
    }
  })

  return (
    <>
      <mesh ref={ref} />
    </>
  )
}
