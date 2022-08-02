import Button from "app/core/components/button"
import { Image, Link, Routes, useMutation, useSession } from "blitz"
import React from "react"
import logout from "../mutations/logout"

const LogInOut: React.FunctionComponent = () => {
  const session = useSession()
  const [logoutMutation] = useMutation(logout)
  const handleClick = async () => {
    await logoutMutation()
  }
  return (
    <>
      {session.userId === null ? (
        <Link href={Routes.LoginPage()}>
          <a className="absolute right-1 top-1 sm:top-14">
            <Image
              className="invert-[95%] dark:invert-[10%]"
              src="/login.png"
              alt="Login"
              width={20}
              height={20}
              priority
            />
          </a>
        </Link>
      ) : (
        <Button
          className="absolute p-0 my-0 right-1 top-1 sm:top-14"
          bg="transparent"
          bgHover="transparent"
          width="fit-content"
          onClick={handleClick}
        >
          <Image
            className="dark:invert"
            src="/logout.png"
            alt="logout"
            width={20}
            height={20}
            priority
          />
        </Button>
      )}
    </>
  )
}

export default LogInOut
