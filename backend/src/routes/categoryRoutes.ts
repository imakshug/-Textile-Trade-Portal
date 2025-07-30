import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Category routes - Coming soon' });
});
export default router;
