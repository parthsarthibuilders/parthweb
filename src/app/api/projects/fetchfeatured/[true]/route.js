import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/model/ProjectModel";

export async function GET() {
  try {
    // Only connect if not already connected
    if (!global.mongooseConnection) {
      global.mongooseConnection = dbConnect();
      await global.mongooseConnection;
    }

    const data = await ProjectModel.find(
      { isFeatured: true, defaultValue: "project" },
      "title location price featureImage logo image slug bhk.bhk projectSize.size" // select only necessary fields directly
    )
      .sort({ createdAt: -1 })
      .limit(3)
      .lean() // Return plain JS objects, improves read performance
      .exec(); // Improves query performance in Mongoose

    return Response.json(
      {
        message: "Latest 3 featured projects fetched!",
        success: true,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return Response.json(
      {
        message: "An error occurred while fetching data",
        success: false,
      },
      {
        status: 400,
      }
    );
  }
}
