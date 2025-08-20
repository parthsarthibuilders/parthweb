import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/model/BlogModel";
import mongoose from "mongoose";

export async function GET(req, context) {
    await dbConnect();

    try {
        const param = context.params.id; // this can be id or slug
        let data;

        // check if param is a valid Mongo ObjectId
        if (mongoose.Types.ObjectId.isValid(param)) {
            data = await BlogModel.findById(param);
        } else {
            data = await BlogModel.findOne({ slug: param });
        }

        if (!data) {
            return Response.json(
                {
                    message: "Data Not Found From this ID/Slug",
                    success: false,
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                message: "Data fetched successfully",
                success: true,
                data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return Response.json(
            {
                message: "Error while fetching data",
                success: false,
            },
            { status: 400 }
        );
    }
}
