import React, { useState, useContext, useMemo } from 'react';
import { UserContext } from '../context/UserContext';
import Button from '../components/Button';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import { FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiCalendar, FiSearch, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Notes = () => {
  const { notes, addNote, updateNote, deleteNote } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // add, edit
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Form states
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Filtered notes list
  const filteredNotes = useMemo(() => {
    return notes.filter(n =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  const openAddModal = () => {
    setModalMode('add');
    setNoteTitle('');
    setNoteContent('');
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setModalMode('edit');
    setSelectedNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error("Please fill in both title and content.");
      return;
    }

    if (modalMode === 'add') {
      const newNote = {
        id: `note-${Date.now()}`,
        title: noteTitle.trim(),
        content: noteContent.trim(),
        date: new Date().toISOString().split('T')[0]
      };
      addNote(newNote);
      toast.success("Note created successfully!");
    } else {
      updateNote(selectedNoteId, {
        title: noteTitle.trim(),
        content: noteContent.trim(),
        date: new Date().toISOString().split('T')[0]
      });
      toast.success("Note updated successfully!");
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
      toast.success("Note deleted successfully!");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Interview Study Notes
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Write down key terms, standard algorithms, SQL query schemas, and HR response strategies.
          </p>
        </div>
        <Button onClick={openAddModal} variant="primary" icon={FiPlus}>
          Add Note
        </Button>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search saved notes..."
        />
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-darkBorder dark:bg-darkCard hover:shadow-md transition duration-200"
            >
              <div>
                <div className="flex items-center space-x-2 text-primary mb-2">
                  <FiFileText className="h-4.5 w-4.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">STUDY NOTE</span>
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-white truncate">
                  {note.title}
                </h4>
                <p className="mt-2 text-sm text-slate-550 dark:text-slate-400 line-clamp-4 whitespace-pre-wrap leading-relaxed">
                  {note.content}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-darkBorder flex items-center justify-between">
                <span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold flex items-center">
                  <FiCalendar className="mr-1 h-3.5 w-3.5" /> {note.date}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => openEditModal(note)}
                    className="p-1.5 text-slate-450 hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-800 rounded"
                    aria-label="Edit note"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="p-1.5 text-slate-455 hover:bg-slate-50 hover:text-rose-600 dark:hover:bg-slate-800 rounded"
                    aria-label="Delete note"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-16 text-center dark:border-slate-700">
          <FiBookOpen className="mx-auto h-12 w-12 text-slate-350 dark:text-slate-650 mb-2" />
          <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">No Notes Found</h4>
          <p className="mt-1 text-sm text-slate-450 dark:text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? "No notes matched your search query. Try clearing the input."
              : "Create your first revision study card. Click 'Add Note' to begin!"}
          </p>
        </div>
      )}

      {/* Add / Edit Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Create New Note' : 'Edit Study Note'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="e.g. DBMS ACID concepts"
              className="block w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Note Content
            </label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Type your study notes, revision bullet points, or codes..."
              rows={8}
              className="block w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Note
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Notes;
