import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BiLogoGoogle, BiLogoGithub } from "react-icons/bi";
import { useDispatch } from "react-redux";
import PasswordReset from "./PasswordReset";
import {
  emailLogin,
  emailSignup,
  githubLogin,
  googleLogin,
} from "../features/UserAuthSLice";

// -----Styling Start-----

const move = keyframes`
    0%{
        opacity:0;
    
    }
    95%{
        opacity:1;
    
    }

    `;
const BackgroundBox = styled.div`
  background-color: #beeefb;
  height: 600px;
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-inline: auto;
  margin-top: 7rem;

  position: relative;
  border-radius: 23px;
  border: 1px solid #053271;

  .text1 {
    display: ${(props) => (props.windowWidth < 1024 ? "none" : "flex")};
    z-index: ${(props) => (props.clicked ? "-700" : "700")};
    transform: ${(props) =>
      props.clicked ? "translateX(0)" : "translateX(100%)"};
    transition: transform 1s ease-in-out;
    animation: ${(props) => (props.clicked ? move : "none")} 1.5s;
  }

  .text2 {
    display: ${(props) => (props.windowWidth < 1024 ? "none" : "flex")};
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    animation: ${(props) => (props.clicked ? "none" : move)} 1.5s;

    transform: ${(props) =>
      props.clicked ? "translateX(-100%)" : "translateX(0%)"};
    transition: transform 1s ease-in-out;
  }

  .signin {
    position: absolute;
    top: 0%;
    left: ${(props) => (props.windowWidth < 1024 ? 50 : 30)}%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-50%)")};
    transition: all 1s;
  }
  .signup {
    position: absolute;
    top: 0%;
    right: ${(props) => (props.windowWidth < 1024 ? 50 : 30)}%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-500")};
    transform: ${(props) => (props.clicked ? "translateX(50%)" : "none")};
    transition: all 1s;
  }
`;

const Box1 = styled.div`
  background-color: #f1fdcd;
  width: ${(props) => (props.windowWidth < 1024 ? 80 : 50)}%;
  height: 100%;
  position: ${(props) => (props.windowWidth < 1024 ? "relative" : "absolute")};
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked
      ? props.windowWidth > 1024
      ? "translateX(90%)"
      : "translateX(0%)"
      : props.windowWidth > 1024
      ? "translateX(10%)"
      : "translateX(0%)"};

  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f1fdcd;

    z-index: -200;
  }

  &::before {
    top: 3rem;
    border-radius: 23px;
    border: 4px solid #053271;
  }

  &::after {
    bottom: 3rem;
    border-radius: 23px 23px 0 0;
    border-top: 4px solid #053271;
    border-right: 4px solid #053271;
    border-left: 4px solid #053271;
  }
`;

const Box2 = styled.div`
  background-color: #053271;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  display: ${(props) => (props.windowWidth < 1024 ? "none" : "block")};

  z-index: 600;
  transform: ${(props) =>
    props.clicked ? "translateX(-122%)" : "translateX(0%)"};
  transition: transform 1s;

  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;
  width: 100%;

  /* z-index: 100; */
`;

const Input = styled.input`
  background-color: #fff;
  border: none;
  border-bottom: 2px solid #053271;
  border-radius: 8px;

  padding: 1rem 1rem;
  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 2px solid #053271;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: #1438db;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 7px #999;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;

    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  font-size: 1.4rem;
  margin: 0.3rem 0;
`;

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;
  display: ${(props) => (props.windowWidth < 1024 ? "none" : "block")};

  right: ${(props) => (props.clicked ? "52%" : "42%")};

  transform: ${(props) => (props.clicked ? "rotate(360deg)" : "rotate(0)")};

  transition: all 1.5s;
  background-color: transparent;

  &::before {
    content: "😜";
    font-size: 4rem;
  }

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;

  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 110%;
    font-size: 5rem;
  }
`;
// -----Styling End-----

function FormComponent() {
  const [click, setClick] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("Amit");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  const SignUpUser = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await dispatch(emailSignup({ email, password, name })).unwrap();
    } else console.log("Password is not equal to ConfirmPassword");
  };

  const signInWithEmailUser = async (e) => {
    e.preventDefault();
    await dispatch(emailLogin({ email, password })).unwrap();
  };

  const signInWithGoogleUser = async (e) => {
    e.preventDefault();
    setIsOpen(false);
    await dispatch(googleLogin()).unwrap();
  };

  const signInWithGithubUser = async (e) => {
    e.preventDefault();
    setIsOpen(false);
    await dispatch(githubLogin()).unwrap();
  };

  const handleClick = () => {
    setClick(!click);
    setIsOpen(false);
  };
  return (
    <div className="lg:h-[620px] my-22 w-full bg-gray-950 z-1">
      {" "}
      <BackgroundBox clicked={click} windowWidth={windowWidth}>
        <ButtonAnimate
          clicked={click}
          onClick={handleClick}
          windowWidth={windowWidth}
        ></ButtonAnimate>

        <Form className="signin max-w-[500px]" windowWidth={windowWidth}>
          <Title>Login</Title>
          <Input
            type="email"
            name="email"
            id="emailIdLogin"
            placeholder="Email"
            className="text-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            name="password"
            id="passwordIdLogin"
            placeholder="Password"
            className="text-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex flex-col my-2">
            <Link className="hover:text-blue-600 hover:underline transition-all duration-300">
              <PasswordReset isOpen={isOpen} setIsOpen={setIsOpen} />
            </Link>
            {windowWidth < 1024 && (
              <p className="sm:text-2xl text-lg">
                Don't have an account?{" "}
                <span onClick={handleClick} className="text-blue-600 hover:text-blue-500 hover:underline transition-all duration-300">Register</span>
              </p>
            )}
          </div>

          <Button
            type="submit"
            onClick={signInWithEmailUser}
            className="transition-all duration-300"
          >
            Sign In
          </Button>

          <div className="mt-4 flex gap-4">
            <button type="submit" onClick={signInWithGoogleUser}>
              <BiLogoGoogle size={48} className="cursor-pointer" />
            </button>
            <button type="submit" onClick={signInWithGithubUser}>
              <BiLogoGithub size={48} className="cursor-pointer" />
            </button>
          </div>
        </Form>

        <Form className="signup max-w-[500px]">
          <Title>Signup</Title>

          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="text-lg"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            name="email"
            id="emailIdSignup"
            placeholder="Email"
            className="text-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            name="password"
            id="passwordIdSignup"
            placeholder="Set Password"
            className="text-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            name="password"
            id="confirmPasswordIdSignup"
            placeholder="Confirm Password"
            className="text-lg"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Link
            to="/auth"
            onClick={handleClick}
            className="cursor-pointer hover:text-blue-600 transition-all duration-300"
          >
            Already have an Account?
          </Link>
          <Button
            type="submit"
            onClick={SignUpUser}
            className="transition-all duration-300"
          >
            Sign Up
          </Button>
        </Form>

        <Text
          className="text1 absolute right-[40%] max-w-[500px]"
          clicked={click}
        >
          <h1>Welcome!</h1>
          Don't have an account?
          <br />
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon">⤶</span>
        </Text>

        <Text
          className="text2 absolute left-[40%] max-w-[500px]"
          clicked={click}
        >
          <h1>Hi There!</h1>
          Already have an account?
          <br />
          <span className="attention">Click on Emoji</span>
          <span className="attention-icon">⤷</span>
        </Text>

        <Box1 clicked={click} windowWidth={windowWidth} />
        <Box2 clicked={click} windowWidth={windowWidth} />
      </BackgroundBox>
    </div>
  );
}

export default FormComponent;
