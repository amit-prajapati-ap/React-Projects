import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const {id} = useParams()
  const allPastes = useSelector(state => state.pastes)

  const paste = allPastes.filter(p => p._id === id)[0]
  console.log(paste)

  return (
    <div>
          <div>
            <input
              type="text"
              value={paste.title} disabled
            />
          </div>
          <div>
            <textarea
              value={paste.content}
              rows={20} disabled
            />
          </div>
        </div>
  )
}

export default ViewPaste
