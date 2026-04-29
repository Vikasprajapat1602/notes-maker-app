function ExportNotes({ notes }) {
  const exportToTXT = () => {
    if (!notes.length) {
      alert("No notes available to export.");
      return;
    }

    const notesContent = notes
      .map(
        (note, index) =>
          `Note ${index + 1}
Title: ${note.title}
Content: ${note.content}
Category: ${note.category || "Study"}
Created At: ${note.createdAt}
Pinned: ${note.pinned ? "Yes" : "No"}

--------------------------`
      )
      .join("\n\n");

    const blob = new Blob([notesContent], {
      type: "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notes.txt";
    link.click();
  };

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <button
        onClick={exportToTXT}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg font-medium transition"
      >
        Export All Notes (.txt)
      </button>
    </div>
  );
}

export default ExportNotes;