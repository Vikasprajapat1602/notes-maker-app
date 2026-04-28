import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";
import ExportNotes from "../components/ExportNotes";
import TrashBin from "../components/TrashBin";

function Home() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes");
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [trashNotes, setTrashNotes] = useState(() => {
        const savedTrash = localStorage.getItem("trashNotes");
        return savedTrash ? JSON.parse(savedTrash) : [];
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [editNote, setEditNote] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "Study",
    });

    useEffect(() => {
        localStorage.setItem(
            "trashNotes",
            JSON.stringify(trashNotes)
        );
    }, [trashNotes]);

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
        const noteToDelete = notes.find(
            (note) => note.id === id
        );

        if (noteToDelete) {
            setTrashNotes((prevTrash) => [
                noteToDelete,
                ...prevTrash,
            ]);
        }

        setNotes(
            notes.filter((note) => note.id !== id)
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
    const restoreNote = (id) => {
        const noteToRestore = trashNotes.find(
            (note) => note.id === id
        );

        if (noteToRestore) {
            setNotes((prevNotes) => [
                noteToRestore,
                ...prevNotes,
            ]);
        }

        setTrashNotes(
            trashNotes.filter((note) => note.id !== id)
        );
    };

    const deleteForever = (id) => {
        setTrashNotes(
            trashNotes.filter((note) => note.id !== id)
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

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedNotes = [...notes];

        const [movedNote] = reorderedNotes.splice(
            result.source.index,
            1
        );

        reorderedNotes.splice(
            result.destination.index,
            0,
            movedNote
        );

        setNotes(reorderedNotes);
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

                <ExportNotes notes={notes} />

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="notes">
                        {(provided) => (
                            <div
                                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredNotes.length > 0 ? (
                                    filteredNotes.map((note, index) => (
                                        <Draggable
                                            key={note.id.toString()}
                                            draggableId={note.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <NoteCard
                                                        note={note}
                                                        deleteNote={deleteNote}
                                                        setEditNote={setEditNote}
                                                        setFormData={setFormData}
                                                        togglePin={togglePin}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                ) : (
                                    <p className="text-center col-span-full text-gray-400">
                                        No notes found.
                                    </p>
                                )}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <TrashBin
                    trashNotes={trashNotes}
                    restoreNote={restoreNote}
                    deleteForever={deleteForever}
                />
            </div>
        </div>
    );
}

export default Home;