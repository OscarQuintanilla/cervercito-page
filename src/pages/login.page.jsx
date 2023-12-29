import { supabase } from "../../supabase/client";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMethod, setLoginMethod] = useState("email");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [hasAnAccount, setHasAnAccount] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginMethod == "email") {
      try {
        // Email login
        await supabase.auth.signInWithOtp({
          email,
          options: { redirectTo: "http://127.0.0.1:5173/" },
        });
        setIsEmailSent(true);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      try {
        const response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (response.error) {
          console.log("Error: ", response.error);
        } else {
          console.log("Response: ", response.data);
          if (response.data) {
            login(response.data);
          }
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  const handleSingUp = async (e) => {
    e.preventDefault();
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });
      console.log(response);
      setIsEmailSent(true);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const changeMethod = (e) => {
    e.preventDefault();
    if (loginMethod == "email") {
      setLoginMethod("password");
      setDisplayPassword(true);
    } else {
      setLoginMethod("email");
      setDisplayPassword(false);
    }
  };

  const handleSwtichToSignUp = (e) => {
    e.preventDefault();
    if (hasAnAccount) {
      setHasAnAccount(false);
    } else {
      setHasAnAccount(true);
    }
  };

  const loginForm = () => {
    return (
      <div className="flex flex-col justify-center bg-white rounded-md py-12 w-2/5 mx-auto px-8">
        <h1 className="text-3xl text-center mb-6">
          {loginMethod == "email"
            ? "Get access with your email"
            : "Login with password"}
        </h1>
        <form className="flex flex-col">
          <div>
            <label htmlFor="email" className="mt-5 w-full">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border-2 border-gray-400 rounded-md p-2 w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`mt-2 ${displayPassword ? "block" : "hidden"}`}>
            <label htmlFor="password" className=" mt-5">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-2 border-gray-400 rounded-md p-2 w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="justify-center text-center">
            <button
              className="bg-blue-400 rounded-md p-2 mt-5 w-full"
              onClick={handleLogin}
            >
              Log in
            </button>

            <div className=" justify-center mt-1">
              <button className="text-sm underline" onClick={changeMethod}>
                {loginMethod == "email"
                  ? "Log in with password"
                  : "Log in with an email"}
              </button>
            </div>
            <div className=" justify-center mt-1">
              <div className="text-sm ">
                Doesn't have an account? &nbsp;
                <button onClick={handleSwtichToSignUp} className="underline">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="flex flex-col justify-center bg-white px-2 mx-auto rounded-md py-12 w-2/5">
        <div className="flex flex-col justify-center mx-auto w-full px-8">
          <h1 className="text-3xl text-center mb-6">
            {loginMethod == "email"
              ? "Create an account with your email"
              : "Create an account with a password"}
          </h1>
          <form className="flex flex-col">
            <div>
              <label htmlFor="email" className="mt-5 w-full">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border-2 border-gray-400 rounded-md p-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={`mt-2 ${displayPassword ? "block" : "hidden"}`}>
              <label htmlFor="password" className=" mt-5">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-2 border-gray-400 rounded-md p-2 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="justify-center text-center">
              <div
                className={`justify-center mt-1 ${
                  hasAnAccount ? "hidden" : "block"
                }`}
              >
                <button
                  className="bg-blue-400 rounded-md p-2 mt-1 w-full"
                  onClick={handleSingUp}
                >
                  Sing Up
                </button>
              </div>
              <div className=" justify-center mt-1">
                <button className="text-sm underline" onClick={changeMethod}>
                  {loginMethod == "email"
                    ? "Sign up with password"
                    : "Sign up with an email"}
                </button>
              </div>
              <div className=" justify-center mt-1">
                <div className="text-sm " onClick={changeMethod}>
                  Already have an account? &nbsp;
                  <button onClick={handleSwtichToSignUp} className="underline">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const signUpEmailMessage = () => {
    return (
      <div className="flex flex-col justify-center bg-white px-2 mx-auto rounded-md py-12 w-2/5">
        <div className="flex flex-col justify-center mx-auto w-full px-8">
          <div className="text-3xl text-center mb-6">
            <h1>Check your email!</h1>
            <h2>We send you an email to verify your account and get access.</h2>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (loginMethod == "email") {
      setDisplayPassword(false);
    }
  }, [loginMethod]);

  return (
    <>
      {isEmailSent
        ? signUpEmailMessage()
        : hasAnAccount
        ? loginForm()
        : signUpForm()}
    </>
  );
}

export default LoginPage;
