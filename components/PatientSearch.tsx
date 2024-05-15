"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@material-tailwind/react";

const PatientSearch = ({ initialUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);

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

  return (
    <div>
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
            className="border-b border-gray-300 last:border-b-0 p-3 hover:bg-gray-200 cursor-pointer"
          >
            <Link href={`/user/${user.id}`}>
              <div className="flex items-center">
                <span className="font-semibold">{user.lastName}, {user.firstName}</span>
                <span className="ml-2">| {user.email}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientSearch;
