import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

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

  async getBugById(bugId, userId) {
    const bug = await dbContext.Bug.findById(bugId)
    if (!bug) throw new Error('No bug at id: ${}bugId')
    if (userId != bug.creatorId) throw new Error('That is not your bug')
    await bug.populate('creator')
    return bug
  }

  async updateBug(bugId, updateData, userId) {
    const originalBug = await dbContext.Bug.findById(bugId)

    if (!originalBug) throw new Error('No bug for that ID')
    if (userId != originalBug.creatorId) throw new Forbidden('That bug does not belong to you')
    if (updateData.description) originalBug.description = updateData.description //what is this saying?
    if (updateData.title) originalBug.title = updateData.title
    originalBug.closed = updateData.completed ?? originalBug.closed
    await originalBug.save()
    return originalBug
  }

  async deleteBug(bugId, userId) {
    const bugToDelete = await dbContext.Bug.findById(bugId)
    if (!bugToDelete) throw new Error('No bug to delete')
    if (bugToDelete.creatorId != userId) throw new Forbidden('Yo cannot delete this bug')
    await bugToDelete.deleteOne()
    return `${bugToDelete.title} was deleted`
  }

}

export const bugsService = new BugsService()