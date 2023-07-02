//Albums and songs on Albums
class Song {
    constructor (name, length) {
        this.name = name;
        this.length = length;
    }

    describe() {
        return `${this.name} is ${this.length} long`;
    }
}

class Album {
    constructor (name, artist) {
        this.name = name;
        this.artist = artist;
        this.songs = [];
    }

    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song);
        } else {
            throw new Error(`You can only add an instance of Song. 
            Argument is not a song: ${song}`)
        }
    }

    describe() {
        return `${this.name} by ${this.artist} has ${this.songs.length} songs.`;
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
            albumString += i + ') ' + this.albums[i].name + '\n';
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
            let description = 'Album name: ' + this.selectedAlbum.name + '\n';
            description += ' ' + this.selectedAlbum.describe() + '/n';
            for (let i = 0; i < this.selectedAlbum.songs.length; i++) {
                description += i + ') ' + this.selectedAlbum.songs[i].describe() + '\n';
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
        let length = prompt('Enter length of song: ');
        this.selectedAlbum.addSong(new Song(name, length));
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

