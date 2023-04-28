import { Injectable } from '@angular/core';
import { addDoc,collection, collectionData,deleteDoc,doc,Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Song } from '../Models/song';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private fs:Firestore,private http: HttpClient) { }

  getSongs():Observable<Song[]> {
    const myCollection:any = collection(this.fs, 'Songs');
    return collectionData(myCollection);
  }

  getDataFromScraper(songLink:string): Observable<any> {
    return this.http.get<any>("http://localhost:5000/getScrapedSong/"+songLink);
  }

  // addSong(songToAdd:Song){
  //   const myCollection:any = collection(this.fs, 'Songs');
  //   addDoc(myCollection,songToAdd);
  // }

  async addSong(songToAdd:Song) {
    let cont:number=0;

    const songsFromDb:any = collection(this.fs, "Songs");

    const results = query(songsFromDb, where("Name", "==", songToAdd.Name));

    await getDocs(results).then((querySnapshot:any) => {
      querySnapshot.forEach((doc:any) => {
        cont+=1;
    })});

    // Add new song
    if(cont==0)
    {
      addDoc(songsFromDb, songToAdd);
    }
    else
      console.log("Song already exists");
  }

  async removeSong(songName:string,songArtistName:string,songAlbumName:string){
    const myCollection:any = collection(this.fs, 'Songs');
    let ids:any[] = [];
    const results = query(myCollection, where("Name", "==", songName),where("ArtistName","==",songArtistName),where("AlbumName","==",songAlbumName));

    await getDocs(results).then((querySnapshot:any) => {
      querySnapshot.forEach((doc:any) => {
        ids.push(doc.id);
    })});

    for (var id of ids){
      const songRef:any = doc(myCollection, id);
      await deleteDoc(songRef);
    }
  }

  async updateSong(newSongName: string, newSongArtistName: string, newSongAlbumName: string, newSongDuration: number, newSongNumberOfPlays: number) {
    const myCollection:any = collection(this.fs, 'Songs');
    const results = query(myCollection, where("Name", "==", newSongName),where("ArtistName","==",newSongArtistName));
    let ids:any[] = [];

    await getDocs(results).then((querySnapshot:any) => {
      querySnapshot.forEach((doc:any) => {
        ids.push(doc.id);
    })});

    for (var id of ids){
      const songRef:any = doc(myCollection, id);
      await deleteDoc(songRef);

      let song:Song = {
        Name:newSongName,
        Duration:newSongDuration,
        AlbumName:newSongAlbumName,
        ArtistName:newSongArtistName,
        NumberOfPlays:newSongNumberOfPlays};
      await addDoc(myCollection, song);
    }
  }
}
