import React, { useState } from "react";
import { Button, Input } from "@mui/joy";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://task-lake.vercel.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(" Login Successfully")
      navigate("/dashboard")
      if (response.ok) {
        console.log("Login successful");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(" Login Failed")

    }
  };

  return (
    <div className="container p-4 ">
      <div className=" w-100 md:flex justify-center " style={{marginTop:"60px"}}>
        <div>
          <div
            className="font-bold mt-2 mb-5"
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
              Welcome back! Please Login
            </span>
          </div>

          <form className="" onSubmit={handleSubmit}>
            <Input
              size="lg"
              placeholder="Enter your email id"
              className=""
              style={{marginBottom:"10px"}}
              type="email"
              name="email" // Changed from "username" to "email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              size="lg"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            
              className="mb-2"
            />

            <div className="mb-4 mt-4">
              <Button
                type="submit"
                size="lg"
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
                  Login
                </div>
              </Button>
            </div>
          </form>
          <div>
            
           
            <div style={{ textDecoration: "none", cursor:"pointer" }}>
              <div className="text-center mt-5" onClick={() => navigate('/register')}>
                Already have an account?{" "}
                <span style={{ color: "#35C2C1", fontWeight: "700" }}>
                  Register Now
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
