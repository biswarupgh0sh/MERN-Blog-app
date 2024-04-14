import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { OAuth } from "../components/OAuth.jsx";



export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please Fill Out All the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="mt-40 min-h-screen">
      <div className="max-w-3xl flex p-3 mx-auto flex-col md:flex-row gap-5">
        {/*left*/}

        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl ml-auto">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Personal
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nam
            minus reiciendis mollitia deleniti.
          </p>
        </div>
        {/*right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your Email" className="font-bold" />
              <TextInput
                placeholder="name@company.com"
                id="email"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                value="Your Password"
                className="font-bold"
              />
              <TextInput
                placeholder="***********"
                id="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm">
                    <span className="pl-3">Loading...</span>
                  </Spinner>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Do not have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
