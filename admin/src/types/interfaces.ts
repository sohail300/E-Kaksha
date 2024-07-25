export interface Sections {
  title: string;
  resources: string;
  videos: {
    name: string;
    link: string;
  }[];
}

export interface Course {
  title: string;
  description: string;
  price: string;
  image: File | null;
  duration: string;
  resource: string;
  priceid: string;
  sections: Sections[];
}

export interface CoursePageInterface {
  title: string;
  description: string;
  price: string;
  imagelink: string;
  duration: string;
  resource: string;
  sections: Sections[];
}

export interface CourseCMS {
  _id: string;
  title: string;
  description: string;
  price: string;
  imagelink: string;
}

export interface Review {
  rating: number;
  comment: string;
  userid: {
    name: string;
    photoUrl: string;
  };
  imagelink: string;
}
