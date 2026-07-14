import { Router } from "express";
import { getAll, save, remove, update, getOne } from '../../core/store.js';

const router = Router();

// Return all commands
router.get('/commands', (req, res) => {
    res.json(getAll());
});

router.get('/commands/:name', (req, res) => {
    res.json(getOne(req.params.name));
});

// Create a command
router.post('/commands', (req, res) => {
    res.json(save(req.body.name, req.body));
});

router.put('/commands/:name', (req, res) => {
    res.json(update(req.params.name, req.body));
});

// Delete a command
router.delete('/commands/:name', (req, res) => {
    remove(req.params.name);
    res.json({ success: true });
});

export default router;