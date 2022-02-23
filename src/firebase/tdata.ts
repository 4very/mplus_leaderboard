import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

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

export async function getTournaments() {
  const val = await getDocs(collection(firestore, 'tdata'));
  const retval: string[] = [];
  val.forEach((doc2) => {
    retval.push(doc2.id);
  });
  return retval;
}
export async function getTData(tournament: string) {
  const val = await getDoc(doc(firestore, 'tdata', tournament));
  return val.data();
}

export async function getGraphTournaments() {
  const val = await getDocs(collection(firestore, 'tdata'));
  const retval: string[] = [];
  val.forEach((doc2) => {
    if (doc2.data().meta.collectGraphs) {
      retval.push(doc2.id);
    }
  });
  return retval;
}
