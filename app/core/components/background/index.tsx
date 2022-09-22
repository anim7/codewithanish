/* eslint-disable react/no-unknown-property */
import React, { useRef, useLayoutEffect } from "react"
import { motion, useViewportScroll } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Mesh } from "three"
import { Edges, useTexture } from "@react-three/drei"
import { useTransform, useTime } from "framer-motion"
import { degreesToRadians, progress, mix } from "popmotion"

const Star = ({ p }: { p: number }) => {
  const ref = useRef<any>(null)
  const texture = useTexture("favicon.ico")

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random())
    const yAngle = mix(degreesToRadians(80), degreesToRadians(100), Math.random())
    const xAngle = degreesToRadians(360) * p
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle)
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial map={texture} />
      <Edges scale={1} color="#007bff" />
    </mesh>
  )
}

const BoxComponent = (props: any) => {
  const mesh = useRef<Mesh>(null!)
  const texture = useTexture("favicon.ico")

  useFrame(() => {
    mesh.current.rotation.x += 0.005
    mesh.current.rotation.y += 0.005
    mesh.current.rotation.z += 0.005
  })

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={texture} />
      <Edges scale={1} color="#007bff" />
    </mesh>
  )
}

const Scene = () => {
  const gl = useThree((state) => state.gl)
  const { scrollYProgress } = useViewportScroll()
  const yAngle = useTransform(scrollYProgress, [0, 1], [0.001, degreesToRadians(180)])
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3])
  const time = useTime()

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(distance.get(), yAngle.get(), time.get() * 0.0005)
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  })

  useLayoutEffect(() => gl.setPixelRatio(1))

  const stars: JSX.Element[] = []
  for (let i = 0; i < 100; i++) {
    stars.push(<Star p={progress(0, 100, i)} />)
  }
  return (
    <>
      <BoxComponent />
      {stars}
    </>
  )
}

const Background: React.FunctionComponent = () => {
  return (
    <motion.div className="fixed inset-0 -z-10">
      <Canvas gl={{ antialias: false }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Scene />
      </Canvas>
    </motion.div>
  )
}

export default Background
