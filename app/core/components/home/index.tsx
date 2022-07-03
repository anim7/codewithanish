import React from "react"
import Background from "../background"

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Background />
      <div className="flex items-center justify-center min-h-screen ml-12">
        <h1 className="text-black dark:text-white text-[5rem] tracking-widest">I am Bigfoot</h1>
      </div>
    </>
  )
}

export default Home
