# Enterprise ERP System

A comprehensive, enterprise-level Enterprise Resource Planning (ERP) system built with modern JavaScript technologies. This system provides complete business management capabilities including Employee Management, Attendance Tracking, Financial Management, Inventory Control, Project Management, and more.

## 🚀 Quick Deploy to Vercel

**Deploy now in minutes!** See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for one-click deployment instructions.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

---

## 🏗️ Architecture Overview

### Technology Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Redux Toolkit (State Management)
- Recharts (Data Visualization)

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL Database
- JWT Authentication
- Zod Validation

**Additional Tools:**
- date-fns (Date utilities)
- jose (JWT handling)
- bcryptjs (Password hashing)

## 📦 Modules Included

### 1. Employee Module
- Employee CRUD operations
- Department management
- Designation/Role management
- Employment type tracking
- Document management
- Bank details storage

### 2. Attendance Module
- Check-in/Check-out tracking
- Leave management
- Holiday calendar
- Attendance reports
- Overtime tracking
- Location-based attendance

### 3. Financial Module
- Payroll processing
- Invoice management
- Expense tracking
- Transaction recording
- Account management
- Financial reports

### 4. Inventory Module
- Product management
- Stock tracking
- Warehouse management
- Purchase orders
- Sales orders
- Supplier management
- Stock movements

### 5. Project Module
- Project planning & tracking
- Task management
- Team allocation
- Budget tracking
- Progress monitoring
- Timeline management

### 6. Additional Features
- User authentication & authorization
- Role-based access control (RBAC)
- Notification system
- Audit logging
- Approval workflows
- Performance reviews
- Reports & analytics
- Settings management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd erp-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/erp_db?schema=public"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# (Optional) Seed database
npm run db:seed
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
erp-system/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   ├── dashboard/        # Dashboard page
│   │   ├── employees/        # Employee module
│   │   ├── attendance/       # Attendance module
│   │   ├── finance/          # Finance module
│   │   ├── inventory/        # Inventory module
│   │   ├── projects/         # Project module
│   │   └── ...
│   ├── components/
│   │   ├── ui/               # UI components
│   │   ├── layout/           # Layout components
│   │   ├── forms/            # Form components
│   │   └── tables/           # Table components
│   ├── lib/
│   │   ├── prisma/           # Prisma client
│   │   ├── utils/            # Utility functions
│   │   └── validators/       # Zod schemas
│   ├── store/
│   │   ├── slices/           # Redux slices
│   │   └── index.ts          # Store configuration
│   └── types/                # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🔐 Database Schema

The system uses a comprehensive PostgreSQL schema with the following main entities:

- **User** - System users with authentication
- **Employee** - Employee information
- **Department** - Organizational structure
- **AttendanceRecord** - Daily attendance
- **Leave** - Leave requests
- **Payroll** - Salary processing
- **Invoice** - Billing documents
- **Expense** - Expense claims
- **Product** - Inventory items
- **Warehouse** - Storage locations
- **Project** - Projects
- **Task** - Project tasks
- And many more...

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation with Zod
- SQL injection prevention (Prisma ORM)
- XSS protection
- CSRF protection

## 📊 Key Features

### Enterprise-Grade
- Scalable architecture
- Modular design
- Comprehensive error handling
- Audit logging
- Multi-tenant ready

### Production-Ready
- TypeScript for type safety
- Comprehensive validation
- Responsive design
- Optimized performance
- SEO-friendly

### User Experience
- Intuitive navigation
- Real-time updates
- Advanced search & filtering
- Export capabilities
- Customizable dashboards

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💼 Support

For enterprise support, customizations, or consultations, please contact us.

---

**Built with ❤️ using Next.js, React, TypeScript, and Prisma**
