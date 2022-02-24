import { getDoc, doc } from 'firebase/firestore';

import { firestore } from './init';

export async function getMeta() {
  const val = await getDoc(doc(firestore, 'home', 'meta'));
  return val.data();
}
