//Menu program to display albums songs and artists. Also added play time for songs and run time for albums.

//created song class to add song name, number of minutes and seconds in the song.
class Song {
    constructor (name, minutes, seconds) {
        this.name = name;
        this.minutes = minutes;
        this.seconds = seconds;
    }
        // describe method to show the name of the song and how long it is. in order to display the seconds correctly, had to convert it 
        //to a string and used .padStart to make sure it is two characters long - will add zero to beginning of single digit values.
    describe() {
        return `${this.name} is ${this.minutes}:${this.seconds.toString().padStart(2, '0')} long`;
    }
}
    // created Album class to create Album objects. Constructor accepts name and artist for parameters. Also added emply array for songs
    //to be added by addSong function. Added totalRunTime object to keep track of minutes and seconds for album run time.
class Album {
    constructor (name, artist) {
        this.name = name;
        this.artist = artist;
        this.songs = [];
        this.totalRunTime = {
            minutes: 0,
            seconds: 0
        };
        } ;
    
        //add song method to add songs to this.songs array. Adding song minutes and seconds to total run time.
    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song);
            this.totalRunTime.minutes += song.minutes;
            this.totalRunTime.seconds += song.seconds;
            //had to add another if statment to account for seconds going over 60. If that happens, we take the seconds / 60 and then use math.floor
            //to round down to the integer to add it to minutes. Then we add what ever remains after 60 seconds to the totalRuntime.seconds using %=.
            if (this.totalRunTime.seconds >= 60) {
                this.totalRunTime.minutes += Math.floor(this.totalRunTime.seconds / 60);
                this.totalRunTime.seconds %= 60; 
            }
        } else {
            throw new Error(`You can only add an instance of Song. 
            Argument is not a song: ${song}`);
        };
    };
        //describe method to give information about the album.
    describe() {
        return `${this.name} by ${this.artist} has ${this.songs.length} songs. The total run time is ${this.totalRunTime.minutes}:${this.totalRunTime.seconds.toString().padStart(2, '0')}.`;
    }
}

    //created menu class.
class Menu {
    constructor() {
        this.albums = [];
        this.selectedAlbum = null;
    }
        //used switch to create menu option selections.
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
                    break;
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
        //created main menu options.
    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create a new album
        2) view an album
        3) delete an album
        4) display all albums
        `)
    }
        //created album menu options.
    showAlbumMenuOptions(albumInfo) {
        return prompt(`
        0) back
        1) add a new song
        2) delete a song
        -------------------
        ${albumInfo}
        `);
    }
        //created display albums method.
    displayAlbums() {
        let albumString = '';
        for (let i = 0; i < this.albums.length; i++) {
            albumString += i + ') ' + 'Album: ' + this.albums[i].name + ' (# of Songs: ' + this.albums[i].songs.length + ')' + '\n' 
            + '---- Artist: ' + this.albums[i].artist + '\n'
            + '---- Total Run time: ' + 
            this.albums[i].totalRunTime.minutes + ':' +
            this.albums[i].totalRunTime.seconds.toString().padStart(2, '0') + '\n';
        }
        alert(albumString)
    }
        //created create album method.
    createAlbum() {
        let name = prompt(`Enter name for a new album:`)
        let artist = prompt(`Enter the artist:`)
        this.albums.push(new Album(name, artist));
    }
        //created view album method.
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
        //created deleteAlbum method. Will move an album from the albums array using splice method.
    deleteAlbum() {
        let index = prompt('Enter the index of the album you wish to delete: ');
        if (index > -1 && index < this.albums.length) {
            this.albums.splice(index,1);
        }
    }
        //created create song method. Since prompts always return a string, used parseInt to make sure minutes and seconds returned an integer/
    createSong() {
        let name = prompt('Enter name for song: ');
        let minutes = parseInt(prompt('Enter how many minutes the song has: '));
        let seconds = parseInt(prompt('Enter how many seconds the song has: '));
        this.selectedAlbum.addSong(new Song(name, minutes, seconds));
    }
        //created delete song method - needed to also have a way to reduce the run time of the album if a song was deleted. had to create a 
        //variable to store the deleted song and information (deletedSong). Then removed the song from the album using .splice. Next I had 
        //to subtract the deleted song minutes and seconds from the album. Needed to add an additional if statement so I wouldn't have negative
        //seconds so if the total run time for the album is less than 0, the if statment runs. Used math.ceil to round the number up to nearest integer.
        //used math.abs to make sure a positive number is returned and then divided that by 60 to give how many minutes to subtract. 
        //next we refigure the total run time seconds by taking 60 and subtracting whatever is remaning of the total run time seconds after 60.
    deleteSong() {
        let index = prompt('Enter the index of the song that you wish to delete: ');
        if (index > -1 && index < this.selectedAlbum.songs.length) {
           let deletedSong = this.selectedAlbum.songs[index];
            this.selectedAlbum.songs.splice(index,1);
            this.selectedAlbum.totalRunTime.minutes -= deletedSong.minutes;
            this.selectedAlbum.totalRunTime.seconds -= deletedSong.seconds;
            if (this.selectedAlbum.totalRunTime.seconds < 0) {
                this.selectedAlbum.totalRunTime.minutes -= Math.ceil(Math.abs(this.selectedAlbum.totalRunTime.seconds) / 60);
                this.selectedAlbum.totalRunTime.seconds = 60 - Math.abs(this.selectedAlbum.totalRunTime.seconds) % 60;
            }
            
        }
    }
}

let menu = new Menu();
menu.start();

