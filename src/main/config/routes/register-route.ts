import { makeRegisterUserController } from '@/main/factories'
import { Router } from 'express'
import { adaptRoute } from '@/main/config/adapters/'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()))
}
