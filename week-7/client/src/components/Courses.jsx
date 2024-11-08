// courses code here
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./../styles.css";
// use axios here, similar to register and login
const Courses = () => {
  const [courses, setCourses] = useState(null);

  async function getCourses() {
    try {
      const response = await axios.get("http://localhost:3000/users/courses");

      if (response && response.data.AllCourses) {
        setCourses(response.data.AllCourses);
      } else {
        setCourses([]); // in case data is empty
      }
    } catch (error) {
      setCourses([]);
    }
  }
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="allCourses">
      {courses && courses.length > 0 ? (
        <ul>
          {console.log(courses.length)}
          {courses.map((course, index) => (
            <li itemType="square" key={course._id}>
              <h2>
                {index + 1} . {course.title}
              </h2>
              <p>{course.description}</p>
              <p>Price: Rs.{course.price}/-</p>
              <img src={course.imageLink} alt={course.title} width="200" />
              <p>{course.published ? "" : "Unpublished"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Loading... <button onClick={getCourses}>preview courses </button>
        </p>
      )}
    </div>
  );
};

export default Courses;
