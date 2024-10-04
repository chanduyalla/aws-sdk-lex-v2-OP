const axios = require("axios");
const transporter = require("./mailer");

exports.handler = async (event) => {
  const api = `https://5346-183-82-1-214.ngrok-free.app`;
  const intentName = event.sessionState.intent.name;
  if (intentName === "CourseDetails") {
    const slots = event.sessionState.intent.slots;
    const searchTypeValue = slots.searchTypeValue.value.originalValue;
    const specificField = slots.specificType.value.originalValue;
    let courseId, courseName;
    if (slots.searchType.value.originalValue === "courseId") {
      courseId = searchTypeValue;
    } else if (slots.searchType.value.originalValue === "courseName") {
      courseName = searchTypeValue;
    }
    const courseDetailsData = await axios(`${api}/course-details`, {
      params: {
        courseId,
        courseName,
        field: specificField,
      },
    });
    const response = {
      sessionState: {
        dialogAction: {
          type: "Close",
        },
        intent: {
          name: intentName,
          state: "Fulfilled",
        },
      },
      messages: [
        courseDetailsData.data,
        {
          contentType: "ImageResponseCard",
          imageResponseCard: {
            title: "Is there anything else I can assist you with?",
            buttons: [
              {
                text: "Yes",
                value: "Yes, I want further assistance.",
              },
              {
                text: "No",
                value: "Goodbye",
              },
            ],
          },
        },
      ],
    };
    return response;
  } else if (intentName === "EnrollCourse") {
    const slots = event.sessionState.intent.slots;
    console.log("slots", slots);
    console.log("trans", transporter);
    const courseId = slots.courseId.value.originalValue;
    const courseData = await axios(`${api}/course-details`, {
      params: {
        courseId,
      },
    });
    const body = `Hello
                Please!! you can reset your password using the following link:
                <a href="#"> Reset Password</a>

                Your Course Details:
                ${courseData.data.imageResponseCard}
                
                You can enroll in this course directly from our website by clicking the link below:
                <a href="#">Enroll Now</a>

                Best regards,
                Enroll Buddy
                `;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: slots.toEmail.value.originalValue,
      subject: "Course Details, Password Reset, and Easy Enrollment Await You!",
      text: body,
    };
    console.log("mailOptions", mailOptions);
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.messageId);
      return {
        sessionState: {
          dialogAction: {
            type: "Close",
          },
          intent: {
            name: intentName,
            state: "Fulfilled",
          },
        },
        messages: [
          {
            contentType: "PalinText",
            content: `Course enrollment details have been successfully sent to your email. Please check your inbox, and if you don't see it, be sure to check your spam or junk folder.`,
          },
          {
            contentType: "ImageResponseCard",
            imageResponseCard: {
              title: "Is there anything else I can assist you with?",
              buttons: [
                {
                  text: "Yes",
                  value: "Yes, I want further assistance.",
                },
                {
                  text: "No",
                  value: "Goodbye",
                },
              ],
            },
          },
        ],
      };
    } catch (error) {
      return {
        sessionState: {
          dialogAction: {
            type: "Close",
          },
          intent: {
            name: intentName,
            state: "Failed",
          },
        },
        messages: [
          {
            contentType: "PlainText",
            content:
              "There was an error sending the email. Please try again later.",
          },
        ],
      };
    }
  }
};
