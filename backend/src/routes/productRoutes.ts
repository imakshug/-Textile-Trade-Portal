import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Product routes - Coming soon' });
});
export default router;
