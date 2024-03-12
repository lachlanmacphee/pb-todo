import { createSignal } from "solid-js";
import { pb, login } from "../lib/pocketbase";
import { A, useNavigate } from "@solidjs/router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");

  if (pb.authStore.model) navigate("/app", { replace: true });

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await login({ email: email(), password: password() });
      navigate("/app");
    } catch (error) {
      setError(error.message);
      event.target.reset();
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto rounded-xl flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        {error() && <p className="text-red-500">{error()}</p>}
        <div className="flex justify-between">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <A href="/signup" className="btn btn-link">
            Don't have an account?
          </A>
        </div>
      </form>
    </div>
  );
};

export default Login;
