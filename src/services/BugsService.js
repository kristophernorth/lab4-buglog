import { dbContext } from "../db/DbContext"

class BugsService {
  createBug(bugData) {
    const bugs = dbContext.Bug.create(bugData)
    return bugs
  }

  async getBugs() {
    const bugs = dbContext.Bug.find()
    return bugs
  }
}

export const bugsService = new BugsService()