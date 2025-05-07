import dbConnect from "@/lib/dbConnect";
import ProjectCategoryModel from "@/model/ProjectCategoryModel";
import { NextResponse } from "next/server";
export async function GET() {

    await dbConnect();

    try {
        const data = await ProjectCategoryModel.find({ defaultValue: "category" })
            .select("title image slug") // Only fetch needed fields
            .lean(); // Improves performance by returning plain JS objects

        if (!data || data.length === 0) {
            return NextResponse.json(
                { message: "No categories found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Categories fetched successfully", success: true, data },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json(
            { message: "Error fetching categories", success: false },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    await dbConnect();
    try {

        const { title, slug, image, seoTitle, seoDescription } = await req.json();

        const addCategory = await ProjectCategoryModel.create(
            { title, slug, image, seoTitle, seoDescription }
        );

        return Response.json(
            {
                message: "Category Created Successfully!",
                success: true
            },
            {
                status: 200
            }
        )



    } catch (error) {
        console.log(error);

        return Response.json(
            {
                message: "Category Not Created!",
                success: false
            },
            {
                status: 500
            }
        )
    }
}