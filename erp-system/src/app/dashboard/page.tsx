'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// Stats Card Component
function StatsCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string;
  value: string;
  change?: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm mt-1 ${
                change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change} from last month
            </p>
          )}
        </div>
        <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { employees } = useSelector((state: RootState) => state.employees);
  const { projects } = useSelector((state: RootState) => state.projects);

  return (
    <DashboardLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value="234"
          change="+12%"
          icon="👥"
          color="bg-blue-100"
        />
        <StatsCard
          title="Present Today"
          value="218"
          change="+3%"
          icon="✅"
          color="bg-green-100"
        />
        <StatsCard
          title="Active Projects"
          value="18"
          change="+5%"
          icon="📋"
          color="bg-purple-100"
        />
        <StatsCard
          title="Revenue (MTD)"
          value="$124,500"
          change="+18%"
          icon="💰"
          color="bg-yellow-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: 'New employee joined', time: '2 hours ago', icon: '🎉' },
              { action: 'Project "Website Redesign" completed', time: '4 hours ago', icon: '✅' },
              { action: 'Invoice #INV-001 paid', time: '6 hours ago', icon: '💵' },
              { action: 'Inventory alert: Low stock on SKU-001', time: '8 hours ago', icon: '⚠️' },
              { action: 'New task assigned to John', time: '1 day ago', icon: '📝' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Add Employee', icon: '➕', href: '/employees' },
              { label: 'Create Project', icon: '📁', href: '/projects' },
              { label: 'Generate Invoice', icon: '📄', href: '/finance' },
              { label: 'View Reports', icon: '📊', href: '/reports' },
              { label: 'Manage Inventory', icon: '📦', href: '/inventory' },
            ].map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Engineering', count: 45, color: 'bg-blue-500' },
            { name: 'Sales', count: 32, color: 'bg-green-500' },
            { name: 'Marketing', count: 28, color: 'bg-purple-500' },
            { name: 'HR', count: 12, color: 'bg-yellow-500' },
            { name: 'Finance', count: 18, color: 'bg-red-500' },
            { name: 'Operations', count: 24, color: 'bg-indigo-500' },
          ].map((dept) => (
            <div key={dept.name} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`w-3 h-3 ${dept.color} rounded-full mx-auto mb-2`}></div>
              <p className="text-sm text-gray-500">{dept.name}</p>
              <p className="text-xl font-bold text-gray-900">{dept.count}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
