import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Artık hepsi direkt src içinde
import { getDBConnection, createTable } from './src/database';
import CreateNote from './src/CreateNote';
import NotesList from './src/NotesList';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await getDBConnection();
        await createTable(db);
      } catch (error) {
        console.error("Veritabanı oluşturma hatası: ", error);
      }
    };
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="CreateNote"
        screenOptions={{
          headerStyle: { backgroundColor: '#1E1E2C' },
          headerTintColor: '#4ECDC4',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="CreateNote" 
          component={CreateNote} 
          options={{ title: 'Yeni Mesaj' }} 
        />
        <Stack.Screen 
          name="NotesList" 
          component={NotesList} 
          options={{ title: 'Tüm Mesajlar' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}