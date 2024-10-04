const express = require("express");
const app = express();
const port = 8000;

//dummy data
const courseData = [
  {
    courseId: "C101",
    courseName: "Introduction to Python",
    instructor: "Padma",
    duration: "6 weeks",
    department: "Programming",
    description:
      "Learn the basics of Python programming, including syntax, data structures, and basic algorithms.",
    price: "$299",
  },
  {
    courseId: "C102",
    courseName: "Web Development with React",
    instructor: "Padma",
    duration: "8 weeks",
    department: "Web Development - Front End",
    description:
      "Master the fundamentals of web development using React.js, with hands-on projects.",
    price: "$399",
  },
  {
    courseId: "C103",
    courseName: "Advanced Node.js Development",
    instructor: "Sasanka",
    duration: "10 weeks",
    department: "Web Development - Back End",
    description:
      "Dive deep into Node.js with this advanced course focusing on building scalable applications.",
    price: "$499",
  },
  {
    courseId: "C104",
    courseName: "React Native for Mobile Development",
    instructor: "Sasanka",
    duration: "8 weeks",
    department: "Mobile Development",
    description:
      "Learn to build mobile applications using React Native, a popular framework for cross-platform development.",
    price: "$450",
  },
  {
    courseId: "C105",
    courseName: "Building Chatbots with Amazon Lex",
    instructor: "Chandrika",
    duration: "6 weeks",
    department: "Artificial Intelligence",
    description:
      "Explore the fundamentals of building conversational interfaces using Amazon Lex.",
    price: "$349",
  },
  {
    courseId: "C106",
    courseName: "Full Stack Development with React and Node.js",
    instructor: "Devi",
    duration: "12 weeks",
    department: "Web Development - Full Stack",
    description:
      "Become a full-stack developer by mastering both front-end and back-end technologies with React and Node.js.",
    price: "$599",
  },
  {
    courseId: "C107",
    courseName: "React.js Best Practices",
    instructor: "Devi",
    duration: "5 weeks",
    department: "Web Development - Front End",
    description:
      "Enhance your React skills by learning best practices for building robust and maintainable applications.",
    price: "$299",
  },
  {
    courseId: "C108",
    courseName: "Scaling Applications with Node.js",
    instructor: "Padma",
    duration: "8 weeks",
    department: "Web Development - Back End",
    description:
      "Learn techniques for scaling Node.js applications to handle large-scale traffic and complex architectures.",
    price: "$499",
  },
  {
    courseId: "C109",
    courseName: "Cross-Platform Apps with React Native",
    instructor: "Sasanka",
    duration: "7 weeks",
    department: "Mobile Development",
    description:
      "Build high-performance cross-platform mobile apps using React Native and JavaScript.",
    price: "$399",
  },
  {
    courseId: "C110",
    courseName: "Amazon Lex: Creating Voice and Text Bots",
    instructor: "Prasanna",
    duration: "5 weeks",
    department: "Artificial Intelligence",
    description:
      "A hands-on course to create and deploy voice and text-based chatbots using Amazon Lex.",
    price: "$349",
  },
  {
    courseId: "C111",
    courseName: "Data Structures and Algorithms with Python",
    instructor: "Padma",
    duration: "8 weeks",
    department: "Programming",
    description:
      "Master essential data structures and algorithms using Python, with a focus on problem-solving and optimization.",
    price: "$399",
  },
  {
    courseId: "C112",
    courseName: "JavaScript Fundamentals",
    instructor: "Chandrika",
    duration: "6 weeks",
    department: "Web Development - Front End",
    description:
      "Learn the core concepts of JavaScript, the language that powers the web, with a focus on practical applications.",
    price: "$299",
  },
  {
    courseId: "C113",
    courseName: "Backend Development with Express.js",
    instructor: "Devi",
    duration: "8 weeks",
    department: "Web Development - Back End",
    description:
      "Build robust and scalable backend applications using Express.js and Node.js, with a focus on RESTful APIs.",
    price: "$450",
  },
  {
    courseId: "C114",
    courseName: "Machine Learning Basics",
    instructor: "Sasanka",
    duration: "10 weeks",
    department: "Artificial Intelligence",
    description:
      "An introduction to machine learning concepts, including supervised and unsupervised learning techniques.",
    price: "$499",
  },
];

const courseDepartments = [
  "Programming",
  "Web Development - Front End",
  "Web Development - Back End",
  "Mobile Development",
  "Artificial Intelligence",
  "Web Development - Full Stack",
];

const instructorsData = [
  {
    name: "Padma",
    courses: [
      "Introduction to Python",
      "React.js Best Practices",
      "Data Structures and Algorithms with Python",
      "Scaling Applications with Node.js",
    ],
    qualification:
      "Expert in Python and JavaScript with extensive experience in web development and scaling applications",
  },
  {
    name: "Sasanka",
    courses: [
      "Advanced Node.js Development",
      "React Native for Mobile Development",
      "Cross-Platform Apps with React Native",
      "Machine Learning Basics",
    ],
    qualification:
      "Specialist in Node.js, React Native, and Machine Learning with a focus on scalable and cross-platform applications",
  },
  {
    name: "Chandrika",
    courses: ["Building Chatbots with Amazon Lex", "JavaScript Fundamentals"],
    qualification:
      "Experienced in building conversational interfaces and JavaScript with a background in artificial intelligence and frontend development",
  },
  {
    name: "Devi",
    courses: [
      "Full Stack Development with React and Node.js",
      "React.js Best Practices",
      "Backend Development with Express.js",
    ],
    qualification:
      "Full-stack developer with expertise in both frontend and backend technologies, including React, Node.js, and Express.js",
  },
  {
    name: "Prasanna",
    courses: ["Amazon Lex: Creating Voice and Text Bots"],
    qualification:
      "Expert in creating and deploying voice and text-based chatbots with Amazon Lex",
  },
];

const supportContact = {
  phone: "+1-800-123-4567",
  email: "support@enrollbuddy.com",
  workingHours: "Mon-Fri, 9 AM - 5 PM",
};

app.get("/courses", (req, res) => {
  res.json(courseData);
});

app.get("/departments", (req, res) => {
  res.json(courseDepartments);
});

app.get("/course-details", (req, res) => {
  const { courseId, courseName, field } = req.query;
  let course;
  if (courseId) {
    course = courseData.find((c) => c.courseId === courseId);
  } else if (courseName) {
    course = courseData.find((c) => c.courseName === courseName);
  }
  if (course) {
    if (field !== "all") {
      if (course[field]) {
        res.json({
          contentType: "PlainText",
          content: `the ${field} of course ${courseId || courseName} is ${
            course[field]
          }`,
        });
      } else {
        res.json({
          contentType: "PlainText",
          content: `${field}' does not exist for this course`,
        });
      }
    } else {
      res.json({
        contentType: "ImageResponseCard",
        imageResponseCard: {
          title: "Course Details",
          subtitle: `COURSE ID: ${course.courseId}\nCOURSE NAME: ${course.courseName}\nInstructor: ${course.instructor}\nDuration: ${course.duration}\nDepartment: ${course.department}\nDescription: ${course.description}\nPrice: ${course.price}`,
        },
      });
    }
  } else {
    res.status(404).send("Course not found");
  }
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
