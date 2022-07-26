import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  name: string
  label: string
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? (Number as any) : (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps} className="mb-3">
        <label
          {...labelProps}
          className="flex flex-col items-start text-[1rem] text-black dark:text-white"
        >
          {label}
          <input
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
            className="text-[1rem] py-1 px-2 rounded-[0.5rem] border dark:border-none border-[#6c6c6c] dark:text-white appearance-none focus:outline-none dark:bg-[#4f4f4f] text-black focus:dark:bg-[#2d2d2d] w-full"
          />
        </label>

        {touched && normalizedError && (
          <div role="alert" className="text-red-500">
            *{normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
