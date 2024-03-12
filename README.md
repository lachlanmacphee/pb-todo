## Usage

```bash
# Install dependencies
npm install

# Build the PocketBase docker image
docker build -t pb-todo-backend .

# Run the container using the above image
docker run -dp 127.0.0.1:8080:8080 pb-todo-backend

# Run the frontend
npm run dev
```

Now just visit `localhost:5173` in your browser and you should see pb-todo!
