import { dbContext } from "../db/DbContext"

class BugsService {
  async createBug(bugData) {
    const bugs = await dbContext.Bug.create(bugData)
    await bugs.populate('creator')
    return bugs
  }

  async getBugs() {
    const bugs = await dbContext.Bug.find()
    return bugs
  }

}

export const bugsService = new BugsService()