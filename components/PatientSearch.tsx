"use client";

import { useState } from "react";
import Link from "next/link";
import { Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Alert } from "@material-tailwind/react";

const PatientSearch = ({ initialUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("inactive");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle search term changes
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    filterUsers(value);
  };

  // Filter users based on the search term
  const filterUsers = (searchValue) => {
    const filtered = initialUsers.filter((user) =>
      (`${user.lastName} ${user.firstName} ${user.email}`).toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  // Handle making user inactive or active
  const handleAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setIsModalOpen(true);
  };

  const confirmAction = async () => {
    if (selectedUser) {
      const newStatus = actionType === "inactive" ? false : true;
      const response = await fetch(`/api/user/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: newStatus }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        const updatedUsers = initialUsers.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        );

        // Sort users: active users first, then inactive users
        updatedUsers.sort((a, b) => {
          if (a.active === b.active) {
            return a.lastName.localeCompare(b.lastName);
          }
          return a.active ? -1 : 1;
        });

        setFilteredUsers(updatedUsers);
        setIsModalOpen(false);
        setSuccessMessage(`User ${selectedUser.firstName} ${selectedUser.lastName} has been ${newStatus ? 'reactivated' : 'made inactive'}.`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000); // Show success message for 3 seconds
      } else {
        console.error('Failed to update user status');
      }
    }
  };

  return (
    <div>
      {successMessage && <Alert color="green" className="mb-4">{successMessage}</Alert>}
      <Input
        label="Search for a patient"
        size="lg"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4"
      />
      <ul>
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className={`border-b border-gray-300 last:border-b-0 p-3 hover:bg-gray-200 cursor-pointer flex justify-between items-center ${!user.active ? 'bg-gray-100 text-gray-500' : ''}`}
          >
            <Link href={`/user/${user.id}`}>
              <div className="flex items-center">
                <span className="font-semibold">{user.lastName}, {user.firstName}</span>
                <span className="ml-2">| {user.email}</span>
              </div>
            </Link>
            {user.active ? (
              <Button color="light-blue" size="sm" onClick={() => handleAction(user, "inactive")}>
                Make Inactive
              </Button>
            ) : (
              <Button color="light-green" size="sm" onClick={() => handleAction(user, "active")}>
                Reactivate
              </Button>
            )}
          </li>
        ))}
      </ul>

      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <DialogHeader>Confirm {actionType === "inactive" ? "Inactivation" : "Reactivation"}</DialogHeader>
        <DialogBody>
          {`Are you sure you want to make ${selectedUser?.firstName} ${selectedUser?.lastName} ${actionType === "inactive" ? "inactive" : "active again"}?`}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={confirmAction}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default PatientSearch;
