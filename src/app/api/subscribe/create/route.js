import dbConnect from "@/lib/dbConnect";
import SubscribeModel from "@/model/subscribeModel";

export async function POST(req) {

    await dbConnect();

    try {

        const { email, mobile } = await req.json();

        const SubscribeCreate = await SubscribeModel.create(
            { email, mobile }
        )

        return Response.json(
            {
                message: "Subscribetion Created Successfully!",
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
                message: "Subscribetion Not Created!",
                success: false
            },
            {
                status: 400
            }
        )
    }

}