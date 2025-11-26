# FinTrack 💰

A modern financial tracking application built with React and Node.js that helps you manage your income, expenses, and investments with a beautiful, intuitive interface.

## ✨ Features

- **📊 Dashboard Overview**: Real-time visualization of your financial status
- **💸 Transaction Management**: Track income and expenses with detailed categorization
- **📈 Investment Tracking**: Monitor your investment portfolio across different asset types
- **🔄 Fixed Expenses**: Manage recurring expenses automatically
- **📉 Analytics**: Interactive charts and graphs powered by Recharts
- **🎨 Modern UI**: Glassmorphism design with smooth animations and transitions
- **🌙 Dark Mode**: Premium dark theme optimized for extended use

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon set

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- (Additional backend details to be added)

## 📁 Project Structure

```
FinTrack/
├── web/FinTrack-Web/          # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── dashboard/     # Dashboard-specific components
│   │   │   └── layout/        # Layout components (Header, Navbar)
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service layer
│   │   ├── routes/            # Route definitions
│   │   └── layouts/           # Layout wrappers
│   └── package.json
├── server/                    # Backend application
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FinTrack
   ```

2. **Install frontend dependencies**
   ```bash
   cd web/FinTrack-Web
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../../server
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd web/FinTrack-Web
   npm run dev
   ```
   The application will open at `http://localhost:5173`

## 📖 Usage

### Dashboard
The main dashboard provides an overview of your financial status:
- **Balance Cards**: View your total income, expenses, and current balance
- **Expense Charts**: Visualize spending by category
- **Recent Transactions**: Quick access to your latest financial activities
- **Investment Overview**: Track your investment portfolio performance

### Adding Transactions
1. Navigate to "Nueva" in the navigation bar
2. Fill in transaction details (amount, category, description)
3. Submit to add to your financial records

### Managing Fixed Expenses
1. Go to "Añadir Gasto Fijo"
2. Set up recurring expenses with amount and frequency
3. View all fixed expenses in "Gastos Fijos"

## 🎨 Design System

The application uses a modern design system with:
- **Color Palette**: Deep slate backgrounds with blue and purple accents
- **Typography**: Inter font family for optimal readability
- **Components**: Glassmorphism effects with backdrop blur
- **Animations**: Smooth transitions and hover effects

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Organization

- **Services** (`src/services/`): Centralized API calls
- **Hooks** (`src/hooks/`): Reusable React hooks for state management
- **Components** (`src/components/`): Modular, reusable UI components
- **Routes** (`src/routes/`): Application routing configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👤 Author

Francisco Bermejo Melero

---

Built with ❤️ using React and modern web technologies
