import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Select, 
  MenuItem, 
  Modal, 
  Typography 
} from '@mui/material';

function ProtectedPage() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    axios.get('https://localhost:5000/getUsers')
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = () => {
    if (selectedUser) {
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleCreate = () => {
    axios.post('/api/auth/register', selectedUser)
      .then(response => {
        setUsers([...users, response.data]);
        setSelectedUser(null);
        setOpen(false);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = () => {
    axios.delete(`/api/auth/${selectedUser._id}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== selectedUser._id));
        setSelectedUser(null);
      })
      .catch(err => console.log(err));
  };

  const handleSave = () => {
    axios.put(`https://localhost:5000/api/auth/${selectedUser._id}`, selectedUser)
      .then(response => {
        setUsers(users.map(user => user._id === selectedUser._id ? response.data : user));
        setIsEditing(false);
        setSelectedUser(null);
        setOpen(false);
      })
      .catch(err => console.error("Error updating user:", err.response ? err.response.data : err.message));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>

      {/* Action Buttons */}
      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Create New User</Button>
        <Select
          value={selectedUser ? selectedUser._id : ''}
          onChange={(e) => setSelectedUser(users.find(user => user._id === e.target.value))}
          displayEmpty
          sx={{ width: '200px' }}
        >
          <MenuItem value=""><em>Select User</em></MenuItem>
          {users.map(user => (
            <MenuItem key={user._id} value={user._id}>{user.firstName}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="secondary" onClick={handleEdit} disabled={!selectedUser}>Edit</Button>
        <Button variant="contained" color="success" onClick={handleSave} disabled={!isEditing}>Save</Button>
        <Button variant="contained" color="error" onClick={handleDelete} disabled={!selectedUser}>Delete</Button>
      </Box>

      {/* Users Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>ID Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {isEditing && selectedUser && selectedUser._id === user._id ? (
                    <TextField
                      name="firstName"
                      value={selectedUser.firstName}
                      onChange={handleInputChange}
                      variant="standard"
                    />
                  ) : user.firstName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.accountNumber}</TableCell>
                <TableCell>{user.userRole}</TableCell>
                <TableCell>{user.IDNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* User Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 1,
            boxShadow: 24,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6">{isEditing ? "Edit User" : "Create User"}</Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={selectedUser?.firstName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Surname"
            name="surname"
            value={selectedUser?.surname || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="username"
            value={selectedUser?.username || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="ID Number"
            name="IDNumber"
            value={selectedUser?.IDNumber || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Account Number"
            name="accountNumber"
            value={selectedUser?.accountNumber || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={selectedUser?.email || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={selectedUser?.password || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="User Role"
            name="userRole"
            select
            value={selectedUser?.userRole || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Super Admin">Super Admin</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={isEditing ? handleSave : handleCreate}
          >
            {isEditing ? "Save Changes" : "Create"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ProtectedPage;