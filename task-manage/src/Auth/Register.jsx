import { Button, Input, Option, Stack } from "@mui/joy";
import Select, { selectClasses } from "@mui/joy/Select";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("https://task-lake.vercel.app/signup", {
          email: email, 
          password: password,
        });
  
        console.log(response.data);
        alert('Register Succesfully')
        navigate("/")
  
      } catch (error) {
        console.error("Error registering user:", error.message);
      }
    };
  

  return (
    <div className="container p-4">
      <div className=" w-100 md:flex justify-center " style={{marginTop:"60px"}}>
        <div>
          <div
            className="fw-bold mt-2 mb-5"
            style={{
              position: "relative",
              fontSize: "30px",
              fontStyle: "normal",
              lineHeight: "-0.3px",
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(90deg, #C63AC0 0%, #518EF8 70%, #2F6CE5 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
            >
              Hello! Register to get started
            </span>
          </div>

          <form className="" onSubmit={handleSubmit}>
            <Input
              size="lg"
              placeholder="Email Id"
              value={email}
              style={{marginBottom:"10px"}}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              placeholder="Password"
              style={{marginBottom:"10px"}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mb-4">
              <Button
                type="submit"
                style={{
                  position: "relative",
                  fontStyle: "normal",
                  lineHeight: "-0.3px",
                  background:
                    "linear-gradient(90deg, #C63AC0 0%, #518EF8 70%, #2F6CE5 100%)",
                }}
                fullWidth
              >
                <div
                  style={{
                    color: "white",
                    WebkitBackgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  Register
                </div>
              </Button>
            </div>
          </form>
         
          <div  style={{ textDecoration: "none", cursor:"pointer" }}>
            <div className="text-center my-2" onClick={() => navigate('/')} >
              Already have an account?{" "}
              <span style={{ color: "#35C2C1", fontWeight: "700" }}>
                Login Now
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
