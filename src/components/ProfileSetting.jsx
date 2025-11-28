// ProfileSettings.jsx
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileSettings(){
  const [profile, setProfile] = useState({ name: "Dr. David", phone:"+254714704586", email:"dr.david.okinda@example.com" });

  const save = (e)=> {
    e.preventDefault();
    toast.success("Profile saved (local only)");
  };

  return (
    <form onSubmit={save} className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <div className="grid gap-3">
        <input className="px-3 py-2 rounded border dark:bg-gray-700" value={profile.name} onChange={(e)=>setProfile({...profile, name: e.target.value})} />
        <input className="px-3 py-2 rounded border dark:bg-gray-700" value={profile.phone} onChange={(e)=>setProfile({...profile, phone: e.target.value})} />
        <input className="px-3 py-2 rounded border dark:bg-gray-700" value={profile.email} onChange={(e)=>setProfile({...profile, email: e.target.value})} />
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-[#2EA3DD] text-white">Save</button>
        </div>
      </div>
    </form>
  );
}
