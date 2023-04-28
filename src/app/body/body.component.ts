import { Component } from '@angular/core';
import { Song } from '../Models/song';
import { SongService } from '../Services/song.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  seeAllSongs:boolean = false;
  addSong:boolean = false;
  removeSong:boolean = false;
  updateSong:boolean = false;
  scrapeSong:boolean = false;
  showScrapedData:boolean = false;
  showLandingPage:boolean = true;
  scrapedSongLink:string = "";
  scrapedDataFromBackend = {name:"",artistname:"",albumname:"",duration:0,numberofplays:0};

  newSongName:string;
  newSongArtistName:string;
  newSongAlbumName:string;
  newSongDuration:number;
  newSongNumberOfPlays:number;


  constructor(private songService:SongService){
    this.newSongName = "";
    this.newSongArtistName = "";
    this.newSongAlbumName = "";
    this.newSongDuration = 0;
    this.newSongNumberOfPlays = 0;
  }

  songsFromDB:Song[] = []

  getSongs(){
    this.songService.getSongs().subscribe(result =>
      {
        this.songsFromDB = result;
      })
  }

  ngOnInit(): void {
    this.getSongs();
    // this.newSongDuration.subscribe((result) =>{
    //   this.newSongDurationTransformed = result*100000;
    // })
  }

  seeAllSongsButtonClicked()
  {
    this.seeAllSongs = true;
    this.addSong = false;
    this.removeSong = false;
    this.updateSong = false;
    this.scrapeSong = false;
    this.showScrapedData = false;
    this.showLandingPage = false;
  }

  addSongButtonClicked()
  {
    this.seeAllSongs = false;
    this.addSong = true;
    this.removeSong = false;
    this.updateSong = false;
    this.scrapeSong = false;
    this.showScrapedData = false;
    this.showLandingPage = false;
  }

  removeSongButtonClicked()
  {
    this.seeAllSongs = false;
    this.addSong = false;
    this.removeSong = true;
    this.updateSong = false;
    this.scrapeSong = false;
    this.showScrapedData = false;
    this.showLandingPage = false;
  }

  updateSongButtonClicked()
  {
    this.seeAllSongs = false;
    this.addSong = false;
    this.removeSong = false;
    this.updateSong = true;
    this.scrapeSong = false;
    this.showScrapedData = false;
    this.showLandingPage = false;
  }

  scrapeSongButtonClicked()
  {
    this.seeAllSongs = false;
    this.addSong = false;
    this.removeSong = false;
    this.updateSong = false;
    this.scrapeSong = true;
    this.showScrapedData = false;
    this.showLandingPage = false;
  }

  scrapeForSong(){
    this.songService.getDataFromScraper(this.scrapedSongLink).subscribe(result =>
    {
      console.log(result);
      this.scrapedDataFromBackend = result;
    })
    this.showScrapedData = true;
    this.seeAllSongs = false;
    this.addSong = false;
    this.removeSong = false;
    this.updateSong = false;
    this.scrapeSong = false;
    this.showLandingPage = false;
  }

  seeLandingPage(){
    this.showScrapedData = false;
    this.seeAllSongs = false;
    this.addSong = false;
    this.removeSong = false;
    this.updateSong = false;
    this.scrapeSong = false;
    this.showLandingPage = true;
  }

  addSongToDB()
  {
    let song:Song = {
      Name:this.newSongName,
      Duration:this.transformDuration(this.newSongDuration),
      AlbumName:this.newSongAlbumName,
      ArtistName:this.newSongArtistName,
      NumberOfPlays:this.transforNumberOfPlays(this.newSongNumberOfPlays)};

    this.songService.addSong(song);

    this.seeAllSongsButtonClicked();
  }

  addScrapedSongToDB(){
    let song:Song = {
      Name:this.scrapedDataFromBackend.name,
      Duration:this.scrapedDataFromBackend.duration,
      AlbumName:this.scrapedDataFromBackend.albumname,
      ArtistName:this.scrapedDataFromBackend.artistname,
      NumberOfPlays:this.scrapedDataFromBackend.numberofplays};

    this.songService.addSong(song);

    this.seeAllSongsButtonClicked();
  }


  removeSongFromDB()
  {
    this.songService.removeSong(this.newSongName,this.newSongArtistName,this.newSongAlbumName);

    this.seeAllSongsButtonClicked();
  }

  updateSongFromDB()
  {
    this.songService.updateSong(this.newSongName,this.newSongArtistName,this.newSongAlbumName,this.newSongDuration,this.transforNumberOfPlays(this.newSongNumberOfPlays));

    this.seeAllSongsButtonClicked();
  }

  transformDuration(value: number): number {
    const minDuration = 0.01;
    const maxDuration = 10.00;

    const duration = minDuration + (value / 100) * (maxDuration - minDuration);

    const minutes = Math.floor(duration);
    const seconds = Math.round((duration - minutes) * 60);

    var result = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    var Floatresult = parseFloat(result.replace(":","."));
    return Floatresult;
  }


  transforNumberOfPlays(value: number): number{
    return (value / 100) * 1000000000;
  }

}
