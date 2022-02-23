import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { GuildMetaData } from '../types/gTypes';
import { firestore } from './init';

export async function getRoster() {
  const val = await getDoc(doc(firestore, 'gdata', 'roster'));
  return val.data();
}

export async function getWeekData(week: Number) {
  const val = await getDoc(doc(firestore, 'gdata', week.toString()));
  return val.data();
}

export async function getMetaData() {
  const val = await getDoc(doc(firestore, 'gdata', 'meta'));
  return val.data() as GuildMetaData;
}

export async function getWeekPaths() {
  const val = await getDocs(collection(firestore, 'gdata'));
  const retval: string[] = [];
  val.forEach((doc2) => {
    if (doc2.id !== 'meta' && doc2.id !== 'roster') {
      retval.push(doc2.id);
    }
  });
  return retval;
}
