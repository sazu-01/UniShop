
"use client";

import React, { FormEvent, useEffect, useState } from 'react';

import "@/css/AdminCategories.css"

export default function AdminCategories() {

    const [AllCategories, setAllCategories]  = useState<{name : string, slug : string}[]>([]);
    const [newCategory, setNewCategory] = useState("");

    //get all categories handler 
    const handleAllCategories = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all-category`,{
                method : "GET",
                credentials : "include",
            });

            const data = await res.json();
            setAllCategories(data.payload.categories);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    
     const handleCreateCategory = async (e: FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return alert("Category name cannot be empty");
    
       try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/create-category`, { 
        method : "POST",
        credentials : "include",
        headers : {
            'Content-Type' : 'application/json'
        },

        body : JSON.stringify({ name: newCategory })
       });

      const data = await res.json();
      setAllCategories([...AllCategories, data.payload.newCategory]);
      setNewCategory("");
       } catch (error) {
        console.error("Error creating category:", error);
        
       }
     }


     const handleUpdateCategory = async (slug : string) => {
        const newName = prompt("Enter new category name");
        if(!newName) return
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/update-category/${slug}`, {
            method : "PUT",
            credentials : "include",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name : newName})

            });

            const data = await res.json();
            setAllCategories(AllCategories?.map((category) => category.slug === slug ? data.payload : category))
        } catch (error) {
            console.error("Error updating category:", error);
        }
     }
     

     const handleDeleteCategory = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/delete-category/${slug}`,{
                method : "DELETE",
                credentials : "include"
            });

            setAllCategories(AllCategories?.filter((category) => category.slug !== slug ))
        } catch (error) {
            console.error("Error deleting category:", error);  
        }
     }


     useEffect(()=>{
        handleAllCategories();
     },[]);

     


  return (
    <div id='admin-categories'>
         <div className="categories-contnet">
            <h2>Category Management</h2>
            
            <form action="" className='create-categories' onSubmit={handleCreateCategory}>
                <input type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"    
                />
                <button type='submit'>Add A Category</button>
            </form>

          <div className="all-categories">
            {AllCategories !== null && AllCategories.map((category, index)=> (
                <div className='category' key={index}>
                   <p>{category.name}</p>
                   <button className='edit-category' onClick={()=>handleUpdateCategory(category.slug)}>Edit</button>
                   <button className='delete-category' onClick={()=>handleDeleteCategory(category.slug)}>Delete</button>
                </div>
            ))}
          </div>

            
         </div>
    </div>
  )
}
