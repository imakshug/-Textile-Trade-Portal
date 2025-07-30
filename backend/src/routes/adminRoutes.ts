import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Admin routes - Coming soon' });
});
export default router;
