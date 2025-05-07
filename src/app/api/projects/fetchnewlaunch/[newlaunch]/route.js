import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";

export async function GET() {
  await dbConnect();

  try {
    const data = await ProjectModel.find({
      category: "674854a2bdf9f512c5d4bd1a",
      defaultValue: "project"
    })
      .select("slug logo image title location") // <-- only required fields
      .sort({ createdAt: -1 }) // optional: latest first
      .limit(10) // optional: limit results
      .lean(); // improves performance by returning plain JS objects

    return Response.json(
      {
        message: "All Data Fetched!",
        success: true,
        data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return Response.json(
      {
        message: "Have an error to fetch data",
        success: false
      },
      { status: 400 }
    );
  }
}
