import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import express, { Response, Express } from 'express'
import bodyParser from 'body-parser'
import { getFormData } from './lib/requests/fillout-api'
import { FilloutRequest, FilloutResponse } from './lib/declarations/fillout'

const app: Express = express()
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const checkCondition = (
  filterVal: string | number,
  questionVal: string | number,
  condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than',
  type: 'ShortAnswer' | 'DatePicker' | 'LongAnswer' | 'MultipleChoice' | 'EmailInput'
): boolean => {
  if (type === 'DatePicker') {
    filterVal = new Date(filterVal).getTime()
    questionVal = new Date(questionVal).getTime()
  }
  switch (condition) {
    case 'equals':
      return questionVal === filterVal
    case 'does_not_equal':
      return questionVal !== filterVal
    case 'greater_than':
      return questionVal > filterVal
    case 'less_than':
      return questionVal < filterVal
    default:
      return false
  }
}

// Fetch respones from form, but with filters
app.get(
  '/:formId/filteredResponse',
  async (req: FilloutRequest, res: Response) => {
    try {
      console.log(req.query)
      const { formId } = req.params

      console.log(req.params)
      console.log(req.body)

      // const formData = await getFormData(formId, req.query)
      // console.log(JSON.stringify(formData))

      const jsonFormData = fs.readFileSync(
        path.join(__dirname, 'sample-data.json'),
        'utf-8'
      )
      const formData = await JSON.parse(jsonFormData)

      const filteredQuestions = []
      for (const resp of formData.responses) {
        let passed = true
        for (const question of resp.questions) {
          for (const filter of req.body) {
            if (question.id === filter.id) {
              if (
                !checkCondition(filter.value, question.value, filter.condition, question.type)
              ) {
                passed = false
                break
              }
            }
          }
          if (!passed) break
        }

        if (passed)
          filteredQuestions.push({
            questions: resp.questions,
            submissionId: resp.submissionId,
            submissionTime: resp.submissionTime,
            lastUpdatedAt: resp.lastUpdatedAt,
          })
      }

      const resp = {
        responses: filteredQuestions,
        totalResponses: formData.totalResponses,
        pageCount: formData.pageCount,
      }
      res.status(200).json(resp)
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
    }
  }
)

app.listen(PORT, async () => {
  console.log(`Listening on port=${PORT}`)
})
