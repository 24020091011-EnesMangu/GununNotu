import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { getDBConnection, getNotes, deleteNote, toggleNoteCompletion, updateNoteContent } from './database';
import { useIsFocused } from '@react-navigation/native';

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const isFocused = useIsFocused(); 

  const loadData = async () => {
    const db = await getDBConnection();
    const storedNotes = await getNotes(db);
    setNotes(storedNotes);
  };

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const handleDelete = async (id) => {
    const db = await getDBConnection();
    await deleteNote(db, id);
    loadData();
  };

  const handleToggleComplete = async (id, status) => {
    const db = await getDBConnection();
    await toggleNoteCompletion(db, id, status);
    loadData();
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setEditedContent(note.content);
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    if (editedContent.trim() === '') return;
    const db = await getDBConnection();
    await updateNoteContent(db, selectedNote.id, editedContent);
    setEditModalVisible(false);
    loadData();
  };

  const renderItem = ({ item }) => {
    const isDone = item.isCompleted === 1;
    return (
      <View style={[styles.noteCard, isDone && styles.noteCardDone]}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleToggleComplete(item.id, item.isCompleted)}>
          <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
             {isDone && <Text style={styles.checkMark}>✓</Text>}
          </View>
        </TouchableOpacity>

        <Text style={[styles.noteText, isDone && styles.noteTextDone]}>{item.content}</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => openEditModal(item)} style={styles.iconBtn}>
            <Text style={styles.editText}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconBtn}>
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz hiç mesaj eklenmedi.</Text>}
      />

      <Modal visible={editModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mesajı Düzenle</Text>
            <TextInput
              style={styles.modalInput}
              value={editedContent}
              onChangeText={setEditedContent}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#555' }]} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.btnText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#4ECDC4' }]} onPress={handleUpdate}>
                <Text style={[styles.btnText, { color: '#1E1E2C' }]}>Güncelle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2C' },
  noteCard: { flexDirection: 'row', backgroundColor: '#2D2D44', padding: 15, marginBottom: 15, borderRadius: 15, alignItems: 'center' },
  noteCardDone: { opacity: 0.6 },
  checkboxContainer: { marginRight: 15 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#4ECDC4', alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: '#4ECDC4' },
  checkMark: { color: '#1E1E2C', fontWeight: 'bold', fontSize: 14 },
  noteText: { flex: 1, color: '#FFF', fontSize: 16 },
  noteTextDone: { textDecorationLine: 'line-through', color: '#AAA' },
  actions: { flexDirection: 'row', gap: 15, marginLeft: 10 },
  iconBtn: { padding: 5 },
  editText: { color: '#FFE66D', fontSize: 20 },
  deleteText: { color: '#FF6B6B', fontSize: 20 },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 50, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#2D2D44', borderRadius: 20, padding: 25 },
  modalTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalInput: { backgroundColor: '#1E1E2C', color: '#FFF', borderRadius: 10, padding: 15, minHeight: 100, textAlignVertical: 'top', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  modalBtn: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});