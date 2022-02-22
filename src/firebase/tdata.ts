import { doc, getDoc } from 'firebase/firestore';

import { firestore } from './init';

export async function getTeams(tournament: string) {
  const val = await getDoc(doc(firestore, 'tdata', tournament));
  return val.data().teams;
}

export async function getMeta(tournament: string) {
  const val = await getDoc(doc(firestore, 'tdata', tournament));
  return val.data().meta;
}

export async function getRuns(tournament: string) {
  const val = await getDoc(doc(firestore, 'tdata', tournament));
  return val.data().runs;
}

export async function getHistorical(tournament: string) {
  const val = await getDoc(doc(firestore, 'tdata', tournament));
  return val.data().historical;
}
export async function getUpdate(tournament: string) {
  const val = await getDoc(doc(firestore, 'tdata', tournament));
  return val.data().update;
}
