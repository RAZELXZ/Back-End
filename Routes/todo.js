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


router.put("/:toDoId/complete", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });
        if (!toDo) {
            return res.status(404).json({error: 'Could not find ToDo.'});
        }
        if (toDo.complete) {
            return res.status(400).json({error: 'ToDo is already completed.'});
        }
        const updatedToDo = await ToDo.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.toDoId,
            },
            {
                complete:true,
                completedAt: new Date(),
            },
            {
                new: true,
            }
        )
        return res.json(updatedToDo);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})

router.put("/:toDoId/Incomplete", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });
        if (!toDo) {
            return res.status(404).json({error: 'Could not find ToDo.'});
        }
        if (!toDo.complete) {
            return res.status(400).json({error: 'ToDo is already Incompleted.'});
        }
        const updatedToDo = await ToDo.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.toDoId,
            },
            {
                complete: false,
                completedAt: null,
            },
            {
                new: true,
            }
        )
        return res.json(updatedToDo);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})


router.put("/:toDoId", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });
        if (!toDo) {
            return res.status(404).json({error: 'Could not find ToDo.'});
        }
        const {isValid, errors} = validateTodoInput(req.body);
        if (!isValid) return res.status(400).json(errors);
        const updatedToDo = await ToDo.findOneAndUpdate(
            {
                user: req.user._id,
                _id: req.params.toDoId,
            },
            {
                content: req.body.content,
            },
            {
                new: true,
            }
        )
        return res.json(updatedToDo);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})

router.delete("/:toDoId", requiresAuth, async (req, res) => {
    try {
        const toDo = await ToDo.findOne({
            user: req.user._id,
            _id: req.params.toDoId,
        });
        if (!toDo) {
            return res.status(404).json({error: 'Could not find ToDo.'});
        }
        await ToDo.findOneAndDelete(
            {
                user: req.user._id,
                _id: req.params.toDoId,
            },
        )
        return res.json({success: true});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
})

module.exports = router;