import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

const NotFound = () => {
  const navigate = useNavigate();

  createEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  });

  return (
    <div class="flex items-center justify-center h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-red-500">404 Not Found</h1>
        <p class="mt-4">The page you are looking for does not exist.</p>
        <p class="mt-2">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default NotFound;
