import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
export default function SignUp() {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username" value="Your Username" className="font-bold"/>
              <TextInput placeholder="Username" id="username" type="text" />
            </div>
            <div>
              <Label htmlFor="email" value="Your Email" className="font-bold"/>
              <TextInput placeholder="name@company.com" id="email" type="email" />
            </div>
            <div>
              <Label htmlFor="password" value="Your Password" className="font-bold" />
              <TextInput placeholder="Password" id="password" type="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" className="mt-2">Sign Up</Button>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
