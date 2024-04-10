import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [erroMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please Fill Out All the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
              <Label
                htmlFor="username"
                value="Your Username"
                className="font-bold"
              />
              <TextInput
                placeholder="Username"
                id="username"
                type="text"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Password"
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
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {erroMessage && (
            <Alert className="mt-5" color="failure">
              {erroMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
