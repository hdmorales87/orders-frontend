# OrdersFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Docker Deployment

This project includes Docker configuration for containerized deployment.

### Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

### Docker Commands

#### Build and run with Docker Compose

```bash
# Build and start the container
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# Stop the container
docker-compose down

# View logs
docker-compose logs -f
```

#### Manual Docker commands

```bash
# Build the Docker image
docker build -t orders-frontend:latest .

# Run the container
docker run -p 80:80 --name orders-frontend orders-frontend:latest

# Stop and remove the container
docker stop orders-frontend
docker rm orders-frontend
```

### Environment Variables

The application supports the following environment variables:

- `NODE_ENV`: Set to `production` for production builds
- `ORDERS_API_URL`: Backend API URL (default: `http://localhost:8081`)
- `ORDERS_ENDPOINT`: API endpoint path (default: `/orders`)

### Container Configuration

- **Port**: The container exposes port 80
- **Web Server**: Uses nginx for serving the built Angular application
- **Build Process**: Multi-stage build for optimized production image
- **Restart Policy**: `unless-stopped` for automatic restarts

### Accessing the Application

Once the container is running, access the application at:
- `http://localhost:80` (Docker)
- `http://localhost:4200` (Development server)

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
