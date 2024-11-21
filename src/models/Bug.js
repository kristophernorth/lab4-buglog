import { Schema } from "mongoose";

export const BugSchema = new Schema({
  title: { type: String, minLength: 10, maxLength: 50, required: true },
  description: { type: String, minLength: 10, maxLength: 500, required: true },
  priority: { type: Number, min: 1, max: 5 },
  closed: { type: Boolean, required: true },
  closedDate: { type: Date },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
}, { timestamps: true, toJSON: { virtuals: true } })

BugSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})