import { UserData } from '@/entities'
import { MissingParamError } from '@/entities/errors/missing-param-error'
import { HttpResponse, HttpRequest, UseCase } from '@/web-controllers/ports'
import { badRequest, created, serverError } from '@/web-controllers/util'

export class RegisterUserController {
  private readonly usecase: UseCase

  constructor (usecase: UseCase) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!(request.body.name) || !(request.body.email)) {
        let missingParam = !(request.body.name) ? 'name ' : ''
        missingParam += !(request.body.email) ? 'email' : ''
        return badRequest(new MissingParamError(missingParam.trim()))
      }

      const userData: UserData = request.body
      const response = await this.usecase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
