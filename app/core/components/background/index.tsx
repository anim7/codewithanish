import React, { useContext, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame, useLoader, Vector3 } from "@react-three/fiber"
import { MathUtils, Mesh, TextureLoader } from "three"
import { Edges, useTexture } from "@react-three/drei"

const BoxComponent = (props: any) => {
  // const getRandomValues = (range: number): Vector3 => {
  //   return [
  //     MathUtils.randFloatSpread(range),
  //     MathUtils.randFloatSpread(range),
  //     MathUtils.randFloatSpread(range),
  //   ]
  // }
  const mesh = useRef<Mesh>(null!)
  // const values = getRandomValues(0.005)
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

const Background: React.FunctionComponent = () => {
  return (
    <motion.div className="fixed inset-0 -z-10">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {/* {Array<number>(500)
          .fill(1)
          .map((_, key) => (
            <BoxComponent key={key} />
          ))} */}
        <BoxComponent />
      </Canvas>
    </motion.div>
  )
}

export default Background
