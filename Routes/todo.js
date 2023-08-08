const express = require('express');
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permission");
const validateTodoInput = require("../validation/todoValidation");

router.get("/test", (req, res) => {
    res.send("ToDo route is working.");
})



router.post("/new", requiresAuth, async (req, res) => {
    try {
        const {errors, isValid} = validateTodoInput(req.body);
        if (!isValid) return res.status(400).json(errors);
        const newTodo = new ToDo({
            user: req.user._id,
            conplete: false,
            content: req.body.content,
        })

        await newTodo.save();
        return res.json(newTodo);

    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})

router.post("/current", requiresAuth, async (req, res) => {
    try {
        const completeTodos = await ToDo.find({
            user: req.user._id,
            complete: true,
        }).sort({completeAt: -1});
        const IncompleteTodos = await ToDo.find({
            user: req.user._id,
            complete: false,
        }).sort({createdAt: -1});
        return res.json({completeTodos: completeTodos, IncompleteTodos: IncompleteTodos});

    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})

module.exports = router;