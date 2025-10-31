import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  _id: string;
  name: string;
  status: "In Progress" | "Completed" | "On Hold";
  deadline: Date;
  userId: mongoose.Types.ObjectId;
  description?: string;
  priority: "Low" | "Medium" | "High";
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed", "On Hold"],
      default: "In Progress",
    },
    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ProjectSchema.index({ userId: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ deadline: 1 });

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
