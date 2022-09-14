import { Form, FormProps } from "app/core/components/form/Form"
import { LabeledTextField } from "app/core/components/form/LabeledTextField"
import dynamic from "next/dynamic"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/form/Form"

const DynamicRichTextField = dynamic(() => import("app/core/components/form/RichTextField"), {
  ssr: false,
})

export function ProjectForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & { value: string; setValue: (value: string) => void }
) {
  return (
    <Form<S> {...props} className="flex flex-col min-h-screen p-4 ml-12 sm:ml-0">
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <div id="editor">
        <DynamicRichTextField value={props.value} setValue={props.setValue} />
      </div>
      <LabeledTextField name="summary" label="Summary" placeholder="Summary" />
      <LabeledTextField name="link1" label="Link 1" placeholder="Link 1" />
      <LabeledTextField name="link2" label="Link 2" placeholder="Link 2" />
      <LabeledTextField name="image" label="Image" placeholder="Image" />
      <LabeledTextField name="keywords" label="Keywords" placeholder="Keywords" />
      <LabeledTextField name="slug" label="Slug" placeholder="Slug" />
    </Form>
  )
}
