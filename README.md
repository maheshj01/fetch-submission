# Dog Adoption App

A modern web application for browsing and adopting dogs from shelters.

## Features

- User authentication
- Browse and search dogs by breed
- Filter and sort dogs
- Save favorite dogs
- Generate matches based on favorites
- Responsive design

## Tech Stack

- React
- TypeScript
- Material-UI
- React Query
- React Router
- Axios
- ESLint & Prettier

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dog-adoption-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── context/       # React context providers
└── assets/        # Static assets
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 