import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { getDBConnection, addNote } from './database';

export default function CreateNote({ navigation }) {
  const [note, setNote] = useState('');

  const handleSave = async () => {
    if (note.trim() === '') {
      Alert.alert('Uyarı', 'Lütfen bir mesaj yazın.');
      return;
    }
    try {
      const db = await getDBConnection();
      await addNote(db, note);
      setNote('');
      Alert.alert('Başarılı', 'Günün mesajı eklendi!', [
        { text: 'Listeye Git', onPress: () => navigation.navigate('NotesList') }
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Yeni Mesaj Ekle</Text>
        <TextInput
          style={styles.input}
          placeholder="Bugün için aklından geçenler..."
          placeholderTextColor="#888"
          value={note}
          onChangeText={setNote}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Mesajı Kaydet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('NotesList')}>
          <Text style={styles.secondaryButtonText}>Tüm Mesajları Gör</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2C', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#2D2D44', borderRadius: 20, padding: 25, elevation: 10, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#1E1E2C', color: '#FFF', borderRadius: 12, padding: 15, fontSize: 16, minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: '#3A3A5A' },
  button: { backgroundColor: '#4ECDC4', padding: 15, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#1E1E2C', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { marginTop: 15, alignItems: 'center' },
  secondaryButtonText: { color: '#4ECDC4', fontSize: 14 }
});