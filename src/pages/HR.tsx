import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserCheck, Calendar, DollarSign, Search, Download } from "lucide-react";

const mockEmployees = [
  { id: "EMP-001", name: "John Smith", department: "Sales", position: "Sales Manager", salary: 75000, joinDate: "2020-03-15", status: "Active" },
  { id: "EMP-002", name: "Sarah Johnson", department: "Finance", position: "Accountant", salary: 60000, joinDate: "2021-06-01", status: "Active" },
  { id: "EMP-003", name: "Mike Brown", department: "Production", position: "Production Supervisor", salary: 65000, joinDate: "2019-11-20", status: "Active" },
  { id: "EMP-004", name: "Emily Davis", department: "HR", position: "HR Specialist", salary: 55000, joinDate: "2022-02-10", status: "Active" },
  { id: "EMP-005", name: "David Wilson", department: "Warehouse", position: "Warehouse Manager", salary: 58000, joinDate: "2020-08-05", status: "On Leave" },
];

const mockAttendance = [
  { id: "EMP-001", name: "John Smith", date: "2024-01-24", checkIn: "08:45 AM", checkOut: "05:30 PM", hours: "8.75", status: "Present" },
  { id: "EMP-002", name: "Sarah Johnson", date: "2024-01-24", checkIn: "08:50 AM", checkOut: "05:25 PM", hours: "8.58", status: "Present" },
  { id: "EMP-003", name: "Mike Brown", date: "2024-01-24", checkIn: "08:30 AM", checkOut: "05:00 PM", hours: "8.50", status: "Present" },
  { id: "EMP-004", name: "Emily Davis", date: "2024-01-24", checkIn: "-", checkOut: "-", hours: "0", status: "Absent" },
  { id: "EMP-005", name: "David Wilson", date: "2024-01-24", checkIn: "-", checkOut: "-", hours: "0", status: "Leave" },
];

const mockLeaves = [
  { id: "LV-001", employee: "John Smith", type: "Annual Leave", from: "2024-02-05", to: "2024-02-09", days: 5, status: "Approved", reason: "Family vacation" },
  { id: "LV-002", employee: "Emily Davis", type: "Sick Leave", from: "2024-01-24", to: "2024-01-24", days: 1, status: "Approved", reason: "Medical appointment" },
  { id: "LV-003", employee: "Sarah Johnson", type: "Annual Leave", from: "2024-02-15", to: "2024-02-16", days: 2, status: "Pending", reason: "Personal matters" },
  { id: "LV-004", employee: "Mike Brown", type: "Unpaid Leave", from: "2024-03-01", to: "2024-03-03", days: 3, status: "Pending", reason: "Emergency" },
];

const mockPayroll = [
  { id: "PAY-001", employee: "John Smith", month: "January 2024", basic: 75000, allowances: 5000, deductions: 8000, netPay: 72000, status: "Paid" },
  { id: "PAY-002", employee: "Sarah Johnson", month: "January 2024", basic: 60000, allowances: 4000, deductions: 6500, netPay: 57500, status: "Paid" },
  { id: "PAY-003", employee: "Mike Brown", month: "January 2024", basic: 65000, allowances: 4500, deductions: 7000, netPay: 62500, status: "Paid" },
  { id: "PAY-004", employee: "Emily Davis", month: "January 2024", basic: 55000, allowances: 3500, deductions: 5800, netPay: 52700, status: "Processing" },
  { id: "PAY-005", employee: "David Wilson", month: "January 2024", basic: 58000, allowances: 4000, deductions: 6200, netPay: 55800, status: "Processing" },
];

const mockRecruitment = [
  { id: "REC-001", position: "Sales Executive", department: "Sales", posted: "2024-01-15", applications: 25, shortlisted: 5, status: "Interviewing" },
  { id: "REC-002", position: "Pharmacist", department: "Quality Control", posted: "2024-01-10", applications: 18, shortlisted: 3, status: "Offer Made" },
  { id: "REC-003", position: "Warehouse Assistant", department: "Warehouse", posted: "2024-01-20", applications: 32, shortlisted: 8, status: "Screening" },
  { id: "REC-004", position: "Accountant", department: "Finance", posted: "2024-01-18", applications: 15, shortlisted: 4, status: "Interviewing" },
];

const HR = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">HR Management</h1>
            <p className="text-muted-foreground mt-1">Employee management, payroll, attendance & recruitment</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            HR Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Employees"
            value="247"
            change="+12 this month"
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Present Today"
            value="234"
            change="94.7%"
            icon={UserCheck}
            trend="up"
          />
          <StatCard
            title="On Leave"
            value="8"
            change="3.2%"
            icon={Calendar}
            trend="up"
          />
          <StatCard
            title="Monthly Payroll"
            value="$1.2M"
            change="+5.5%"
            icon={DollarSign}
            trend="up"
          />
        </div>

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leaves</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Employee Directory</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search employees..." className="pl-10 w-64" />
                    </div>
                    <Button>Add Employee</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.id}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>${employee.salary.toLocaleString()}</TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            employee.status === "Active" ? "bg-success/10 text-success" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {employee.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Today's Attendance</CardTitle>
                  <Button>Mark Attendance</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                        <TableCell>{record.hours}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            record.status === "Present" ? "bg-success/10 text-success" :
                            record.status === "Leave" ? "bg-warning/10 text-warning" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            {record.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Leave Requests</CardTitle>
                  <Button>Apply Leave</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Leave ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">{leave.id}</TableCell>
                        <TableCell>{leave.employee}</TableCell>
                        <TableCell>{leave.type}</TableCell>
                        <TableCell>{leave.from}</TableCell>
                        <TableCell>{leave.to}</TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            leave.status === "Approved" ? "bg-success/10 text-success" :
                            leave.status === "Pending" ? "bg-warning/10 text-warning" :
                            "bg-destructive/10 text-destructive"
                          }`}>
                            {leave.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Review</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payroll Processing</CardTitle>
                  <Button>Process Payroll</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payroll ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayroll.map((payroll) => (
                      <TableRow key={payroll.id}>
                        <TableCell className="font-medium">{payroll.id}</TableCell>
                        <TableCell>{payroll.employee}</TableCell>
                        <TableCell>{payroll.month}</TableCell>
                        <TableCell>${payroll.basic.toLocaleString()}</TableCell>
                        <TableCell>${payroll.allowances.toLocaleString()}</TableCell>
                        <TableCell>${payroll.deductions.toLocaleString()}</TableCell>
                        <TableCell className="font-medium">${payroll.netPay.toLocaleString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payroll.status === "Paid" ? "bg-success/10 text-success" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {payroll.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recruitment" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Open Positions</CardTitle>
                  <Button>Post Job</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job ID</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Shortlisted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRecruitment.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell>{job.position}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>{job.posted}</TableCell>
                        <TableCell>{job.applications}</TableCell>
                        <TableCell>{job.shortlisted}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            job.status === "Offer Made" ? "bg-success/10 text-success" :
                            job.status === "Interviewing" ? "bg-primary/10 text-primary" :
                            "bg-warning/10 text-warning"
                          }`}>
                            {job.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HR;
