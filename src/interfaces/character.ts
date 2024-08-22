export interface Character {
  name: string;
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: WorkList;
  series: WorkList;
  stories: WorkList;
}

export interface Work {
  resourceURI: string;
  name: string;
}

export interface WorkList {
  available: number;
  collectionURI: string;
  items: Array<Work>;
}
