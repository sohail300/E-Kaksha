import { User, Admin, Course } from '../db/model';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import {z} from "zod";
import { authenticate, secretKey } from '../middleware/auth'

const router = express.Router();

const signupInput = z.object({
    email: z.string().min(1, { message: "This field has to be filled." }).max(30).email("Please enter a valid email."),
    password: z.string().min(6, { message: "Minimum 6 characters."}).max(20),
  })
  
// Admin routes
router.post('/signup', async (req, res) => {
    try {
        const parsedInput = signupInput.safeParse(req.body);

        if (parsedInput.success === false) {
          return res.status(411).json({
            msg: parsedInput.error
          })
        }
    
        const email = parsedInput.data.email;
        const password = parsedInput.data.password;
    
        const user = await Admin.findOne({ email })

        if (user) {
            return res.status(403).send('User already Exists');
        } else {
            const obj = {
                "email": email,
                "password": password
            }
            const newAdmin = new Admin(obj);
            await newAdmin.save()
            console.log('Admin saved');
            
            const token = jwt.sign({ id: newAdmin._id, role: 'admin' }, secretKey, { expiresIn: '1h' })

            return res.status(201).json(token);
        }
    } catch (err) {
        return res.status(500).send({ 'Internal Error': err });
    }
});

router.post('/login', async (req, res) => {
    try {
        const parsedInput = signupInput.safeParse(req.body);

        if (parsedInput.success === false) {
          return res.status(411).json({
            msg: parsedInput.error
          })
        }
    
        const email = parsedInput.data.email;
        const password = parsedInput.data.password;
    
        const user = await Admin.findOne({ email, password })

        if (user) {
            const token = jwt.sign({ id: user._id, role: 'admin' }, secretKey, { expiresIn: '1h' })
            return res.status(200).json(token);
        } else {
            return res.status(403).send('Invalid Credentials');
        }
    } catch (err) {
        return res.status(500).send({ 'Internal Error': err });
    }
});

router.post('/courses', authenticate, async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        console.log(req.body);
        await newCourse.save();

        return res.status(201).send({ message: 'Course created successfully', courseId: newCourse.id })
    } catch (err) {
        return res.status(500).send({ 'Internal Error': err });
    }
});

// router.put('/courses/:courseId', authenticate, (req, res) => {

// });

router.get('/courses', authenticate, async (req, res) => {
    try {
        const courses = await Course.find();

        const obj = {
            "course": courses
        }
        return res.status(200).json(obj);
    } catch (err) {
        return res.status(500).send({ 'Internal Error': err });
    }
});

router.get('/courses/:id', authenticate, async (req, res) => {
    try {
        const id=req.params.id;
        const course = await Course.findById(id);

        const obj = {
            course
        }
        return res.status(200).json(obj);
    } catch (err) {
        return res.status(500).send({ 'Internal Error': err });
    }
});

export default router;