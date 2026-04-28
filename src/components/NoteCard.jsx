function NoteCard({
  note,
  deleteNote,
  setEditNote,
  setFormData,
  togglePin,
}) {
  const handleEdit = () => {
    setEditNote(note);

    setFormData({
      title: note.title,
      content: note.content,
      category: note.category || "Study",
    });
  };
  const exportSingleNote = () => {
    const noteContent = `Title: ${note.title}
Content: ${note.content}
Category: ${note.category || "Study"}
Created At: ${note.createdAt}
Pinned: ${note.pinned ? "Yes" : "No"}`;

    const blob = new Blob([noteContent], {
      type: "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${note.title || "note"}.txt`;
    link.click();
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-white">
          {note.title}
        </h3>

        <button
          onClick={() => togglePin(note.id)}
          className={`text-sm px-3 py-1 rounded-lg ${note.pinned
            ? "bg-yellow-500 text-black"
            : "bg-gray-700 text-white"
            }`}
        >
          {note.pinned ? "Pinned" : "Pin"}
        </button>
      </div>

      <p className="text-gray-300 mb-2 whitespace-pre-wrap">
        {note.content}
      </p>

      <p className="text-sm text-gray-400 mb-1">
        Category: {note.category || "Study"}
      </p>

      <p className="text-xs text-gray-500 mb-4">
        {note.createdAt}
      </p>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => deleteNote(note.id)}
          className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition"
        >
          Delete
        </button>

        <button
          onClick={exportSingleNote}
          className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition"
        >
          Export
        </button>
      </div>
    </div>
  );
}

export default NoteCard;