import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

function UpdateSettings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate('/profile/accountsettings');
  };

  return (
    <Container>
      <Wrapper>
        <Title>UPDATE DETAILS</Title>
        <Form>
          <Input placeholder="first name" />
          <Input placeholder="last name" />
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="phone no." />
          <Input type="password" placeholder="current password" onChange={(e) => setCurrentPassword(e.target.value)} />
          <Input type="password" placeholder="new password" onChange={(e) => setNewPassword(e.target.value)} />
          <Input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />

          <Agreement>
            Update the details you want to change otherwise leave it blank. Creating new password requires <b>current password</b>
          </Agreement>
          <Button onClick={handleUpdateClick}>UPDATE DETAILS</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default UpdateSettings;
