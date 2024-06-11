import React, { useEffect, useState } from "react";
import styled from "styled-components";


const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  font-weight: 600;
`;

const CourseList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CourseCard = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const RecommendedCourses = ({ category }) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch("/list.json")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  useEffect(() => {
    if (category) {
      const filtered = courses.filter((course) =>
        course.category === category
      );
      setFilteredCourses(filtered);
    }
  }, [category, courses]);

  return (
    
    <Container>
      <Title>Recommended Courses</Title>
      <CourseList>
        {filteredCourses.map((course) => (
          <CourseCard key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <img src={course.image} alt={course.title} style={{ width: "100%", borderRadius: "8px" }} />
            <p><strong>Category:</strong> {course.category}</p>
            <a href={course.url} target="_blank" rel="noopener noreferrer">Go to Course</a>
          </CourseCard>
        ))}
      </CourseList>
      
    </Container>
  );
};

export default RecommendedCourses;
