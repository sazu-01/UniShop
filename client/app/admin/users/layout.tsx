
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

//css
import "@/css/AdminUserDashboard.css";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  isBanned: boolean;
  image?: string;
}

export default function AdminUserDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  const handleUsers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users/all-user", {
        method : "GET",
        credentials : "include",
      });

      const data = await res.json();

      if (data.success) {
        setUsers(data.payload.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUsers();
  }, []);

  async function handleBannedorUnbanned(user: User) {
    try {
      const endpoint = user.isBanned
        ? `/users/unban-user/${user._id}`
        : `/users/ban-user/${user._id}`;
        
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
        method : "PUT",
        credentials : "include",
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      const data = await res.json()
      if (data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === user._id ? { ...u, isBanned: !user.isBanned } : u
          )
        );
      }
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  }

  async function handleDelete(user: User) {
    try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/delete-user/${user._id}`, {
          method: "DELETE",
          credentials: "include", 
    });

    const data = await res.json();
        if (data.success) {
            setUsers(prevUsers => prevUsers.filter(u => u._id !== user._id));
        }
    } catch (error) {
        console.error("Failed to delete user", error);
    }
}


  return (
    <div id="admin-user-dashboard">
      <div className="admin-user-dashboard-content">
        {users.map((user, index) => (
          <div className="admin-user" key={user._id || index}>
            <Image
              src={user.image || "/default-avatar.png"}
              alt={`${user.name}'s profile`}
              width={120}
              height={120}
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
            </p>
            <p>
              <strong>Status:</strong> {user.isBanned ? "Banned" : "Active"}
            </p>
            <div className="user-action-btn">
              <button
                className="edit-btn"
                onClick={() => handleBannedorUnbanned(user)}
              >
                {" "}
                {user.isBanned ? "Unban" : "Ban"}
              </button>
              <button className="delete-btn" onClick={() => handleDelete(user)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
