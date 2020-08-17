export interface PodcastData {
    author: string;
    feed: string;
    genreId: string[];
    genres: string[];
    id: string;
    name: string;
    primaryGenre: string;
    releaseDate: Date;
    thumbnail: string;
}

export interface EpisodeData {
    title: string;
    description: string;
    audioFile: string;
    publishDate: Date;
    podcastId: string;
    podcastDescription: string;
}

export interface PodcastEpisodeData {
    title: string;
    description: string;
    audioFile: string;
    publishDate: Date;
    podcastId: string;
    podcastDescription: string;

    author: string;
    feed?: string;
    genres: string[];
    id: string; 
    name: string;
    thumbnail: string;
}

export interface GenreData {
    id?: string;
    genre: string;
}