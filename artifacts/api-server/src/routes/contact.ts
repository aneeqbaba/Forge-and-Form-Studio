import { Router, type IRouter } from "express";
import { SendContactBody, SendContactResponse } from "@workspace/api-zod";

const router: IRouter = Router();
const studioInbox = "aneeqbaba2002@gmail.com";
const resendSender = "Forge & Form <onboarding@resend.dev>";

router.post("/contact", async (req, res) => {
  const parsed = SendContactBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Please provide a name, valid email, and message." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    req.log.error("RESEND_API_KEY is not configured");
    res.status(502).json({ error: "Email delivery is not configured yet." });
    return;
  }

  const { name, email, interest } = parsed.data;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendSender,
        to: [studioInbox],
        reply_to: email,
        subject: `New Forge & Form visit request from ${name}`,
        text: [
          "New Forge & Form contact request",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          "What brings them in:",
          interest,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      req.log.error({ status: resendResponse.status }, "Resend rejected contact email");
      res.status(502).json({ error: "We couldn't send your note. Please try again." });
      return;
    }

    res.json(SendContactResponse.parse({ message: "Your note was sent successfully." }));
  } catch (error) {
    req.log.error({ err: error }, "Resend request failed");
    res.status(502).json({ error: "We couldn't send your note. Please try again." });
  }
});

export default router;