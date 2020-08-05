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

export interface PodcastEpisodeData {
    author: string;
    title: string;
    feed?: string;
    genres: string[];
    id: string;
    podcastId: string;
    name: string;
    publishDate: Date;
    thumbnail: string;
    description: string;
    audioFile: string;
}

export interface GenreData {
    id?: string;
    genre: string;
}