import nodemailer from "nodemailer";

export const POST = async (req) => {
    const { fullName, email, phone, address, jobprofile } = await req.json();

    if (!fullName || !email || !phone || !address || !jobprofile) {
        return new Response(JSON.stringify({ success: false, message: "All fields are required." }), {
            status: 400,
        });
    }

    try {
        // Email the form data
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending form data to the email used for OTP
            subject: "Job Enquiry",
            html: `
          <h2>New Job Enquiry</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Job Profile:</strong> ${jobprofile}</p>
        `,
        });

        return new Response(
            JSON.stringify({ success: true, message: "Job request submitted successfully." }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error submitting job request:", error);
        return new Response(JSON.stringify({ success: false, message: "Failed to submit job request." }), {
            status: 500,
        });
    }
};

