import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

function Home() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes");
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [editNote, setEditNote] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "Study",
    });

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = (title, content, category) => {
        const newNote = {
            id: Date.now(),
            title,
            content,
            category,
            createdAt: new Date().toLocaleString(),
            pinned: false,
        };

        setNotes((prevNotes) => [newNote, ...prevNotes]);
    };

    const deleteNote = (id) => {
        setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== id)
        );
    };
    const togglePin = (id) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id
                    ? { ...note, pinned: !note.pinned }
                    : note
            )
        );
    };

    //   adding editNotes functionality
    const updateNote = (title, content, category) => {
        setNotes(
            notes.map((note) =>
                note.id === editNote.id
                    ? {
                        ...note,
                        title,
                        content,
                        category,
                    }
                    : note
            )
        );

        setEditNote(null);
    };


    const filteredNotes = notes
        .filter(
            (note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.pinned - a.pinned);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="px-4 py-8">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <div className="mb-10">
                    <NoteForm
                        addNote={addNote}
                        editNote={editNote}
                        updateNote={updateNote}
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                deleteNote={deleteNote}
                                setEditNote={setEditNote}
                                setFormData={setFormData}
                                togglePin={togglePin}
                            />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-400">
                            No notes found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;