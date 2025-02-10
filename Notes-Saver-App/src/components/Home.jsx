import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoPaste,
  resetAllPastes,
  updateToPastes,
} from "../features/PasteSlice";


const Home = () => {
  const allPastes = useSelector(state => state.pastes)
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || nanoid(),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //Update
      dispatch(updateToPastes(paste));
    } else {
      //Create
      dispatch(addtoPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams("");
  };

  useEffect(() => {
    if(pasteId) {
      const paste = allPastes.find(p => p._id === pasteId)
      setValue(paste.content)
      setTitle(paste.title)
    }
  }, [pasteId])
  

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          value={value}
          placeholder="Enter Content Here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
      <button onClick={() => dispatch(resetAllPastes())}>Reset</button>
    </div>
  );
};

export default Home;
