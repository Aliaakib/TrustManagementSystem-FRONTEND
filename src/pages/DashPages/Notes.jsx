import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Notes.css";
import Swal from "sweetalert2";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../../services/noteService";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState({ title: "", content: "" });
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const trustId = localStorage.getItem("trustId");

  useEffect(() => {
    fetchNotes();
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes(trustId);
      setNotes(res.data);
      if (res.data.length > 0) {
        setActiveNoteId(res.data[0]._id);
      }
    } catch (error) {
      console.error("Failed to fetch notes", error);
    }
  };

  const activeNote = notes.find((n) => n._id === activeNoteId);

  const handleEdit = () => {
    setIsEditing(true);
    setEditNote({
      title: activeNote.title,
      content: activeNote.content,
    });
  };

  const handleSave = async () => {
    try {
      const res = await updateNote(activeNoteId, editNote);
      setNotes((prev) =>
        prev.map((note) =>
          note._id === activeNoteId ? { ...note, ...res.data } : note
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update note", error);
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This note will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteNote(activeNoteId);
        const updated = notes.filter((n) => n._id !== activeNoteId);
        setNotes(updated);
        setActiveNoteId(updated.length > 0 ? updated[0]._id : null);
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete note", error);
        Swal.fire("Error!", "Failed to delete note.", "error");
      }
    }
  };

  const handleCreate = async () => {
    if (!newNote.title || !newNote.content) return;
    try {
      const res = await createNote({ ...newNote, trustId });
      setNotes([res.data, ...notes]);
      setNewNote({ title: "", content: "" });
      setActiveNoteId(res.data._id);
    } catch (error) {
      console.error("Failed to create note", error);
    }
  };

  const handleNoteClick = (noteId) => {
    setActiveNoteId(noteId);
    if (isMobile) {
      const selectedNote = notes.find((n) => n._id === noteId);
      if (selectedNote) {
        setEditNote({
          title: selectedNote.title,
          content: selectedNote.content,
        });
        setIsEditing(true);
      }
    }
  };

  return (
    <div className="note-container">
      <Sidebar />
      <div className="note-main">
        <h2 className="note-heading">Trust Notes</h2>
        <div className="note-content-wrapper">
          <div className="note-sidebar">
            <div className="note-form">
              <input
                type="text"
                placeholder="Note Title"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
                className="note-input"
              />
              <textarea
                placeholder="Write your note here..."
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
                className="note-textarea"
              ></textarea>
              <button
                className="note-btn note-btn-green"
                onClick={handleCreate}
              >
                + Add Note
              </button>
            </div>

            <div className="note-list">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className={`note-card ${
                    note._id === activeNoteId ? "note-card-active" : ""
                  }`}
                  onClick={() => handleNoteClick(note._id)}
                >
                  <h4 className="note-card-title">{note.title}</h4>
                  <p className="note-card-preview">
                    {note.content.substring(0, 60)}...
                  </p>
                </div>
              ))}
            </div>
          </div>

          {activeNoteId && activeNote && (
            <div className="note-details">
              <div className="note-view-card">
                {isEditing ? (
                  <>
                    <input
                      className="note-input"
                      value={editNote.title}
                      onChange={(e) =>
                        setEditNote({ ...editNote, title: e.target.value })
                      }
                    />
                    <textarea
                      className="note-textarea"
                      value={editNote.content}
                      onChange={(e) =>
                        setEditNote({ ...editNote, content: e.target.value })
                      }
                    />
                    <div className="note-btn-group">
                      <button
                        className="note-btn note-btn-green"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="note-btn note-btn-outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="note-view-title">{activeNote.title}</h3>
                    <p className="note-view-content">{activeNote.content}</p>
                    <div className="note-btn-group">
                      <button
                        className="note-btn note-btn-green"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="note-btn note-btn-outline"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
