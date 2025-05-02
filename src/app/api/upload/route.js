import { uploadToS3 } from "@/lib/awsUpload";

export const POST = async (request) => {
  try {
    const formData = await request.formData();

    const singleFile = formData.get("file");
    if (singleFile) {
      const uploadedSingleFileUrl = await uploadToS3(singleFile);
      return Response.json(
        {
          message: "Single file uploaded successfully!",
          success: true,
          file: uploadedSingleFileUrl,
        },
        { status: 200 }
      );
    }

    const multipleFiles = formData.getAll("files");
    const urlArray = [];
    for (const file of multipleFiles) {
      const fileUrl = await uploadToS3(file);
      urlArray.push(fileUrl);
    }

    return Response.json(
      {
        message: "Files uploaded successfully!",
        success: true,
        files: urlArray,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on file upload:", error);
    return Response.json(
      {
        message: "Error on file upload!",
        success: false,
      },
      { status: 500 }
    );
  }
};
