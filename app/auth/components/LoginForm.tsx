import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/form/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/form/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="max-w-[18rem] min-h-screen m-auto pt-20">
      <div className="p-4 border rounded-2xl border-slate-600">
        <h1 className="w-full text-center text-black dark:text-white text-[2rem] font-semibold">
          Login
        </h1>
        <p className="w-full text-center text-black dark:text-white">if you are the owner</p>
        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          fullBtnWidth={true}
          onSubmit={async (values) => {
            try {
              const user = await loginMutation(values)
              props.onSuccess?.(user)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
