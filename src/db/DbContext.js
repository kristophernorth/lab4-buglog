import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugSchema } from '../models/Bug';
import { NoteSchema } from '../models/Note';
// import { ValueSchema } from '../models/Value'

class DbContext {
  // Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bug = mongoose.model('Bug', BugSchema)
  Note = mongoose.model('Note', NoteSchema)
  // TrackedBug = mongoose.model('TrackedBug', TrackedBugSchema)
}

export const dbContext = new DbContext()
