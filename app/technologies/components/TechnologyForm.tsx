import { Form, FormProps } from "app/core/components/form/Form"
import { LabeledTextField } from "app/core/components/form/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/form/Form"

export function TechnologyForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props} className="flex flex-col min-h-screen p-4 ml-12 sm:ml-0">
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="link" label="Link" placeholder="Official Website Link" />
      <LabeledTextField name="logo" label="Logo" placeholder="Logo Link" />
      <LabeledTextField name="desc" label="Description" placeholder="Description" />
    </Form>
  )
}
