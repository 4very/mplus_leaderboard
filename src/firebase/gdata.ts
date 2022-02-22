import { doc, getDoc } from 'firebase/firestore';

import { firestore } from './init';

export async function getRoster() {
  const val = await getDoc(doc(firestore, 'gdata', 'roster'));
  return val.data();
}

export async function getWeekData(week: Number) {
  const val = await getDoc(doc(firestore, 'gdata', week.toString()));
  return val.data();
}
