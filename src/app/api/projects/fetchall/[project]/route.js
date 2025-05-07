import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    try {
        const data = await ProjectModel.find({ defaultValue: "project" })
            .select("slug category   location title logo possessionStatus image") // ✅ Select only necessary fields
            .limit(50) // ✅ Optional: limit results to prevent huge payloads
            .sort({ createdAt: -1 }) // ✅ Optional: latest first
            .lean(); // ✅ Convert to plain JS objects (faster)

        if (!data || data.length === 0) {
            return NextResponse.json(
                { message: "No projects found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Projects fetched successfully", success: true, data },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { message: "Failed to fetch project data", success: false },
            { status: 500 }
        );
    }
}
