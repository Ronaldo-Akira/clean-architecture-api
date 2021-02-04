import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register_user_on_mailing_list'
import { HttpResponse, HttpRequest } from '@/web-controllers/ports'
import { created } from '@/web-controllers/util'

export class RegisterUserController {
  private readonly usecase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usecase = usecase
  }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const response = await this.usecase.RegisterUserOnMailingList(userData)

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
