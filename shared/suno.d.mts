import type { Song } from '../src/data/songs';

export declare const SUNO_HANDLE: string;
export declare function fetchSunoSongs(handle?: string): Promise<Song[]>;
