import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getBugs)
      .post('')
  }


  async getBugs(request, response, next) {
    try {
      const bugs = await bugsService.getBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const userInfo = request.userInfo
      logger.log(userInfo)
      const bugs = await bugsService.createBug(bugData)
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }
}
