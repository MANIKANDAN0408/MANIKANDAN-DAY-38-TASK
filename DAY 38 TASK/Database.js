//Design Database for zen class programme

//Databse for Users

db.users.insertMany([
  {
    userid: 1,
    name:  "raje",
    email: "raje@gmail.com",
    mentorid: 1,
  },
  {
    userid: 2,
    name:  "manoj",
    email: "manoj@gmail.com",
    mentorid: 2,
  },
  {
    userid: 3,
    name:  "rahul",
    email: "rahul@gmail.com",
    mentorid: 3,
  },
  {
    userid: 4,
    name:  "subbu",
    email: "subbu@gmail.com",
    mentorid: 4,
  },
  {
    userid: 5,
    name:  "vijay",
    email: "vijay@gmail.com",
    mentorid: 5,
  },
]);




//Database for Codekata

db.codekata.insertMany([
  {
    userid: 1,
    problems: 3,
  },
  {
    userid: 2,
    problems: 7,
  },
  {
    userid: 3,
    problems: 9,
  },
  {
    userid: 4,
    problems: 12,
  },
  {
    userid: 5,
    problems: 14,
  },
]);  





//Database for  Attendance

db.attendance.insertMany([
  {
    userid: 1,
    topicid: 1,
    attended: true,
  },
  {
    userid: 2,
    topicid: 2,
    attended: false,
  },
  {
    userid: 3,
    topicid: 3,
    attended: true,
  },
  {
    userid: 4,
    topicid: 4,
    attended: false,
  },
  {
    userid: 5,
    topicid: 5,
    attended: true,
  },
]);





//Database for Topics

db.topics.insertMany([
  {
    topicid: 1,
    topic: "React.js",
    topic_date: new Date("4-AUG-2022"),
  },
  {
    topicid: 2,
    topic: "Node.js",
    topic_date: new Date("15-AUG-2022"),
  },
  {
    topicid: 3,
    topic: "MongoDB",
    topic_date: new Date("25-AUG-2022"),
  },
  {
    topicid: 4,
    topic: "Express.js",
    topic_date: new Date("01-SEP-2022"),
  },
  {
    topicid: 5,
    topic: "HTML & CSS",
    topic_date: new Date("10-SEP-2022"),
  },
]);




//Database for Tasks

db.tasks.insertMany([
  {
    taskid:  1,
    topicid: 1,
    userid:  1,
    task:    "React task",
    due_date: new Date("6-AUG-2022"),
    submitted: true,
  },
  {
    taskid:  2,
    topicid: 2,
    userid:  2,
    task: "Node task",
    due_date: new Date("17-AUG-2022"),
    submitted: true,
  },
  {
    taskid:  3,
    topicid: 3,
    userid:  3,
    task: "MongoDB task",
    due_date: new Date("26-AUG-2022"),
    submitted: false,
  },
  {
    taskid:  4,
    topicid: 4,
    userid:  4,
    task: "Express task",
    due_date: new Date("02-SEP-2022"),
    submitted: false,
  },
  {
    taskid:  5,
    topicid: 5,
    userid:  5,
    task: "HTML & CSS task",
    due_date: new Date("13-SEP-2022"),
    submitted: false,
  },
]);





//Database for Company Drives

db.companydrives.insertMany([
  {
    userid: 1,
    drive_date: new Date("15-NOV-2022"),
    company: "Toyota",
  },
  {
    userid: 1,
    drive_date: new Date("19-NOV-2022"),
    company: "Hyundai",
  },
  {
    userid: 2,
    drive_date: new Date("23-NOV-2022"),
    company: "Jaguar",
  },
  {
    userid: 3,
    drive_date: new Date("2-DEC-2022"),
    company: "TATA",
  },
  {
    userid: 4,
    drive_date: new Date("7-DEC-2022"),
    company: "kia",
  },
]);






//Database for  Mentors

db.mentors.insertMany([
  {
    mentorid: 1,
    mentorname: "Harris",
    mentor_email: "harris@gmail.com",
  },
  {
    mentorid: 2,
    mentorname: "Deva",
    mentor_email: "deva@gmail.com",
  },
  {
    mentorid: 3,
    mentorname: "Bharathwaj",
    mentor_email: "bharathwaj@gmail.com",
  },
  {
    mentorid: 4,
    mentorname: "Vidhyasagar",
    mentor_email: "vidhyasagar@gmail.com",
  },
  {
    mentorid: 5,
    mentorname: "Rajkumar",
    mentor_email: "rajkumar@gmail.com",
  },
]);







// 1.Find all the topics and tasks which are thought in the month of October

db.topics.aggregate([

  {
    $lookup: {
      from: "tasks",
      localField: "topicid",
      foreignField: "topicid",
      as: "taskinfo",

    }, 
  },

  {
    $match: {
      $and: [
        {
          $or: [{ topic_date: { $gt: new Date("30-sep-2020") } },

          { topic_date: { $lt: new Date("1-nov-2020") } }],
        },

        {
          $or: [
            { "taskinfo.due_date": { $gt: new Date("30-sep-2020") } },

            { "taskinfo.due_date": { $lt: new Date("1-nov-2020") } },
          ],
        },
      ],
    },
  },
]);



// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.companydrives.find({

  $or: [{ drive_date: { $gte:new Date("15-oct-2020") } },

  { drive_date: { $lte: new Date("31-0ct-2020") } }],

});



// 3.Find all the company drives and students who are appeared for the placement

db.companydrives.aggregate([

  {
    $lookup: {
    from: "users",
    localField: "userid",
    foreignField: "userid",
    as: "userinfo",
    },
  },

  {
    $project: {
      _id: 0,
      "userinfo.name": 1,
      company: 1,
      drive_date: 1,
      "userinfo.email": 1,
      "userinfo.userid": 1,
    },
  },
]);



// 4.Find the number of problems solved by the user in codekata

db.codekata.aggregate([

  {
    $lookup: {
    from: "users",
    localField: "userid",
    foreignField: "userid",
    as: "userinfo",
    },
  },

  {
    $project: {
      _id: 0,
      userid: 1,
      problems: 1,
      "userinfo.name": 1,
    },
  },
]);



// 5.Find all the mentors with who has the mentee's count more than 15

db.users.aggregate([

  {
    $lookup: {
    from: "mentors",
    localField: "mentorid",
    foreignField: "mentorid",
    as: "mentorInfo",
    },
  },

  {
    $group: {
      _id: {
        mentorid: "$mentorInfo.mentorid",
        mentorname: "$mentorInfo.mentorname",
      },

      mentee_count: { $sum:1 },

    },
  },

  { $match: { mentee_count: { $gt:15 } } },

]);



// 6.Find number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020


db.attendance.aggregate([

  {
    $lookup: {
    from: "topics",
    localField: "topicid",
    foreignField: "topicid",
    as: "topics",
    },
  },

  {
    $lookup: {
    from: "tasks",
    localField: "topicid",
    foreignField: "topicid",
    as: "tasks",
    },
  },

    { $match: { $and: [{ attended:false }, 

    { "tasks.submitted":false }] } },
   
  {
    $match: {
      $and: [
        {
          $or: [
            { "topics.topic_date": { $gte:new Date("15-oct-2020") } },

            { "topics.topic_date": { $lte:new Date("31-oct-2020") } },
          ],
        },

        {
          $or: [
            { "tasks.due_date": { $gte:new Date("15-oct-2020") } },
            
            { "tasks.due_date": { $lte:new Date("31-oct-2020") } },
          ],
        },
      ],
    },
  },

  {
    $count: "No_of_students_absent",
  },

]);