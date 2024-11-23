import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";
import { notesService } from "../services/NotesService";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getBugs)
      .get('/:bugId', this.getBugById)
      .put('/:bugId', this.updateBug)
      .delete('/:bugId', this.deleteBug)
      .get('/:bugId/notes', this.getNotesByBugId)
  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const userInfo = request.userInfo
      // logger.log(userInfo)
      bugData.creatorId = userInfo.id
      const bugs = await bugsService.createBug(bugData)
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugs(request, response, next) {
    try {
      const bugs = await bugsService.getBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userInfo = request.userInfo
      logger.log(userInfo) //what is this for???
      const bug = await bugsService.getBugById(bugId, userInfo.id)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async updateBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const updateData = request.body
      const userInfo = request.userInfo
      const updatedBug = await bugsService.updateBug(bugId, updateData, userInfo.id)
      response.send(updatedBug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId //what is this saying?
      const userInfo = request.userInfo
      const message = await bugsService.deleteBug(bugId, userInfo.id)
      response.send(message) //why "message"?
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const note = await notesService.getNotesByBugId(bugId)
      response.send(note)
    } catch (error) {
      next(error)
    }
  }

}
