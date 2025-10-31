import { NextRequest, NextResponse } from "next/server";
import seedDatabase from "@/lib/seed";

export async function POST(request: NextRequest) {
  try {
    // Only allow seeding in development or with proper authorization
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Database seeding is not allowed in production" },
        { status: 403 }
      );
    }

    await seedDatabase();

    return NextResponse.json(
      {
        message: "Database seeded successfully!",
        credentials: {
          admin: "admin@rolevault.com / password",
          users:
            "john@rolevault.com, jane@rolevault.com, mike@rolevault.com / password",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Seed database error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
