// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   if (!email) {
//     return NextResponse.json(
//       { message: "Email is required" },
//       { status: 400 }
//     );
//   }

//   // Generate 8-digit OTP
//   const otp = Math.floor(10000000 + Math.random() * 90000000).toString();

//   try {
//     await resend.emails.send({
//       from: "Yuva Udyam <onboarding@resend.dev>", // works in dev
//       to: email,
//       subject: "Your Yuva Udyam Login Code",
//       html: `
//         <div style="font-family:sans-serif">
//           <h2>Your Login Code</h2>
//           <p style="font-size:24px;font-weight:bold">${otp}</p>
//           <p>This code expires in 5 minutes.</p>
//         </div>
//       `,
//     });

//     // ⚠️ For now we return otp (for testing)
//     return NextResponse.json({ otpId: otp });

//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }
