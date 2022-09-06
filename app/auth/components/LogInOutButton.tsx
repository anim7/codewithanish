import Link from "next/link"
import Image from "next/image"
import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Button from "app/core/components/button"
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
          <a className="absolute right-1 top-1 sm:top-14" id="login">
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
          id="logout"
          marginY="0"
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
