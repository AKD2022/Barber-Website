export default function handler(req, res) {
    if (req.method === "POST") {
        const { password } = req.body;

        const correctPassword = process.env.ADMIN_PW; // Stored securely in Vercel

        if (password === correctPassword) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
    }

    res.status(405).json({ message: "Method Not Allowed" });
}
