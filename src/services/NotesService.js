import { dbContext } from "../db/DbContext"


class NotesService {

  async createNote(bugId) {
    const notes = await dbContext.Note.create(bugId)
    await notes.populate('creator')
    return notes
  }

  async getNotesByBugId(bugId) {
    const note = await dbContext.Bug.findById(bugId)
    if (!note) throw new Error('There are no notes for that bug')
    // if (bugId != note.bugId) throw new Error('You can't edit another users note')
    await note.populate('bug')
  }

}

export const notesService = new NotesService()