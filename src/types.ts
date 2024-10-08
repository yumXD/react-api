export interface Place {
    name: string;
    category: string;
    thumbnail: string;
    address: string;
    description: string;
    images: string[];
}

export interface Comment {
    id: number;
    text: string;
}
