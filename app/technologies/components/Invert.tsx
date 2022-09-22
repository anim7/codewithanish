import React from "react"

const Invert: React.FunctionComponent = () => {
  return (
    <div>
      <label className="text-black dark:text-white text-[1rem]" htmlFor="invertRadioBtns">
        Invert Image in Dark Mode?
      </label>
      <div id="invertRadioBtns">
        <input type="radio" name="invertInDarkMode" id="yes" />
        <label htmlFor="yes" className="ml-2 text-black dark:text-white text-[0.9rem]">
          Yes
        </label>
      </div>
      <div>
        <input type="radio" name="invertInDarkMode" id="no" defaultChecked />
        <label htmlFor="no" className="ml-2 text-black dark:text-white text-[0.9rem]">
          No
        </label>
      </div>
    </div>
  )
}

export default Invert
