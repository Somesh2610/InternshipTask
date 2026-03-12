"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaUserShield, FaPlus } from "react-icons/fa";

export default function TeamPage() {

const [team,setTeam]=useState([]);

const [adminMode,setAdminMode]=useState(false);
const [showLogin,setShowLogin]=useState(false);
const [showForm,setShowForm]=useState(false);
const [showProfile,setShowProfile]=useState(false);

const [password,setPassword]=useState("");

const [name,setName]=useState("");
const [role,setRole]=useState("");
const [bio,setBio]=useState("");
const [photo,setPhoto]=useState("");
const [linkedin,setLinkedin]=useState("");

const [editingMember,setEditingMember]=useState(null);
const [selectedMember,setSelectedMember]=useState(null);

const [search,setSearch]=useState("");
const [filter,setFilter]=useState("All");

const ADMIN_PASSWORD="admin123";


useEffect(()=>{

fetch("http://127.0.0.1:8000/team")
.then(res=>res.json())
.then(data=>setTeam(data));

},[]);



const checkPassword=()=>{

if(password===ADMIN_PASSWORD){

setAdminMode(true);
setShowLogin(false);

}else{

alert("Wrong password");

}

};



const logoutAdmin=()=>{

setAdminMode(false);

};



const deleteMember=async(id)=>{

await fetch(`http://127.0.0.1:8000/team/${id}`,{

method:"DELETE"

});

setTeam(team.filter(member=>member.id!==id));

};



const openEditForm=(member)=>{

setEditingMember(member);

setName(member.name);
setRole(member.role);
setBio(member.bio);
setPhoto(member.photo);
setLinkedin(member.linkedin);

setShowForm(true);

};



const saveMember=async()=>{

if(!name || !role) return;

if(editingMember){

const updated={

...editingMember,
name,
role,
bio,
photo,
linkedin

};

await fetch(`http://127.0.0.1:8000/team/${editingMember.id}`,{

method:"PUT",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(updated)

});

setTeam(team.map(m=>m.id===editingMember.id?updated:m));

}

else{

const newMember={

id:Date.now(),
name,
role,
bio,
photo,
linkedin

};

await fetch("http://127.0.0.1:8000/team",{

method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify(newMember)

});

setTeam([...team,newMember]);

}

setShowForm(false);
setEditingMember(null);

setName("");
setRole("");
setBio("");
setPhoto("");
setLinkedin("");

};



/* ENTER KEY SAVE */

const handleKeyDown=(e)=>{

if(e.key==="Enter"){

saveMember();

}

};



/* IMAGE UPLOAD */

const handleImageUpload=(file)=>{

const reader=new FileReader();

reader.onloadend=()=>{

setPhoto(reader.result);

};

reader.readAsDataURL(file);

};



const onFileChange=(e)=>{

const file=e.target.files[0];

if(file){

handleImageUpload(file);

}

};



const onDrop=(e)=>{

e.preventDefault();

const file=e.dataTransfer.files[0];

if(file){

handleImageUpload(file);

}

};



const filteredTeam = team
.filter(member => member.name.toLowerCase().includes(search.toLowerCase()))
.filter(member => filter==="All" || member.role===filter);



return(

<div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white font-sans">


{/* NAVBAR */}

<nav className="flex justify-between items-center px-10 py-5 backdrop-blur-md bg-white/5 border-b border-white/10">

<h1 className="text-3xl font-bold tracking-wide text-indigo-300">

Armatrix

</h1>

<div className="flex items-center gap-6">

<a className="hover:text-indigo-300 cursor-pointer">Home</a>
<a className="hover:text-indigo-300 cursor-pointer">Team</a>

{!adminMode && (

<FaUserShield
size={22}
className="cursor-pointer hover:text-indigo-300"
onClick={()=>setShowLogin(true)}
/>

)}

{adminMode && (

<button
onClick={logoutAdmin}
className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
>

Logout

</button>

)}

</div>

</nav>



{/* HEADER */}

<div className="text-center mt-12 mb-10">

<h1 className="text-6xl font-extrabold tracking-wide text-indigo-300">

Meet Our Team

</h1>

<p className="text-gray-300 mt-4">

The amazing people building our company

</p>

</div>



{/* STATS */}

<div className="flex justify-center gap-16 mb-12 text-center">

<div>
<h2 className="text-3xl font-bold">{team.length}+</h2>
<p className="text-gray-400">Employees</p>
</div>

<div>
<h2 className="text-3xl font-bold">5</h2>
<p className="text-gray-400">Departments</p>
</div>

<div>
<h2 className="text-3xl font-bold">3</h2>
<p className="text-gray-400">Offices</p>
</div>

</div>



{/* SEARCH */}

<div className="flex justify-center mb-6">

<input
placeholder="Search team member..."
className="w-80 px-4 py-2 rounded-xl text-black"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>



{/* FILTER */}

<div className="flex justify-center gap-4 mb-10">

<button onClick={()=>setFilter("All")} className="px-4 py-2 bg-indigo-600 rounded">All</button>
<button onClick={()=>setFilter("Frontend Engineer")} className="px-4 py-2 bg-indigo-600 rounded">Frontend</button>
<button onClick={()=>setFilter("Backend Engineer")} className="px-4 py-2 bg-indigo-600 rounded">Backend</button>

</div>



{/* TEAM GRID */}

<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-6 pb-20">

{filteredTeam.map(member=>(

<div
key={member.id}
onClick={()=>{setSelectedMember(member);setShowProfile(true)}}
className="bg-white text-black rounded-3xl shadow-xl p-8 text-center transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl hover:shadow-indigo-400/30 hover:scale-105 cursor-pointer"
>

<img
src={member.photo || "https://randomuser.me/api/portraits/men/10.jpg"}
className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
/>

<h2 className="text-xl font-bold">

{member.name}

</h2>

<p className="text-indigo-600 mb-2">

{member.role}

</p>

<p className="text-gray-600 text-sm">

{member.bio}

</p>

<a
href={member.linkedin}
target="_blank"
className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
>

LinkedIn

</a>


{adminMode && (

<div className="flex justify-center gap-4 mt-5">

<FaEdit
size={18}
className="cursor-pointer hover:text-yellow-500"
onClick={(e)=>{e.stopPropagation();openEditForm(member)}}
/>

<FaTrash
size={18}
className="cursor-pointer hover:text-red-500"
onClick={(e)=>{e.stopPropagation();deleteMember(member.id)}}
/>

</div>

)}

</div>

))}

</div>



{/* PROFILE PANEL */}

{showProfile && selectedMember && (

<div className="fixed inset-0 bg-black/70 flex items-center justify-center">

<div className="bg-white text-black p-10 rounded-3xl w-[400px] text-center">

<img
src={selectedMember.photo}
className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
/>

<h2 className="text-2xl font-bold mb-2">{selectedMember.name}</h2>

<p className="text-indigo-600 mb-4">{selectedMember.role}</p>

<p className="text-gray-600 mb-6">{selectedMember.bio}</p>

<a
href={selectedMember.linkedin}
target="_blank"
className="bg-indigo-600 text-white px-4 py-2 rounded"
>

LinkedIn

</a>

<button
onClick={()=>setShowProfile(false)}
className="block mx-auto mt-6 text-gray-500"
>

Close

</button>

</div>

</div>

)}



{/* ADD BUTTON */}

{adminMode && (

<button
onClick={()=>{

setEditingMember(null);
setShowForm(true);

}}
className="fixed bottom-10 right-10 bg-indigo-600 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
>

<FaPlus/>

</button>

)}



{/* LOGIN */}

{showLogin && (

<div className="fixed inset-0 bg-black/60 flex items-center justify-center">

<div className="bg-white text-black p-8 rounded-3xl w-80">

<h2 className="text-xl font-bold mb-4">Admin Login</h2>

<input
type="password"
placeholder="Enter password"
className="border p-2 w-full mb-4 rounded"
onChange={(e)=>setPassword(e.target.value)}
onKeyDown={handleKeyDown}
/>

<button
onClick={checkPassword}
className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
>

Login

</button>

</div>

</div>

)}



{/* ADD FORM */}

{showForm && (

<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">

<div className="bg-white text-black w-[420px] p-8 rounded-3xl shadow-2xl">

<h2 className="text-2xl font-bold mb-6 text-center">

{editingMember ? "Edit Member" : "Add Member"}

</h2>



<div
onDragOver={(e)=>e.preventDefault()}
onDrop={onDrop}
className="flex justify-center mb-6"
>

<label className="cursor-pointer">

<input
type="file"
accept="image/*"
className="hidden"
onChange={onFileChange}
/>

<div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-indigo-500 hover:scale-105 transition">

{photo ? (

<img src={photo} className="w-full h-full object-cover"/>

):( 

<span className="text-sm text-gray-600">Upload Photo</span>

)}

</div>

</label>

</div>



<input
placeholder="Full Name"
className="w-full mb-4 p-3 rounded-xl border"
value={name}
onChange={(e)=>setName(e.target.value)}
onKeyDown={handleKeyDown}
/>

<input
placeholder="Role"
className="w-full mb-4 p-3 rounded-xl border"
value={role}
onChange={(e)=>setRole(e.target.value)}
onKeyDown={handleKeyDown}
/>

<textarea
placeholder="Short Bio"
rows="3"
className="w-full mb-4 p-3 rounded-xl border"
value={bio}
onChange={(e)=>setBio(e.target.value)}
/>

<input
placeholder="LinkedIn URL"
className="w-full mb-6 p-3 rounded-xl border"
value={linkedin}
onChange={(e)=>setLinkedin(e.target.value)}
/>



<div className="flex gap-3">

<button
onClick={()=>setShowForm(false)}
className="flex-1 py-3 rounded-xl border hover:bg-gray-100"
>

Cancel

</button>

<button
onClick={saveMember}
className="flex-1 py-3 rounded-xl bg-indigo-600 text-white hover:scale-105 transition"
>

Save

</button>

</div>

</div>

</div>

)}

</div>

);

}