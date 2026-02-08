"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Shield, UserPlus, Search, Edit2, Trash2, Loader2, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { createUser, deleteUser, updateUser, type CreateUserData } from "@/lib/admin-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { SmoothView } from "@/components/animations/SmoothView"

type User = {
  id: string
  name: string
  username: string
  email: string | null
  role: string
  createdAt: Date
  profile?: { regNo: string; program: string; school: string; batch: string } | null
  facultyProfile?: { empId: string; designation: string; school: string; mobile: string } | null
  parentProfile?: { mobile: string | null; student?: { user: { name: string } } | null } | null
  adminProfile?: { level: number } | null
}

export function UserManagementClient({ users: initialUsers }: { users: User[] }) {
  const router = useRouter()
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Create form state
  const [formData, setFormData] = useState<CreateUserData>({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "STUDENT",
    regNo: "",
    program: "",
    school: "",
    batch: "",
    empId: "",
    designation: "",
    cabin: "",
    mobile: ""
  })

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  const handleCreate = async () => {
    setIsCreating(true)
    try {
      await createUser(formData)
      toast.success("User created successfully!")
      setCreateDialogOpen(false)
      setFormData({
        username: "", password: "", name: "", email: "", role: "STUDENT",
        regNo: "", program: "", school: "", batch: "", empId: "", designation: "", cabin: "", mobile: ""
      })
      router.refresh()
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to create user")
    } finally {
      setIsCreating(false)
    }
  }

  const handleEdit = async () => {
    if (!selectedUser) return
    setIsLoading(true)
    try {
      await updateUser(selectedUser.id, {
        name: formData.name || selectedUser.name,
        email: formData.email || selectedUser.email || undefined,
        password: formData.password || undefined
      })
      toast.success("User updated successfully!")
      setEditDialogOpen(false)
      router.refresh()
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to update user")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedUser) return
    setIsLoading(true)
    try {
      await deleteUser(selectedUser.id)
      toast.success("User deleted successfully!")
      setUsers(users.filter(u => u.id !== selectedUser.id))
      setDeleteDialogOpen(false)
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to delete user")
    } finally {
      setIsLoading(false)
    }
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      ...formData,
      name: user.name,
      email: user.email || "",
      password: "",
      role: user.role as CreateUserData['role']
    })
    setEditDialogOpen(true)
  }

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  return (
    <SmoothView className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-500" /> Identity Hub
          </h1>
          <p className="text-gray-400 mt-1">Universal authentication and role orchestration</p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-rose-600 hover:bg-rose-700">
              <UserPlus className="w-4 h-4 mr-2" /> Provision User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new user to the system with their role and profile.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Username *</Label>
                  <Input 
                    value={formData.username}
                    onChange={e => setFormData({...formData, username: e.target.value})}
                    className="bg-white/5 border-white/10"
                    placeholder="e.g., student2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password *</Label>
                  <Input 
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="bg-white/5 border-white/10"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="bg-white/5 border-white/10"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="bg-white/5 border-white/10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Role *</Label>
                <Select value={formData.role} onValueChange={v => setFormData({...formData, role: v as CreateUserData['role']})}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0a0a] border-white/10">
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="FACULTY">Faculty</SelectItem>
                    <SelectItem value="PARENT">Parent</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'STUDENT' && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <div className="space-y-2">
                    <Label className="text-emerald-400">Registration No *</Label>
                    <Input 
                      value={formData.regNo}
                      onChange={e => setFormData({...formData, regNo: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="21BCE1001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-400">Program</Label>
                    <Input 
                      value={formData.program}
                      onChange={e => setFormData({...formData, program: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="B.Tech CSE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-400">School</Label>
                    <Input 
                      value={formData.school}
                      onChange={e => setFormData({...formData, school: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="SCSE"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-emerald-400">Batch</Label>
                    <Input 
                      value={formData.batch}
                      onChange={e => setFormData({...formData, batch: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="2021-2025"
                    />
                  </div>
                </div>
              )}

              {formData.role === 'FACULTY' && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                  <div className="space-y-2">
                    <Label className="text-blue-400">Employee ID *</Label>
                    <Input 
                      value={formData.empId}
                      onChange={e => setFormData({...formData, empId: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="FAC002"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-400">Designation</Label>
                    <Input 
                      value={formData.designation}
                      onChange={e => setFormData({...formData, designation: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="Professor"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label className="text-blue-400">Cabin</Label>
                    <Input 
                      value={formData.cabin}
                      onChange={e => setFormData({...formData, cabin: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="AB1-402"
                    />
                  </div>
                </div>
              )}

              {formData.role === 'PARENT' && (
                <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                  <div className="space-y-2">
                    <Label className="text-purple-400">Mobile Number</Label>
                    <Input 
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value})}
                      className="bg-white/5 border-white/10"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="border-white/10">Cancel</Button>
              <Button onClick={handleCreate} disabled={isCreating} className="bg-rose-600 hover:bg-rose-700">
                {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-white">Active Catalog ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage credentials and role hierarchies</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search users..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-black/20 border-white/10 text-white w-[250px]" 
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-white/10 overflow-hidden bg-black/20">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-gray-300">Identity</TableHead>
                  <TableHead className="text-gray-300">Access Role</TableHead>
                  <TableHead className="text-gray-300">Network ID</TableHead>
                  <TableHead className="text-gray-300">Profile Info</TableHead>
                  <TableHead className="text-gray-300 text-right">Operations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-white/10 hover:bg-white/5 transition-colors group">
                    <TableCell className="text-white font-medium">{user.name}</TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "bg-opacity-20 border",
                        user.role === 'ADMIN' ? 'bg-rose-500 text-rose-500 border-rose-500/30' : 
                        user.role === 'FACULTY' ? 'bg-blue-500 text-blue-500 border-blue-500/30' :
                        user.role === 'STUDENT' ? 'bg-emerald-500 text-emerald-500 border-emerald-500/30' :
                        'bg-purple-500 text-purple-500 border-purple-500/30'
                      )}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 font-mono text-xs">{user.username}</TableCell>
                    <TableCell className="text-gray-400 text-xs">
                      {user.profile && `Reg: ${user.profile.regNo}`}
                      {user.facultyProfile && `Emp: ${user.facultyProfile.empId}`}
                      {user.parentProfile?.student && `Ward: ${user.parentProfile.student.user.name}`}
                      {user.adminProfile && 'Full Access'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-blue-500/10 hover:text-blue-400 h-8 w-8"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="hover:bg-rose-500/10 hover:text-rose-500 h-8 w-8"
                          onClick={() => openDeleteDialog(user)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Edit User: {selectedUser?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update user information. Leave password blank to keep unchanged.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>New Password (optional)</Label>
              <Input 
                type="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="bg-white/5 border-white/10"
                placeholder="Leave blank to keep current"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="border-white/10">Cancel</Button>
            <Button onClick={handleEdit} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-rose-500">Delete User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete <strong className="text-white">{selectedUser?.name}</strong>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-white/10">
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleDelete} disabled={isLoading} className="bg-rose-600 hover:bg-rose-700">
              {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SmoothView>
  )
}
