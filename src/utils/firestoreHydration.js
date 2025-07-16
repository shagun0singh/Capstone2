import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, orderBy, query } from 'firebase/firestore';

export async function addHydrationLog(amount) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  await addDoc(collection(db, 'users', user.uid, 'hydrationLogs'), {
    amount,
    timestamp: serverTimestamp(),
  });
}

export async function getHydrationLogs() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const q = query(collection(db, 'users', user.uid, 'hydrationLogs'), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 