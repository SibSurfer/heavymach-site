import { db } from "./firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

export default async function getVehicles() {
  const data = await getDocs(collection(db, "vehicles"));
  return data.docs.map((obj) => {
    const vehicle = obj.data();
    return vehicle;
  });
}

export async function getVehicleOccupation(name) {
  const data = await getDocs(collection(db, "vehiclesOccupation"));
  return data.docs
    .map((obj) => obj.data())
    .filter((occupation) => occupation.name === name)
    .map((occupation) => [
      new Date(occupation.start.seconds * 1000), // Convert Firebase Timestamp to JavaScript Date
      new Date(occupation.end.seconds * 1000),
    ]);
}

export async function addVehicleOccupation(name, start, end) {
  await addDoc(collection(db, "vehiclesOccupation"), {
    name: name,
    start: Timestamp.fromDate(start), // Convert JavaScript Date to Firebase Timestamp
    end: Timestamp.fromDate(end),
  });
}

function intersects([start1, end1], [start2, end2]) {
  return end1 > start2 && start1 < end2; 
}

export function checkAvailability(range, occupied) {
  return occupied.every((rangeOccupied) => !intersects(range, rangeOccupied));
}
