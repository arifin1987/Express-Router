const express = require('express') 
const db = require('../db')

const router = express.Router();


const studentList = (req, res)=>{
    db.getDbStudents()
    .then(students=> res.send(students))
    
}

const newStudent = (req, res)=>{
    const student = req.body;
    db.getDbStudents()
    .then(students=>{
        students.push(student);
        db.insertDbStudent(students)
        .then(students=>res.send(students))
    })
}

const studentDetail = (req, res)=>{
    const id= parseInt(req.params.id);
    db.getDbStudents()
    .then(students=>{
        const student = students.find(s=>s.id ===id)
        if(!student) res.status(404).send("requested id not found")
        else res.send(student);
    })
}

const studentUpdate= (req, res)=>{
    const id = parseInt(req.params.id);
    const upDatedData = req.body;
    db.getDbStudents()
    .then(students=>{
        const student = students.find(s=>s.id ===id)
        if(!student) res.status(404).send("requested id not found");
        else{
            const i = students.findIndex(s=>s.id===id);
            students[i]= upDatedData;
            db.insertDbStudent(students)
            .then(msg=> res.send(upDatedData))
        }
    })
    
}

const studentDelete = (req, res)=>{
    const id = parseInt(req.params.id)
    db.getDbStudents()
    .then(students=>{
        const student = students.find(s=>s.id===id)
        if(!student) res.status(404).send("requested id not found");
        else{
            upDatedStudent = students.filter(s=>s.id !==id)
            db.getDbStudents(upDatedStudent)
            .then(students=>res.send(upDatedStudent))

        }
    })
}

router.route('/').get(studentList).post(newStudent)
router.route('/:id').get(studentDetail).put(studentUpdate).delete(studentDelete)


module.exports = router;