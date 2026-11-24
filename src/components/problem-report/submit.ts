import { createServerFn } from "@tanstack/react-start"
import { submitProblemReport } from "./submit.server"

/** The form's submission from the page's script. Without JavaScript the form posts to the page itself. */
export const submitProblemReportFn = createServerFn({ method: "POST" })
  .validator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error("Expected form data")
    return data
  })
  .handler(({ data }) => submitProblemReport(data))
