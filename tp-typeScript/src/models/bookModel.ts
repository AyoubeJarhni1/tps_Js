import mongoose, { Schema, Document } from "mongoose";

export type StatusType = "Read" | "Re-read" | "DNF" | "Currently reading" | "Returned Unread" | "Want to read";
export type FormatType = "Print" | "PDF" | "Ebook" | "AudioBook";

export interface IBook extends Document {
  title: string;
  author: string;
  numberOfPages: number;
  pagesRead: number;
  price: number;
  status: StatusType;
  format: FormatType;
  suggestedBy?: string;
  finished: boolean;
}


const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  numberOfPages: { type: Number, required: true, min: 1 },
  pagesRead: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["Read","Re-read","DNF","Currently reading","Returned Unread","Want to read"], required: true },
  format: { type: String, enum: ["Print","PDF","Ebook","AudioBook"], required: true },
  suggestedBy: { type: String },
  finished: { type: Boolean, default: false }
}, { timestamps: true });

BookSchema.pre<IBook>("save", function(next) {
  if (this.pagesRead >= this.numberOfPages) {
    this.finished = true;
    this.pagesRead = this.numberOfPages; 
  } else {
    this.finished = false;
  }
  next();
});

export default mongoose.model<IBook>("Book", BookSchema);