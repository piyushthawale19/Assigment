"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Users, Briefcase, TrendingUp, Shield, Activity, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const adminData = [
  { id: 'usr_001', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'User', lastLogin: '2 hours ago' },
  { id: 'usr_002', name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User', lastLogin: '1 day ago' },
  { id: 'usr_003', name: 'Mary Smith', email: 'mary.smith@example.com', role: 'User', lastLogin: '5 minutes ago' },
];

const userData = [
  { id: 'proj_A', name: 'Project Alpha', status: 'In Progress', deadline: '2024-12-31' },
  { id: 'proj_B', name: 'Project Bravo', status: 'Completed', deadline: '2024-10-15' },
  { id: 'proj_C', name: 'Project Charlie', status: 'On Hold', deadline: '2025-02-01' },
];

const demoStats = [
  {
    title: 'Total Users',
    value: '2,847',
    change: '+12.5%',
    icon: Users,
    trend: 'up',
    description: 'Active users this month'
  },
  {
    title: 'Active Projects',
    value: '156',
    change: '+8.2%',
    icon: Briefcase,
    trend: 'up',
    description: 'Projects in progress'
  },
  {
    title: 'Security Score',
    value: '98.5%',
    change: '+2.1%',
    icon: Shield,
    trend: 'up',
    description: 'Overall security rating'
  },
  {
    title: 'Performance',
    value: '99.9%',
    change: '+0.3%',
    icon: Activity,
    trend: 'up',
    description: 'System uptime'
  }
];

function StatsCard({ stat }: { stat: typeof demoStats[0] }) {
  const Icon = stat.icon;
  return (
    <Card className="card-interactive hover-glow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold">{stat.value}</p>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
              >
                {stat.change}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {demoStats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      {/* User Management Card */}
      <Card className="hover-glow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              User Management
            </CardTitle>
            <CardDescription>View and manage all users in the system.</CardDescription>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50 transition-colors">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminData.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="hover:bg-primary/10 transition-colors">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{user.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function UserDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="hover-glow gradient-purple text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to RoleVault!</h2>
              <p className="text-purple-100">Manage your projects and track your progress</p>
            </div>
            <Star className="h-12 w-12 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats for Users */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-interactive hover-glow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-interactive hover-glow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-violet-100">
                <TrendingUp className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-xl font-bold">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-interactive hover-glow">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-purple-100">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tasks Today</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card className="hover-glow">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              My Projects
            </CardTitle>
            <CardDescription>Here is an overview of your current projects.</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button className="hover-gradient">
              New Project
            </Button>
            <div className="p-3 rounded-full bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50 transition-colors">
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={project.status === 'Completed' ? 'default' : 'secondary'}
                      className={`transition-colors ${project.status === 'Completed'
                          ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30'
                          : project.status === 'On Hold'
                            ? 'bg-yellow-500/20 text-yellow-700 hover:bg-yellow-500/30'
                            : 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30'
                        }`}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{project.deadline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}
