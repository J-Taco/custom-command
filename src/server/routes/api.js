import { Router } from "express";
import { getAll, save, remove } from '../../core/store.js';

const router = Router();

// Return all commands
router.get('/commands', (req, res) => {
    res.json(getAll());
});

// Create a command
router.post('/commands', (req, res) => {
    res.json(save(req.body.name, req.body));
});

// Delete a command
router.delete('/commands/:name', (req, res) => {
    remove(req.params.name);
    res.json({ success: true });
});

export default router;