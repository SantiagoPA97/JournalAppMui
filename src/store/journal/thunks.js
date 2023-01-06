import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, deleteNoteByID, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

export const startNewNote = () => {
  return async(dispatch, getState) => {
    dispatch(savingNewNote());
    const { auth: { uid } } = getState(); 

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime(),
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  }
};

export const startLoadingNotes = () => {
  return async(dispatch, getState) => {
    const { auth: { uid } } = getState(); 

    if(!uid) throw new Error('The UID does not exist');
    
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}

export const startSavingNote = () => {
  return async(dispatch, getState) => {
    dispatch(setSaving());
    const { auth: { uid }, journal: { active: note } } = getState(); 

    const newNoteState = { ...note };
    delete newNoteState.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, newNoteState, { merge: true });

    dispatch(updateNote(note));
  }
}

export const startUploadingFiles = (files = []) => {
  return async(dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
  }
}

export const startDeletingNote = () => {
  return async(dispatch, getState) => {

    const { auth: { uid }  } = getState();
    const { journal: { active: note  }  } = getState();

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteByID(note.id));
  }
}