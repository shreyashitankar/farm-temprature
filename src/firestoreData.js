import React, { useState, useEffect, useContext } from 'react';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import db from './firebase';
import { v4 as uuidv4 } from 'uuid';


function FirestoreData() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState({});
  const collectionRef = collection(db, 'Farm-Stats');
  const documentRef = doc(collectionRef, 'prod-test');

  useEffect(() => {
    const fetchDocument = async () => {
        try {
          const docSnapshot = await getDoc(documentRef);
          if (docSnapshot.exists()) {
            let item = [];
            // Document exists, you can access its data using docSnapshot.data()
            const documentData = docSnapshot.data()["farmShadeprod-test"];
            console.log('Document data:', documentData);
            documentData.forEach(element => {
                
                let Temperature = element.Temperature;
                let temp = {
                    'id':element.Temperature+element.Humidity+element.Date,
                    'temprature':(element.Temperature).slice(0,5),
                    'humidity':(element.Humidity).slice(0,5),
                    'date': new Date(element.Date.toMillis()).toString(),
                }
                item.unshift(temp);
                setData2(temp);
            });
            setData(item);
          } else {
            console.log('No such document!');
          }
          console.log(data);
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };

      fetchDocument();
  }, []);

  return (
    <div>
        <br></br>
        <h3>Temperature: {data2.temprature} °C <br></br><br></br> Humidity: {data2.humidity} % <br></br><br></br> Date: {data2.date} </h3>    
        <br></br>
        <br></br>
        <div class="myTable">
            <table>
            <tbody>
            <tr>
                <th>Date</th>
                <th>Temperature</th>
                <th>Humidity</th>
            </tr>
                {data.map(item => (
                    <tr><td>{item.date}</td><td>{item.temprature} °C</td><td>{item.humidity} %</td></tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
}

export default FirestoreData;