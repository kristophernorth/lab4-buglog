import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugSchema } from '../models/Bug';
// import { ValueSchema } from '../models/Value'

class DbContext {
  // Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bug = mongoose.model('Bug', BugSchema)
  // TrackedBug = mongoose.model('TrackedBug', TrackedBugSchema)
  // Note = mongoose.modell('Note', NoteSchema)
}

export const dbContext = new DbContext()
