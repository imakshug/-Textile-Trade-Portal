import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Quotation routes - Coming soon' });
});
export default router;
