"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const createRoom = async () => {
    const id = uuidv4().slice(0, 6);

    await supabase.from("rooms").insert([{ id, name, password }]);

    window.location.href = `/room/${id}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-[350px]">
        <h1 className="text-xl font-bold mb-4">Costrack</h1>

        <input
          placeholder="Room Name"
          className="border p-2 w-full mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={createRoom}
          className="bg-black text-white w-full p-2 rounded"
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
