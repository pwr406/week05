//Albums and songs on Albums
class Song {
    constructor (name, songLength) {
        this.name = name;
        this.songLength = songLength;
    }

    describe() {
        return `${this.name} is ${this.songLength} long`;
    }
}

class Album {
    constructor (name, artist) {
        this.name = name;
        this.artist = artist;
        this.songs = [];
        this.totalRunTime = 0 ;
    }

    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song);
            this.totalRunTime += parseInt(song.songLength, 10);
        } else {
            throw new Error(`You can only add an instance of Song. 
            Argument is not a song: ${song}`)
        }
    }

    describe() {
        return `${this.name} by ${this.artist} has ${this.songs.length} songs. The total run time is ${this.totalRunTime}.`;
    }
}

class Menu {
    constructor() {
        this.albums = [];
        this.selectedAlbum = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !=0 ) {
            switch(selection) {
                case '1':
                    this.createAlbum();
                    break;
                case '2':
                    this.viewAlbum();
                    break;
                case '3':
                    this.deleteAlbum();
                case '4':
                    this.displayAlbums();
                    break; 
                default:
                    selection = 0;
                }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create a new album
        2) view an album
        3) delete an album
        4) display all albums
        `)
    }

    showAlbumMenuOptions(albumInfo) {
        return prompt(`
        0) back
        1) add a new song
        2) delete a song
        -------------------
        ${albumInfo}
        `);
    }

    displayAlbums() {
        let albumString = '';
        for (let i = 0; i < this.albums.length; i++) {
            albumString += i + ') ' + 'Album: ' + this.albums[i].name + ' (# of Songs: ' + this.albums[i].songs.length + ')' + '\n' 
            + '---- Artist: ' + this.albums[i].artist + '\n'
            + '---- Total Run time:' + this.albums[i].totalRunTime + '\n';
        }
        alert(albumString)
    }

    createAlbum() {
        let name = prompt(`Enter name for a new album:`)
        let artist = prompt(`Enter the artist:`)
        this.albums.push(new Album(name, artist));
    }

    viewAlbum() {
        let index = prompt("Enter the index of the album that you want to view:");
        if (index > -1 && index < this.albums.length) {
            this.selectedAlbum = this.albums[index];
            let description = 'Album name: ' + this.selectedAlbum.name + '\n'
            'Artist: ' + this.selectedAlbum.artist + '\n';
            description += ' ' + this.selectedAlbum.describe() + '\n';
            for (let i = 0; i < this.selectedAlbum.songs.length; i++) {
                description +='index: ' + i + ") " + this.selectedAlbum.songs[i].describe() + '\n';
            }
            let selection1 = this.showAlbumMenuOptions(description);
            switch (selection1) {
                case '1':
                this.createSong();
                break;
                case '2':
                this.deleteSong();
            }
        }
    }

    deleteAlbum() {
        let index = prompt('Enter the index of the album you wish to delete: ');
        if (index > -1 && index < this.albums.length) {
            this.albums.splice(index,1);
        }
    }

    createSong() {
        let name = prompt('Enter name for song: ');
        let songLength = prompt('Enter length of song: ');
        this.selectedAlbum.addSong(new Song(name, songLength));
    }

    deleteSong() {
        let index = prompt('Enter the index of the song that you wish to delete: ');
        if (index > -1 && index < this.selectedAlbum.songs.length) {
            this.selectedAlbum.songs.splice(index,1);
        }
    }
}
let menu = new Menu();
menu.start();

