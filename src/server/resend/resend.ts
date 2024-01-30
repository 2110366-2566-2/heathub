import { env } from "@/env";
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_API_KEY);

export async function sendResetPasswordEmail(
  email: string,
  token: string,
  url: string,
) {
  const path = `/reset-password/${token}`;
  url = new URL(path, url).toString();
  console.log("Sending email to", email, "with url", url);
  const res = await resend.emails.send({
    from: "noreply@heathub.pkpt.dev",
    to: email,
    subject: "Reset your password",
    html: `<h1>Resetting your password</h1> <p>Click <a href="${url}">here</a> to reset your password.</p> <p>Or copy and paste this link into your browser: ${url}</p>`,
  });

  console.log("Email sent", res);
}
