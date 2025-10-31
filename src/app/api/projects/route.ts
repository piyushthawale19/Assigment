import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import User from "@/models/User";
import jwt from "jsonwebtoken";

// Helper function to get user from token
async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const decoded = jwt.verify(
    token,
    process.env.NEXTAUTH_SECRET || "fallback-secret"
  ) as any;
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

// GET - Get all projects for the authenticated user
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const user = await getUserFromToken(request);

    let projects;
    if (user.role === "admin") {
      // Admin can see all projects with user information
      projects = await Project.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 });
    } else {
      // Regular users can only see their own projects
      projects = await Project.find({ userId: user._id }).sort({
        createdAt: -1,
      });
    }

    return NextResponse.json(
      {
        projects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const user = await getUserFromToken(request);
    const { name, status, deadline, description, priority } =
      await request.json();

    // Validate input
    if (!name || !deadline) {
      return NextResponse.json(
        { error: "Project name and deadline are required" },
        { status: 400 }
      );
    }

    const project = new Project({
      name,
      status: status || "In Progress",
      deadline: new Date(deadline),
      userId: user._id,
      description,
      priority: priority || "Medium",
    });

    await project.save();

    return NextResponse.json(
      {
        message: "Project created successfully",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
