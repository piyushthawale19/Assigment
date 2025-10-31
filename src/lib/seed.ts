import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import bcrypt from "bcryptjs";

async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    console.log("Cleared existing data");

    // Create admin user
    const adminPassword = await bcrypt.hash("password", 12);
    const adminUser = new User({
      name: "Admin User",
      email: "admin@rolevault.com",
      password: adminPassword,
      role: "admin",
    });
    await adminUser.save();
    console.log("Created admin user");

    // Create regular users
    const userPassword = await bcrypt.hash("password", 12);

    const user1 = new User({
      name: "John Doe",
      email: "john@rolevault.com",
      password: userPassword,
      role: "user",
    });
    await user1.save();

    const user2 = new User({
      name: "Jane Smith",
      email: "jane@rolevault.com",
      password: userPassword,
      role: "user",
    });
    await user2.save();

    const user3 = new User({
      name: "Mike Johnson",
      email: "mike@rolevault.com",
      password: userPassword,
      role: "user",
    });
    await user3.save();

    console.log("Created regular users");

    // Create sample projects
    const projects = [
      {
        name: "Project Alpha",
        status: "In Progress",
        deadline: new Date("2024-12-31"),
        userId: user1._id,
        description: "A sample project for demonstration",
        priority: "High",
      },
      {
        name: "Project Bravo",
        status: "Completed",
        deadline: new Date("2024-10-15"),
        userId: user1._id,
        description: "Completed project showcase",
        priority: "Medium",
      },
      {
        name: "Project Charlie",
        status: "On Hold",
        deadline: new Date("2025-02-01"),
        userId: user2._id,
        description: "Project currently on hold",
        priority: "Low",
      },
      {
        name: "Dashboard Redesign",
        status: "In Progress",
        deadline: new Date("2024-11-30"),
        userId: user3._id,
        description: "Redesigning the main dashboard",
        priority: "High",
      },
      {
        name: "Database Migration",
        status: "Completed",
        deadline: new Date("2024-09-15"),
        userId: adminUser._id,
        description: "Migrating to MongoDB",
        priority: "High",
      },
    ];

    await Project.insertMany(projects);
    console.log("Created sample projects");

    console.log("Database seeded successfully!");
    console.log("Login credentials:");
    console.log("Admin: admin@rolevault.com / password");
    console.log(
      "Users: john@rolevault.com, jane@rolevault.com, mike@rolevault.com / password"
    );
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

export default seedDatabase;
