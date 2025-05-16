"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ReportData {
  name: string;
  subject: string;
  description: string;
}

const subjectsMap: Record<string, string> = {
  "1": "Report Bug",
  "2": "Contact Support",
  "3": "Feature Request",
  "4": "General Inquiry",
};

export async function sendReportEmail(data: ReportData) {
  const fullSubject = `PersonalTaskManager - ${subjectsMap[data.subject] || "Unknown Subject"} - by ${data.name}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "mahdiasadi140@gmail.com",
      subject: fullSubject,
      text: data.description,
    });

    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}
