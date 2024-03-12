import { createSignal } from "solid-js";
import { signUp } from "../lib/pocketbase";
import { A, useNavigate } from "@solidjs/router";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [error, setError] = createSignal("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (password() !== confirmPassword()) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp({
        name: name(),
        email: email(),
        password: password(),
        passwordConfirm: password(),
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto rounded-xl flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      {error() && <p className="text-red-500">{error()}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Enter your name"
            value={name()}
            onInput={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            placeholder="Enter your email"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Enter your password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            placeholder="Confirm your password"
            value={confirmPassword()}
            onInput={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <A href="/" className="btn btn-link">
            Already have an account?
          </A>
        </div>
      </form>
    </div>
  );
};

export default Signup;
