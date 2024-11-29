import { db } from "./firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";

import dayjs from "dayjs";

export default async function getVehicles() {
  const data = await getDocs(collection(db, "vehicles"));
  return data.docs.map((obj) => {
    const vehicle = obj.data();
    return vehicle;
  });
}

// export async function getVehicleOccupation(id) {
//   const data = await getDocs(collection(db, "vehiclesOccupation"));
//   return data.docs
//     .map((obj) => obj.data())
//     .filter((occupation) => occupation.id === id)
//     .map((occupation) => [
//       dayjs.unix(occupation.start),
//       dayjs.unix(occupation.end),
//     ]);
// }
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

// export async function addVehicleOccupation(id, start, end) {
//   await addDoc(collection(db, "vehiclesOccupation"), {
//     id: id,
//     start: new Timestamp(start.unix(), 0),
//     end: new Timestamp(end.unix(), 0),
//   });
// }

// function intersects([start1, end1], [start2, end2]) {
//   return end1.isAfter(start2) && start1.isBefore(end2);
// }

// export function checkAvailability(range, occupied) {
//   return occupied.all((rangeOccupied) => !intersects(range, rangeOccupied));
// }

// Add vehicle occupation times
export async function addVehicleOccupation(name, start, end) {
  await addDoc(collection(db, "vehiclesOccupation"), {
    name: name,
    start: Timestamp.fromDate(start), // Convert JavaScript Date to Firebase Timestamp
    end: Timestamp.fromDate(end),
  });
}

// Check if two date ranges intersect
function intersects([start1, end1], [start2, end2]) {
  return end1 > start2 && start1 < end2; // Using JavaScript Date objects
}

// Check if requested date range is available
export function checkAvailability(range, occupied) {
  return occupied.every((rangeOccupied) => !intersects(range, rangeOccupied));
}
