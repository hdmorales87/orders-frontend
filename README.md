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

## 🏗️ Architecture

### Feature-First Architecture

The project follows a modern feature-first architecture pattern:

```
src/app/
├── core/           # Global services (ConfigService)
├── features/       # Feature-based modules
│   └── orders/     # Complete orders feature
│       ├── components/  # UI components
│       ├── services/    # Business logic
│       ├── facade/      # Facade pattern
│       ├── models/      # Interfaces and types
│       └── pages/       # Container components
└── shared/         # Shared components (currently empty)
```

### Component-Based Architecture

- **Standalone Components**: Angular 21 with independent components
- **Container-Presentational Pattern**: Clear separation between logic and presentation
- **Modular Routing**: Feature-based routing system
- **Signal-Based State Management**: Modern reactive state handling

## 🎯 Design Patterns

### 1. Facade Pattern
```typescript
// OrderFacade simplifies interaction with multiple services
export class OrderFacade {
  orders$ = new BehaviorSubject<Order[]>([]);
  
  constructor(private service: OrderService) {}
  
  load() {
    this.service.list().subscribe(data => this.orders$.next(data));
  }
}
```

### 2. Observer Pattern (RxJS)
```typescript
// BehaviorSubject for reactive state management
orders$ = new BehaviorSubject<Order[]>([]);
// Usage with async pipe in templates
[orders]="orders$ | async"
```

### 3. Dependency Injection
```typescript
// Standard Angular dependency injection
constructor(
  private http: HttpClient,
  private configService: ConfigService
) {}
```

### 4. Service Pattern
```typescript
// OrderService encapsulates API logic
@Injectable({ providedIn: 'root' })
export class OrderService {
  // Specific CRUD methods
}
```

### 5. Configuration Service Pattern
```typescript
// ConfigService centralizes configuration
export class ConfigService {
  private configSignal = signal<Config | null>(null);
  // Configuration management with fallback
}
```

### 6. Component Composition Pattern
```typescript
// OrderContainer composes OrderListComponent
template: `
  <app-order-list
    [orders]="orders$ | async"
    (create)="create($event)">
  </app-order-list>
`
```

### 7. Signal Pattern (Angular 21+)
```typescript
// Modern reactive state management
private configSignal = signal<Config | null>(null);
config = this.configSignal.asReadonly();
```

## 📋 SOLID Principles

### ✅ Single Responsibility Principle (SRP)
- **OrderService**: Only handles order HTTP operations
- **ConfigService**: Only manages configuration
- **OrderFacade**: Only coordinates between services and components
- **OrderListComponent**: Only handles UI presentation and validation

### ✅ Open/Closed Principle (OCP)
- **Interfaces**: `Order` interface allows extension
- **Standalone Components**: Easy extension without modifying existing code
- **Signal-based Config**: ConfigService can be extended without breaking changes

### ✅ Liskov Substitution Principle (LSP)
- **HttpClient Injection**: Any compatible HTTP client can be injected
- **Observable Pattern**: BehaviorSubject can be substituted with other Observables

### ✅ Interface Segregation Principle (ISP)
- **Order Interface**: Contains only necessary properties
- **Config Interface**: Segmented by domain (apiUrl, ordersEndpoint)

### ✅ Dependency Inversion Principle (DIP)
- **Abstractions**: Depends on interfaces (Order) not concrete implementations
- **DI Container**: Angular manages dependencies
- **Service Abstractions**: OrderFacade depends on OrderService, not specific HTTP implementations

## 🔧 Technical Features

### Modern Angular Stack
- **Angular 21.2.8**: Latest Angular version with standalone components
- **TypeScript**: Strong typing throughout the application
- **RxJS**: Reactive programming with observables
- **Signals**: Modern state management (Angular 21+)

### Development Tools
- **ESBuild**: Fast modern build tool
- **Vitest**: Modern testing framework
- **Prettier**: Code formatting
- **Angular CLI**: Scaffolding and development tools

### Type Safety
- **TypeScript**: Strict typing in entire project
- **Interfaces**: Clear data contracts
- **Generic Types**: Used in HTTP services

## 📊 Code Quality

### Strengths
- ✅ Clean and scalable architecture
- ✅ Clear separation of responsibilities
- ✅ Well-implemented design patterns
- ✅ Consistent SOLID principles application
- ✅ Type-safe and secure code
- ✅ Externalized configuration
- ✅ Modern Angular best practices

### Areas for Improvement
- 🔄 Could add centralized **Error Handling Pattern**
- 🔄 **Logging Pattern** for better debugging
- 🔄 **Cache Pattern** for HTTP request optimization
- 🔄 **Loading States** for better user experience
- 🔄 **Internationalization (i18n)** support
- 🔄 **Accessibility (a11y)** improvements

## 🚀 Features

### Order Management
- ✅ **CRUD Operations**: Create, Read, Update, Delete orders
- ✅ **Status Management**: Pending, Approved, Rejected states
- ✅ **Form Validation**: Client-side validation with error messages
- ✅ **Responsive Design**: Mobile-friendly Bootstrap UI
- ✅ **Real-time Updates**: Reactive state management

### Configuration
- ✅ **Environment-based Configuration**: Dynamic config loading
- ✅ **Fallback Values**: Default configuration support
- ✅ **Docker Support**: Containerized deployment
- ✅ **Production Ready**: Optimized builds and deployment

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
