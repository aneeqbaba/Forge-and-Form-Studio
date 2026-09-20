import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    console.log("New contact message:", { name, email, message });

    // Yahan aapka email ka logic tha, usko baad me lagayenge
    
    return res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Contact error:", error);
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

export default router;
